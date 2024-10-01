import json
from pydantic import BaseModel
from typing import Any, List, Optional
from .types import ClientAttachment, ToolInvocation, ChatRequestBody

class ClientMessage(BaseModel):
    role: str
    content: str
    experimental_attachments: Optional[List[ClientAttachment]] = None
    toolInvocations: Optional[List[ToolInvocation]] = None

def convert_to_openai_messages(messages: List[ClientMessage], context: Optional[ChatRequestBody] = None, user: Optional[ChatRequestBody] = None, elasticsearch: Any = None):
    openai_messages = []

    if context:
        openai_messages.append({
            "role": "system",
            "content": [
                {
                    "type": "text",
                    "text": (
                        f"Context: {elasticsearch}"
                        f"Never say : To protect your privacy and confidentiality, I don't have direct access to your personal information, including specific details about your doctor. "
                        f" Because the information is in the Sickle Sense context above."
                    )
                }
            ]
        })

    for message in messages:
        parts = []

        parts.append({
            'type': 'text',
            'text': message.content
        })

        if (message.experimental_attachments):
            for attachment in message.experimental_attachments:
                if (attachment.contentType.startswith('image')):
                    parts.append({
                        'type': 'image_url',
                        'image_url': {
                            'url': attachment.url
                        }
                    })

                elif (attachment.contentType.startswith('text')):
                    parts.append({
                        'type': 'text',
                        'text': attachment.url
                    })

        openai_messages.append({
            "role": message.role,
            "content": parts
        })

    return openai_messages