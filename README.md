# SickleSense

**SickleSense** is a web application designed to empower individuals with sickle cell disease (SCD) by providing AI-driven care insights, real-time support, and a community of patients, caregivers, and healthcare professionals.

## 🚀 Features

- **AI-Driven Health Insights**: Personalized recommendations, symptom tracking, and crisis alerts powered by OpenAI and Google Gemini.
- **Medication and Care Plan Management**: Create and manage care plans, medication reminders, and doctor appointments with ease.
- **Community Support**: Join support groups and chat with other patients, caregivers, and medical professionals.
- **Crisis Alerts**: Get real-time notifications for potential health crises based on symptom logs and AI predictions.
- **Personalized Resources**: Access articles, videos, and tips tailored to your specific health needs.

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
│   ├── components           # Reusable components (UI elements, forms, etc.)
│   ├── pages                # Next.js pages (each file represents a route)
│   ├── prisma               # Prisma schema and database client
│   ├── styles               # TailwindCSS configurations
│   └── utils                # Utility functions and helpers
├── .env.example             # Environment variables example file
├── .eslintrc.cjs            # ESLint configuration
├── docker-compose.yml       # Docker setup for local database
├── package.json             # Project dependencies and scripts
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
