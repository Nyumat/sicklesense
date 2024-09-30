## SickleSense Elastic Search Module

This module is designed to integrate with Elasticsearch, providing powerful search capabilities for [Sickle Sense](https://sicklesense.vercel.app). This module exposes a web server that listens for incoming requests and forwards them to the Elasticsearch Cloud services, for semantic search and retrieval of relevant information.

### Installation

Since this is a Python module, you'll need a virtual environment to run it. To create a virtual environment, run the following command:

```bash
python3 -m venv sicklesense_elasticsearch
```

After creating the virtual environment, activate it by running the following command:

```bash
source sicklesense_elasticsearch/bin/activate
```

Now, you can install the required dependencies by running the following command:

```bash
pip install -r requirements.txt
```

### Configuration

Before running the module, you need to configure the Elasticsearch Cloud credentials. To do this, create a `.env` file in the root directory of the module and add the following environment variables:

```bash
ELASTIC_PASSWORD=
ELASTIC_USERNAME=
ES_API_KEY=
ES_ENDPOINT=
ES_CLOUD_ID=
```

### Running the Module

To run the module, execute the following command:

```bash
python3 main.py
```

> [!NOTE]
> The module listens on port 8000 by default. You can change this by modifying the `PORT` variable in the `main.py` file.

### API Endpoints

The module exposes the following API endpoints:

- `POST /api/chat`: This endpoint accepts a list of messages and returns a streaming response from OpenAI's GPT-3.5-turbo model.

### Sending Requests

To send a request to the /api/chat endpoint, you can use the following example:

```bash
curl -X POST "http://localhost:8000/api/chat" -H "Content-Type: application/json" -d '{
  "messages": [
    {
      "role": "user",
      "content": "Hello, how are you?"
    }
  ]
}'
```
