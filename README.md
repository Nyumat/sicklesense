# [Sickle Sense](https://sicklesense.vercel.app/)

![Sickle Sense Landing Page](/public/preview.png)

**Sickle Sense** Sickle Sense is an innovative web application designed to transform the management of sickle cell disease. My mission is to create a holistic platform that enhances the quality of life for individuals living with SCD, bridging the gap between personal health management and medical support.

## 🚀 Features

- **AI-Driven Insights**: Get personalized care insights and recommendations based on your health data and medical history.
- **Community Support**: Connect with others in the SCD community, share experiences, and find support.
- **Real-Time Monitoring**: Track your health vitals and receive alerts when your vitals are outside of normal ranges.
- **RAG Consultation**: Get on-demand consultations with a chatbot that knows your medical history and can provide immediate care advice.
- **Medication Reminders**: Set reminders for your medications and receive live notifications when it's time to take them.

## ⚙️ System Architecture

![Sickle Sense System Design](/public/system-design.png)

## 🤓 Tech Stack (~~for da nerds~~)

Got to use some cool tech to build this project. Here's a breakdown of just some of the services and tools I used:

### 📦 Publisher Service
- **Framework:** [Bun.js](https://bun.sh/) for an efficient server-side JavaScript runtime
- **Message Broker:** [Ably](https://ably.com/) for real-time messaging and pub/sub capabilities
- **Email Service:** [Resend](https://resend.com/) for seamless email delivery
- **Deployment:** [Render](https://render.com/) for quick hobby-tier deployments

### 🔍 Elasticsearch Service
- **Web Framework:** [FastAPI](https://fastapi.tiangolo.com/) for building APIs with Python
- **Search Engine:** [Elasticsearch](https://www.elastic.co/elasticsearch/) for powerful full-text search capabilities
- **Data Validation:** [Pydantic](https://pydantic-docs.helpmanual.io/) for data validation and settings management
- **AI Integration:** [OpenAI](https://pypi.org/project/openai/) Python client library for accessing the OpenAI API

### 🌐 Platform Service
- **Framework:** [Next.js](https://nextjs.org/) (React) for a robust, server-side rendered application
- **Authentication:** [NextAuth.js](https://next-auth.js.org/) for secure OAuth and JWT-based authentication experience
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) for simple state management in React
- **Data Fetching:** [React Query](https://react-query.tanstack.com/) for efficient data fetching and synchronization
- **Data Visualization:** [Recharts](https://recharts.org/en-US/) for creating responsive charts
- **Client Search Functionality:** [Fuse.js](https://fusejs.io/) for fuzzy search capabilities
- **API:** [tRPC](https://trpc.io/) for type-safe, RPC-style client-server communication
- **Database:** [Prisma](https://prisma.io/) ORM with [PostgreSQL](https://www.postgresql.org/) for efficient data management
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/) components for a flexible design system and ergonomic UI primitives
- **AI Integration:** OpenAI and Google Gemini APIs wrapped around the [Vercel AI SDK](https://sdk.vercel.ai/) for intelligent health insights
- **Containerization:** [Docker](https://www.docker.com/) for spinning up development services with ease
- **Deployment:** [Vercel](https://vercel.com/) for seamless continuous deployment with only `git push`
- **Health Data Integration:** [Fitbit API](https://dev.fitbit.com/build/reference/web-api/) for accessing health data from wearable devices
- **Asynchronous Tasks/Cron Jobs:** [Trigger.dev](https://trigger.dev/) for managing background tasks and cron jobs

## 🧑🏿‍💻 Installation

To run this project locally, you'll need to have Node.js, Docker, and PostgreSQL installed on your machine. You'll also need to set up a Prisma database and configure the environment variables, as seen in `.env.example`.

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma CLI](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch-typescript-postgres)

### Clone the Repository

```bash
git clone https://github.com/nyumat/sicklesense.git
```

```bash
cd sicklesense
```

### Install Dependencies

```bash
npm install
```

### Set Up Environment Variables

Create a .env file based on the .env.example provided:

```bash
Copy code
cp .env.example .env
```

### Initialize the Database

> [!IMPORTANT]  
> Make sure the Docker daemon is running before proceeding. 

#### Start the local database using Docker Compose:

```bash
docker-compose -f docker-compose-local.yml up -d
```

> [!TIP]
> You can also use `./fresh-db.sh` and or `./start-database.sh` to start/reset the database.

#### Run the Prisma database setup:

```bash
npx prisma generate
npx prisma db push
```

### Start the App

You can now run the development server:

```bash
npm run dev
```

Then visit http://localhost:3000 to view Sickle Sense in your browser.

📁 Project Structure

```bash
.
├── public                   # Static assets
├── src                      # Application source code
│   ├── app                  # Next.js pages and routing
│   ├── components           # Reusable UI components
│   ├── data                 # JSON data for countries/states
│   ├── hooks                # Custom React hooks
│   ├── lib                  # Utility functions and libraries
│   ├── server               # Server-side code
│   ├── styles               # CSS and styling files
│   ├── trigger              # Trigger.dev cron jobs and tasks
│   └── trpc                 # tRPC API routes and configurations
├── .env                     # Environment variables
├── .env.example             # Example environment variables
├── .eslintrc.js             # ESLint configuration
├── .gitignore               # Git ignore rules
├── docker-compose.yml       # Docker configuration for services
├── next.config.js           # Next.js configuration
|—— publisher                # Bun.js pub/sub service
|—— prisma                   # Prisma schema and migrations
|__ elastisearch             # Elasticsearch web service
├── package.json             # Project dependencies and scripts
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
```

### 🔧 Development

#### Linting & Formatting

This project uses ESLint and Prettier for code linting and formatting.

Lint the codebase:

```bash
npm run lint
```

Format the code:

```bash
npm run format
```

### 🚀 Deployment

The project is currently deployed on Vercel. To deploy your own instance, head over to the Vercel dashboard and follow the instructions to deploy a new project from the GitHub repository you're hosting SickleSense on.

### 🤝 Contributing

This was a hackathon project, but I'd love to see it grow and become a useful tool for the SCD community. If you'd like to contribute, feel free to open an issue or submit a pull request.

### 🙏 Acknowledgements

Shoutout to AfroTech for hosting the AfroTech Hacks 2024 hackathon, where this project was created. As someone with SCD, I'm excited to see the impact this project can have on the community.

### 📄 License

SickleSense is [MIT licensed](/LICENSE).
