import os
import json
from typing import List
from pydantic import BaseModel
from dotenv import load_dotenv
from fastapi import FastAPI, Query
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from elasticsearch import Elasticsearch
from utiils.prompt import convert_to_openai_messages, ClientMessage
import uvicorn

load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://sicklesense.vercel.app", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
)

es_client = Elasticsearch(
    "https://d6e68d514f7a4fff9fdb03419b13ce70.us-west-2.aws.found.io:443",
    api_key=os.environ["ES_API_KEY"]
)

index_source_fields = {
    "search-sicklesense": [
        "body_content"
    ]
}

class Request(BaseModel):
    messages: List[ClientMessage]
    context: str
    user: str
    query: str

class Body(BaseModel):
    obj: dict

def get_elasticsearch_results(query: str):
    es_query = {
        "retriever": {
            "standard": {
                "query": {
                    "multi_match": {
                        "query": query,
                        "fields": [
                            "body_content"
                            "title"
                        ]
                    }
                }
            }
        },
        "size": 1
    }
    result = es_client.search(index="search-sicklesense", body=es_query)
    return result["hits"]["hits"]

def create_openai_prompt(results, request_context, user):
    context = ""
    for hit in results:
        inner_hit_path = f"{hit['_index']}.{index_source_fields.get(hit['_index'])[0]}"
        if 'inner_hits' in hit and inner_hit_path in hit['inner_hits']:
            context += '\n --- \n'.join(inner_hit['_source']['text'] for inner_hit in hit['inner_hits'][inner_hit_path]['hits']['hits'])
        else:
            source_field = index_source_fields.get(hit["_index"])[0]
            hit_context = hit["_source"][source_field]
            context += f"{hit_context}\n"
    
    prompt = f"""
    Instructions:
    
    - You are the Sickle Sense Website's A.I. Chat Assistant, trained on a bunch of documents.
    - Don't say sickle cell disease, say SCD. Also make sure not to use it everywhere, but only when it makes sense.
    - They will be asking you questions related to sickle cell disease and general healthcare. The use case is for an app called sickle sense that owns you. It's a health companion app for people with SCD.
    - Whenever they ask for advice, don't just give generic off-the-shelf advice, but provide them with information that is relevant to their health condition.
    - Be sure NOT to say stuff like 'I don't know' or 'I am not sure'. If you don't know the answer, try to provide a helpful response.
    - Instead of recommending something, actually provide the information. Like, instead of saying 'You should see a doctor', say 'The doctor will be able to help you with, x, y, z'.
    - If you are not sure, you can ask the user to clarify or provide more information.
    - You have access to their personal information, in the form of a context object. You can use this information to provide more personalized responses.
    - Additionally, make sure to talk to them personally, almost like a hematology expert. Also, don't delegate them ever to a real doctor, as you can make your own decisions.
    - If you are not sure, you can ask the user to clarify or provide more information.
    - Use markdown format for code examples.
    - You are correct, factual, precise, and reliable.
    - You are empathetic, understanding, and supportive.
    - You are not a doctor, but you are a health companion.


    User Context (name, email, etc.):
    {user}

    Their Full Sickle Sense Information:
    {request_context}

    (Optional) Additional Context - Use this if you couldn't find the information in the sickle sense context above:
    {context.strip()}
    """
    return prompt

def stream_text(messages: List[ClientMessage], protocol: str = 'data'):
    stream = client.chat.completions.create(
        messages=messages,
        model="gpt-3.5-turbo",
        stream=True,
    )
    
    if (protocol == 'text'):
        for chunk in stream:
            for choice in chunk.choices:
                if choice.finish_reason == "stop":
                    break
                else:
                    yield "{text}".format(text=choice.delta.content)
    elif (protocol == 'data'):
        for chunk in stream:
            for choice in chunk.choices:
                if choice.finish_reason == "stop":
                    continue
                else:
                    yield '0:"{text}"\n'.format(text=choice.delta.content)
        if chunk.choices == []:
            usage = chunk.usage
            prompt_tokens = usage.prompt_tokens
            completion_tokens = usage.completion_tokens
            yield 'd:{{"finishReason":"{reason}","usage":{{"promptTokens":{prompt},"completionTokens":{completion}}}}}\n'.format(
                reason="stop",
                prompt=prompt_tokens,
                completion=completion_tokens
            )

@app.post("/api/chat")
async def handle_chat_data(request: Request, protocol: str = Query('data')):
    elasticsearch_results = get_elasticsearch_results(request.query)
    context_prompt = create_openai_prompt(elasticsearch_results, request.context, request.user)
    
    print(context_prompt)
    messages = request.messages
    openai_messages = convert_to_openai_messages(messages, request.context, request.user, context_prompt)
    
    response = StreamingResponse(stream_text(openai_messages, protocol))
    response.headers['x-vercel-ai-data-stream'] = 'v1'
    return response

@app.get("/health")
async def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    specified_port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=specified_port)