export type MessageData = {
  channelName: string;
  data: string;
  userId: string;
  name: string;
};

export type SubscribeRequest = {
    userId: string;
    collectionPath: CollectionPath;
};  

export type CollectionPath = '/activities' | '/sleep' | '/heartrate' | '/steps' | '/calories' | '/distance' | '/elevation' | '/floors' | '/minutesSedentary' | '/minutesLightlyActive' | '/minutesFairlyActive' | '/minutesVeryActive';

// request subscribing to fitbit data
export interface FitbitSubscriptionRequest {
  subscriptionId: string;  // unique identifier for the subscription
  collectionPath: string;  // the resource to subscribe to (e.g., /activities, /sleep, /heart)
}

// webhook response from fitbit
export interface FitbitWebhookResponse {
  collectionType: string;  // type of data (e.g., 'activities', 'sleep')
  ownerId: string;         // fitbit user ID
  ownerType: string;       // owner type (usually 'user')
  subscriptionId: string;  // subscription ID that was created
  date: string;            // date of the data in YYYY-MM-DD format
}

// fitbit activity data
export interface FitbitActivityData {
  activityId: number;           // Unique identifier for the activity
  activityName: string;         // Name of the activity
  caloriesBurned: number;       // Calories burned during the activity
  duration: number;             // Duration in milliseconds
  startTime: string;            // Start time in ISO format (YYYY-MM-DDTHH:mm:ss)
  steps: number;                // Number of steps
  distance: number;             // Distance covered in meters
  heartRateZones: HeartRateZone[]; // Heart rate zones during the activity
}

// heart rate zone details for activity
export interface HeartRateZone {
  name: string;        // zone name (e.g., 'Fat Burn', 'Cardio', 'Peak')
  min: number;         // minimum heart rate for this zone
  max: number;         // maximum heart rate for this zone
  minutes: number;     // time spent in this zone in minutes
  caloriesOut: number; // calories burned while in this zone
}

// retrieve activity details
export interface FitbitActivityDetailResponse {
  activities: FitbitActivityData[]; 
  goals: {
    caloriesOut: number;
    distance: number;
    floors: number;
    steps: number;
  };
  summary: {
    activityCalories: number;
    caloriesBMR: number;
    caloriesOut: number;
    distances: Distance[];
    steps: number;
    floors: number;
    elevation: number;
    sedentaryMinutes: number;
    lightlyActiveMinutes: number;
    fairlyActiveMinutes: number;
    veryActiveMinutes: number;
  };
}

// distance details for activity or daily summary
export interface Distance {
  activity: string;  // type of activity (e.g., 'total', 'walk', 'run')
  distance: number;  // distance covered in the activity
}

// batch webhook data request
export interface FitbitWebhookBatchRequest {
  subscriptionId: string;
  ownerId: string;
  ownerType: 'user';
  collectionType: string;
  date: string;
}
