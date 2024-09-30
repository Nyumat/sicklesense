import Ably from 'ably';
import { serve } from 'bun';
import { CollectionPath, FitbitWebhookResponse, MessageData, SubscribeRequest } from './types';

const realtime = new Ably.Realtime({ key: process.env.ABLY_API_KEY });

const subscribeToFitbit = async (userId: string, collectionPath: CollectionPath) => {   
  try {
    const response = await fetch(`https://api.fitbit.com/1/user/-/apiSubscriptions/${userId}.json`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.FITBIT_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subscriptionId: userId,
        collectionPath: collectionPath,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to subscribe to Fitbit API');
    }

    console.log(`Subscribed to Fitbit API for user: ${userId}`);
  } catch (error) {
    console.error('Error subscribing to Fitbit:', error);
  }
};

const fitbitWebhookHandler = async (req: Request) => {
  if (req.method === 'POST') {
    try {
      const data = await req.json() as FitbitWebhookResponse;
      console.log('Received Fitbit webhook data:', data);

      const userId = data.ownerId;
      const channelName = `fitbit-updates-${userId}`;
      const fitbitData = JSON.stringify(data);

      const channel = realtime.channels.get(channelName);
      await channel.publish('fitbit-update', { data: fitbitData, userId });

      return new Response('Fitbit webhook data received and published', { status: 200 });
    } catch (error) {
      console.error('Error handling Fitbit webhook:', error);
      return new Response('Error handling webhook', { status: 500 });
    }
  }

  return new Response('Invalid request method', { status: 400 });
};

const publishHandler = async (req: Request) => {
  if (req.method === 'POST') {
    try {
      const { channelName, data, userId, name } = await req.json() as MessageData;
      if (!channelName || !data || !userId) {
        return new Response('Missing channelName, data, or userId', { status: 400 });
      }

      const channel = realtime.channels.get(channelName);
      await channel.publish(name, { data, userId });

      return new Response('Published message to Ably channel', { status: 200 });
    } catch (error) {
      console.error('Error publishing message:', error);
      return new Response('Error publishing message', { status: 500 });
    }
  }

  return new Response('You must send a POST request with channelName, data, and userId in the body', { status: 400 });
};

const subscribeHandler = async (req: Request) => {
  if (req.method === 'POST') {
    try {
      const { userId, collectionPath } = await req.json() as SubscribeRequest;
      if (!userId) {
        return new Response('Missing userId', { status: 400 });
      }

      await subscribeToFitbit(userId, collectionPath);

      return new Response(`User ${userId} subscribed to Fitbit`, { status: 200 });
    } catch (error) {
      console.error('Error subscribing user:', error);
      return new Response('Error subscribing user to Fitbit', { status: 500 });
    }
  }

  return new Response('You must send a POST request with userId in the body', { status: 400 });
};

serve({
  fetch: (req) => {
    const url = new URL(req.url);
    if (url.pathname === '/fitbit-webhook') return fitbitWebhookHandler(req);
    if (url.pathname === '/publish') return publishHandler(req);
    if (url.pathname === '/subscribe') return subscribeHandler(req);
    return new Response('Not Found', { status: 404 });
  },
  port: process.env.PORT || 3001,
});

console.log(`Server running on port ${process.env.PORT || 3001}`);
