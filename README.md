# SickleSense

![Sickle Sense Landing Page](/public/preview.png)

**SickleSense** is a web application designed to empower individuals with sickle cell disease (SCD) by providing AI-driven care insights, real-time support, through a community-driven platform.

## 🚀 Features

- **AI-Driven Insights**: Get personalized care insights and recommendations based on your health data and medical history.
- **Community Support**: Connect with others in the SCD community, share experiences, and find support.
- **Real-Time Monitoring**: Track your health vitals and receive alerts when your vitals are outside of normal ranges.
- **RAG Consultation**: Get on-demand consultations with a chatbot that knows your medical history and can provide immediate care advice.
- **Medication Reminders**: Set reminders for your medications and receive SMS notifications when it's time to take them.

## 🛠 Tech Stack

- **Framework**: Next JS (React)
- **Authentication**: NextAuth.js (OAuth, JWT)
- **API**: tRPC for type-safe APIs
- **Database**: Prisma ORM with PostgreSQL
- **Styling**: Tailwind CSS, ShadCN UI Components
- **AI Integration**: OpenAI, Google Gemini
- **Containerization**: Docker
- **Deployment**: Vercel

## 🧑🏿‍💻 Installation

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

Make sure Docker is installed and running.

#### Start the local database using Docker Compose:

```bash
docker-compose -f docker-compose-local.yml up -d
```

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

Then visit http://localhost:3000 to view SickleSense in your browser.

📁 Project Structure

```bash
.
├── public                   # Static assets
├── src                      # Application source code
│   ├── app                  # Next.js pages and routing
│   ├── components           # Reusable UI components
│   ├── hooks                # Custom React hooks
│   ├── lib                  # Utility functions and libraries
│   ├── server               # Server-side code
│   ├── styles               # CSS and styling files
│   └── trpc                 # tRPC API routes and configurations
├── .env                     # Environment variables
├── .env.example             # Example environment variables
├── .eslintrc.js             # ESLint configuration
├── .gitignore               # Git ignore rules
├── docker-compose.yml       # Docker configuration for services
├── next.config.js           # Next.js configuration
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
