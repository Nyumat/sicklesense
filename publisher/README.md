# Sickle Sense Pub/Sub Module

This module is designed to integrate with [Ably](https://ably.com/), providing a messaging service for [Sickle Sense](https://sicklesense.vercel.app). This module exposes a web server that listens for incoming requests and forwards them to the Ably services, for real-time message processing and distribution.

In Sickle Sense's case, this module is used to publish messages to the Ably channels, which are then consumed by the web clients to display real-time updates of wearable device data.

### Configuration

Before running the module, you need to configure the Ably credentials. To do this, create a `.env` file in the root directory of the module and add the following environment variables:

```bash
ABLY_API_KEY=
PORT=
```

### Installation

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

> [!NOTE]
> The module listens on port 3001 by default. You can change this by modifying the `PORT` variable in the `.env` file.

This project was created using `bun init` in bun v1.0.19. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
