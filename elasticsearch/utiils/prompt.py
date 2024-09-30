import json
from pydantic import BaseModel
from typing import List, Optional
from .types import ClientAttachment, ToolInvocation

class ClientMessage(BaseModel):
    role: str
    content: str
    experimental_attachments: Optional[List[ClientAttachment]] = None
    toolInvocations: Optional[List[ToolInvocation]] = None

def convert_to_openai_messages(messages: List[ClientMessage]):
    openai_messages = []

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