import os
import json
from typing import List
from pydantic import BaseModel
from dotenv import load_dotenv
from fastapi import FastAPI, Query
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from utiils.prompt import convert_to_openai_messages, ClientMessage
import uvicorn


load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
)

class Request(BaseModel):
    messages: List[ClientMessage]
    context: str
    user: str

class Body(BaseModel):
    obj: dict

def stream_text(messages: List[ClientMessage], protocol: str = 'data'):
    stream = client.chat.completions.create(
        messages=messages,
        model="gpt-4o-mini",
        stream=True,
    )

    # When protocol is set to "text", you will send a stream of plain text chunks
    # https://sdk.vercel.ai/docs/ai-sdk-ui/stream-protocol#text-stream-protocol

    if (protocol == 'text'):
        for chunk in stream:
            for choice in chunk.choices:
                if choice.finish_reason == "stop":
                    break
                else:
                    yield "{text}".format(text=choice.delta.content)

    # When protocol is set to "data", you will send a stream data part chunks
    # https://sdk.vercel.ai/docs/ai-sdk-ui/stream-protocol#data-stream-protocol

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
    print(request.user, request.context) 
    messages = request.messages
    openai_messages = convert_to_openai_messages(messages, request.context, request.user)  

    response = StreamingResponse(stream_text(openai_messages, protocol))
    response.headers['x-vercel-ai-data-stream'] = 'v1'
    return response

if __name__ == "__main__":
    specified_port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=specified_port)