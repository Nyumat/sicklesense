## [Sickle Sense](https://sicklesense.vercel.app)

**The AI-powered companion for thriving with Sickle Cell**

**Disclaimer:** If you'd like to try out Sickle Sense, you'll need to checkout (hint: `PUN-INTENDED.md`) on the Sickle Sense GitHub repo for the secret access instructions. I did this to prevent people using the application before the hackathon is complete. For any other queries, my email is **nyumat18@gmail.com**.

### Inspiration

---

Sickle cell is a blood disorder and one of the most common inherited disease worldwide, affecting over 300,000 babies annually, with the greatest burden of the disease coming within sub-Saharan Africa [[1]](https://www.texaschildrens.org/content/wellness/sickle-cell-disease-most-common-inherited-disease-world#:~:text=Sickle%20cell%20disease%20is%20an,disease%20within%20sub%2DSaharan%20Africa.).

For the over **8 million people worldwide** impacted by Sickle Cell, managing the condition often involves a complex and challenging journey, one which extends far beyond the physical symptoms of the disease.

Patients frequently report feeling unheard or misunderstood by healthcare providers, exacerbating the challenges of living with a chronic illness. As one patient poignantly described in a study [[2]](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6854201/) on the experiences of hospitalized sickle cell patients:

> “Sometimes they do not really want to listen… on some occasions I’m running into those (doctors) who like, ‘I do not care what you are talking about, you ain’t going to school for this, I did.”

Even me, living with sickle cell my entire life too, I've experienced these same challenges firsthand. Whether it's inconsistent care from one clinic to the next, or lacking a supportive network of others with shared experiences, and the most challengine, not having a system which considers **my own** unique experiences as an individual with the condition. I always think to myself:

> *It's really 2024, how have we not found a solution to this yet! ☹️*

And while there have been many attempts to address some of these issues, I bet—even within this hackathon, given the theme; many of these existing solutions are either too generic, don’t cater specifically to sickle cell, or fail to provide a **truly personalized** experience.

These tools typically overlook the need for **what truly matters to patients**. Things such as:

- Comprehensive Symptom, Medication, and Appointment Tracking
  - _Most tools/platforms support exclusively one of these approaches, and not all_
- Real-time Health Data Ingestion and Analysis
  - _Past attemps didn't have access to transormative large language models and wearable device APIs like the one's we see today_
- A centralized, accessible community of individuals sharing a common trait
- _Former solutions usually lack a community aspect, which is crucial for individuals with chronic illnesses_ [^3]
- Critical Health Information Data Visualization
  - _Most platforms are text-heavy, lack visualizations, and don't provide actionable insights_
- Reminders and Alerts for Medication, Appointments, and Health Plans
  - _As humans, we're forgetful, and most platforms don't provide reminders or alerts, lacking value unless the user makes an effort to actively use the platform_

[^3]: What typically happens is there's an organization, (e.g., [the Sickle Cell Disease Association of America](https://www.sicklecelldisease.org/)), but these organizations are usually focused on advocacy, research, and education, rather than providing a platform for individuals to connect and share their experiences. Additionally, these organizations are often limited in scope, focusing on a specific region or country, rather than providing a global platform for individuals with sickle cell to connect.

This shortage of a comprehensive, personalized, and supportive platforms for sickle cell patients is a glaring gap in the healthcare ecosystem. And unfortunately, since nothing like currently exists, we're leaving many people, including me—feeling isolated and unsupported.

### Why I built Sickle Sense

---

Upon seeing the themes for the hackathon, I was considering building an application to help people find jobs. But then, I realized. Should I use this unique oppourtunity to build yet another job tracking app, or should use this time to address a problem that I've been passionate about for years, even discussing with my hematologist a few times during my check-ups?

> I only started programming in college, so not long ago, I didn't have the skills to build a platform like Sickle Sense.

But...now that I actually have the skills to do so, I thought, why not build a platform that could truly make a difference in the lives of those with sickle cell? Well, that's exactly what I did.

I decided to build Sickle Sense. Afer locking in the idea, I quickly started researching the latest advancements in sickle cell care, existing platforms, and the unique challenges faced by the community.

Interestingly enough, during my reaearch, I stumbled upon a 2023 paper titled _"Artificial intelligence in sickle cell disease"_ which highlighted AI's potential to transform sickle cell disease management through early diagnosis of crises, risk stratification, and personalized treatment [[4]](https://www.sciencedirect.com/science/article/pii/S0268960X23000632?via%3Dihub).

This research resonated with my own experiences and the common challenges faced by the global SCD community. I realized that AI could empower individuals with the condition, providing tools for better self-management and improved healthcare outcomes.

> Whenever I get hospitalized due to complications with my SCD, I always wished I had a tool that could help me better understand my condition, and maybe help me save myself from a crisis before it happens. 

Not long after, my goal became clear. I want to provide a holistic, accessible, solution that provides tangible insights by utilizing both:
  - **Qualitative data**: Submitted by users about their symptoms, lifestyle, and daily experiences.
  - **Quantitative data**: Collected in real-time via wearable device APIs.

Espeically because in traditional health companion appplications, manually importing health records from healthcare providers, or requiring the user to constantly upload documents and manually input data is the norm. However, this approach often fails short, since these records are of course, **static** snapshots in time, providing limited insight into a patient’s day-to-day health.

With Sickle Sense, real-time wearable data (like heart rate, oxygen levels, and activity tracking) enters the play, allows for dynamic health monitoring. This continuous flow of information, **when combined** with user-submitted data, can paint a much clearer picture of the patient’s condition, helping to detect patterns and predict crises before they escalate.

### What Sickle Sense does

---

Sickle Sense does more than just provide generic health tips. **Sickle Sense is a fleet of software services** (distributed system, application, and data pipeline), all designed to provide a comprehensive solution for individuals to manage their sickle cell disease in the form of a web application. Every component is thoughtfully crafted to empower those living with Sickle Cell to take control of their health. Here's a breakdown of the key features:

### **AI-Powered Health Plans**

---

[![AI Health Plan](https://i.ibb.co/5v0M2hf/Screenshot-2024-10-01-at-6-57-15-AM.png)](https://sicklesense.vercel.app)
[![Inactive AI Health Plan](https://i.ibb.co/vBNs5bV/Screenshot-2024-10-01-at-8-35-01-AM.png)](https://sicklesense.vercel.app)

Users can:

- Create personalized health plans based on their unique health data
  - Edit and update health plans as needed
- Receive AI-generated recommendations for managing their condition
  - Including lifestyle changes, medication adjustments, and more
- Pause, resume, or delete health plans at any time

**How?**

SickleSense leverages web crawling, semantic search, and retrieval augmented generation (rag) to deliver personalized recommendations and predict potential crises based on user-specific health data collected, all at the click of a button. This proactive approach empowers users to take charge of their health by anticipating issues before they arise, without the need for manual data entry like other platforms.

### **Comprehensive Health Logging**

---

[![Medication & Appointment Logging](https://i.ibb.co/GpYFrpf/Screenshot-2024-10-01-at-7-04-11-AM.png)](https://sicklesense.vercel.app)
[![Symptom Logging](https://i.ibb.co/LRtPMfL/Screenshot-2024-10-01-at-7-04-25-AM.png)](https://sicklesense.vercel.app)

Users can:

- Add medications with dosage and frequency, and set in-app reminders
  - Including optional Email/SMS reminders
- Add symptoms and their corresponding severity levels
- Add appointments with their hematologist or other healthcare providers
- Add notes about their health, lifestyle, or other relevant information

Collecting a comprehensive health history improves personal care, enhances communication during medical consultations, aids the Sickle Sense A.I. services in making accurate suggestions, and ensures that in the event healthcare providers request patient data, they can have a complete view of the a users very own Sickel Cell history.

### **Wearable Device Integration**

---

[![Connect Device](https://i.ibb.co/09M6K3x/Screenshot-2024-10-01-at-7-22-07-AM.png)](https://sicklesense.vercel.app)
[![Wearable Device Metrics Charts](https://i.ibb.co/P119FCY/Screenshot-2024-10-01-at-7-21-32-AM.png)](https://sicklesense.vercel.app)
[![Charts + A.I. Insight](https://i.ibb.co/qByX4QL/Screenshot-2024-10-01-at-7-22-22-AM.png)](https://sicklesense.vercel.app)

Users can:

- Connect their FitBit device to Sickle Sense
- Monitor real-time FitBit data, including heart rate, oxygen levels, and activity
- Receive insights and recommendations based on their FitBit data and logs and receive alerts for potential Sickel Cell crises

Unlike many attempts to build a healthcare companion app in the past, Sickle Sense integrates real-time health data from FitBit devices utilizing their developer [Subscriptions API](https://dev.fitbit.com/build/reference/web-api/subscription/).

This data is then used to power the entire platform—enhancing the accuracy of Sickle Sense health plans, chatbot responses, and device-led insights. By continuously monitoring vital signs and other exposed metrics through the API, Sickle Sense provides a unique understanding of each user's health status, that's always up-to-date.

### **AI-Powered Chatbot**

---

[![Chatbot](https://i.ibb.co/QnDG79w/Screenshot-2024-10-01-at-7-35-29-AM.png)](https://sicklesense.vercel.app)

Users can:

- Chat with the Sickle Sense AI assistant to receive context-aware health advice
- Select one of the predefined questions (generated by the AI) or ask their own
- Receive responses trained on sickle cell related documents and their own health data

> The elasticsearch data pipeline I developed of sickle cell related information contains over **54,000** sickle cell related documents, enabling a system that truly understands the condition.

Unliike most generally available, non-finetuned chatbots, Sickle Sense's AI assistant uses [Semantic Search](https://www.pinecone.io/solutions/semantic/) and [Retrieval Augmented Generation (RAG)](https://www.pinecone.io/learn/retrieval-augmented-generation/) to understand the meaning behind user queries.

This allows the chatbot to provide accurate, context-aware responses to chat messages, making it a valuable resource for Sickle Sense users seeking immediate health advice on the condition.

### **In-App Community Forum**

---

[![Community Forum Post](https://i.ibb.co/1RMdjrp/Screenshot-2024-10-01-at-7-47-42-AM.png)](https://sicklesense.vercel.app)
[![Community Forum Reply](https://i.ibb.co/NsRGK66/Screenshot-2024-10-01-at-7-50-10-AM.png)](https://sicklesense.vercel.app)

Users can:

- Share their experiences, ask questions, and provide support to others in the community
- Create posts, comment on others' posts, and upvote helpful content
- Search across the forum for specific topics, posts, or users to connect with

The community forum is a safe space for individuals with sickle cell to connect, share their stories, and support one another. By fostering a sense of community, SickleS ense aims to reduce feelings of isolation and provide a platform for users to seek advice, share experiences, and build relationships with others who understand their journey.

> I'd say this was my favorite feature to build despite not leveraging A.I. in it. I've always wanted to build a community platform for people with the same illness as me, and I'm glad I got to do it for Sickle Sense.

### **Customizable Dashboard and Email/SMS Alerts**

---

[![Medication Reminder Email](https://i.ibb.co/vwyX270/Screenshot-2024-10-01-at-8-13-04-AM.png)](https://sicklesense.vercel.app)
[![Dashboard](https://i.ibb.co/2jpqt74/Screenshot-2024-10-01-at-8-00-30-AM.png)](https://sicklesense.vercel.app)

Users can:

- Customize their dashboard to display the information most important to them
- Set up email and SMS alerts for medication reminders, appointment notifications, and health plan updates
- Receive real-time alerts for potential crises based on their health data and FitBit metrics

Can't remember when to take your medication? (~~I am guilty of this, personally~~). Want to show certain information on your dashboard like your SpO2 levels, but not your heart rate? Sickle Sense has you covered.

Sickle Sense allows users to customize their dashboard to display the information most important to them, set up email and SMS alerts for medication reminders, appointment notifications, and health plan updates, and receive real-time alerts for potential crises based on their health data and FitBit metrics.

### How I built Sickle Sense

---

![System Design Excalidraw](https://i.ibb.co/sH34ppM/Screenshot-2024-09-29-at-11-16-54-AM.png)

Sickle Sense is a distributed system composed of three main services + a database:

- **Publisher Service:** A TypeScript (Bun.js ❤️) backend service that handles real-time health data ingestion, FitBit API integration, and broadcasting of various information to the Elasticsearch and Platform services.
- **Elasticsearch Service:** A python (FastAPI) backend service that manages the search engine, data retrieval, and AI integrations on the platform.
- **Platform Service:** A Next.js (React) web application that provides the user interface, authentication, and client-side business logic for the application.
- **Database:** A PostgreSQL database managed by Prisma that stores user data, health logs, and other relevant information.

Each component is designed to be independent, scalable, and resilient, (hence distributed system) allowing for seamless communication between components and ensuring that the platform can handle real-world usage.

> Honestly, I'm suprised in myself for being able to build such a complex system in such a short amount of time. The diagram above is a bit more complex than what I'm used to, but I'm glad I was able to pull it off.

### Tooling and Technologies

---

Sickle Sense was built using some of my favorite technologies—that I don't even get use at work! Here's a overview of the key tools and services used in the development of Sickle Sense:

### Publisher Service

- **Framework:** [Bun.js](https://bun.sh/) for efficient server-side JavaScript runtime
- **Message Broker:** [Ably](https://ably.com/) for real-time messaging and pub/sub capabilities
- **Email Service:** [Resend](https://resend.com/) for sending emails seamlessly
- **Deployment:** [Render](https://render.com/) for quick hobby-tier rdeployments
- **Device Data Integration:** [Fitbit API](https://dev.fitbit.com/build/reference/web-api/) for accessing health data from wearable devices
- **Real-time Data Ingestion:** [Fitbit Subscriptions API](https://dev.fitbit.com/build/reference/web-api/subscription/) for real-time health data ingestion

### Elasticsearch Service

- **Web Framework:** [FastAPI](https://fastapi.tiangolo.com/) for building APIs with Python
- **Cloud Platform:** [Elasticsearch](https://www.elastic.co/elasticsearch/) for powerful semantic search, RAG, and web crawling capabilities
- **Data Validation:** [Pydantic](https://pydantic-docs.helpmanual.io/) for data validation and serialization
- **AI Integration:** [OpenAI](https://pypi.org/project/openai/) Python client library for accessing the OpenAI API and providing text completions
- **Deployment:** [Render](https://render.com/) for quick hobby-tier deployments

### Platform Service

- **Asynchronous Tasks/Cron Jobs:** [Trigger.dev](https://trigger.dev/) for managing background tasks and cron jobs
- **Framework:** [Next.js](https://nextjs.org/) for a robust, multi-paradigm React application framework
- **Authentication:** [NextAuth.js](https://next-auth.js.org/) for secure OAuth and JWT-based authentication experience
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) for simple state management in React
- **Data Fetching:** [React Query](https://react-query.tanstack.com/) for efficient data fetching and synchronization
- **Data Visualization:** [Recharts](https://recharts.org/en-US/) for creating responsive charts
- **Client Search Functionality:** [Fuse.js](https://fusejs.io/) for fuzzy search capabilities
- **API:** [tRPC](https://trpc.io/) for type-safe, RPC-style, client <-> server communication
- **Database:** [Prisma](https://prisma.io/) ORM with [PostgreSQL](https://www.postgresql.org/) for efficient data management
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/) components for a flexible design system and ergonomic UI primitives
- **AI Integration:** OpenAI wrapped around the [Vercel AI SDK](https://sdk.vercel.ai/) for structured text completions and vector embeddings
- **Containerization:** [Docker](https://www.docker.com/) for spinning up development services with ease
- **Deployment:** [Vercel](https://vercel.com/) for seamless continuous deployment with only `git push`

### Challenges I ran into

---

As the sole developer—building the project from the ground up for this hackathon, I faced several challenges:

1. Using a new tech stack for hackathon was geat for learning but not for speed. I ran into many gotchas/road blocks with configuring services, namely, tRPC, Resend, Twolio, and Elastisearch.
2. Syncing business-logic with external APIs like FitBit proved to be quite difficult, especially with a SQL database where the schema is not as flexible as some of the alternative options (e.g., MongoDB).
3. Ensuring data privacy and security while handling sensitive health information, even though it's "just a hackathon" (security always matters!).
4. Creating an intuitive UI that caters to users who may be experiencing pain or fatigue, don't use web apps very frequently, or might not be in the United States took meticulous testing.
5. Developing a comprehensive feature set within the hackathon timeframe given everything above. It was a battle, but so much fun! Especially since I also live with SCD and face these issues, knowing what to build came quite easily. It's always nice solving problems that even you face yourself.

### Accomplishments that I'm proud of

---

1. Successfully integrating FitBit data into the platform, allowing for real-time health monitoring and insights.
2. Building essentially a distributed system which could successfully handle real-world scale/usage of Sickle Sense.
3. Creating a quite complex but, more importantly, easy to use client interface which prioritizes accessibility and simplicity.
4. Building an app that not only I find useful, but one that I believe can make a real difference in the lives of others with sickle cell.
5. Leveraging cutting-edge AI technologies like RAG, LLMs, and embeddings to provide personalized health recommendations and insights to users.

### What I got out of this

---

1. A further understanding of how LLMs, embeddings, RAG, and various other next-generation AI techniques/technologies can be applied for real-world use cases, such as the one for Sickle Sense.
2. Heightened skills in multi-service full-stack development, database administration.
3. New insights into the unique challenges of developing health tech-related solutions for customers and possible pain-points and their solutions.
4. An understanding of the sheer importance of user-centric design in healthcare applications.
5. Realization of the power technology has in addressing gaps in healthcare support systems.

### What's next for SickleSense

---

The journey of SickleSense is **just beginning**:

1. Before turning this into an actual product for the public, I want to partner with sickle cell organizations, my hematology oncology clinic, and other healthcare/legal professionals to promote the app and gather user feedback.
2. There needs to be a corresponding mobile app version of Sickle Sense for iOS and Android to take advantage of native health record retreival APIs (_looking at you Apple HealthKit and Google Fit_).
3. Support i18n internationalization language support to reach the global sickle cell community.
4. Integrate more wearable devices like Apple Watch, Oura Ring, and other health monitoring devices to provide a more broad health monitoring experience.
5. Register for A2P 10DLC compliance with Twolio, so medicine reminders can be through SMS and not just email.
6. Further validate and refine the AI approach Sickle Sense takes to provide personalized health recommendations and insights.

### Acknowledgements

---

Del Pino-Jones, A., Bowden, K., Misky, G., & Jones, C. D. (2019). Improving Care for Patients with Sickle Cell Disease: a Qualitative Study of Hospitalized Sickle Cell Patients. Journal of general internal medicine, 34(12), 2693–2694. https://doi.org/10.1007/s11606-019-05304-z

Elsabagh, A. A., Elhadary, M., Elsayed, B., Elshoeibi, A. M., Ferih, K., Kaddoura, R., Alkindi, S., Alshurafa, A., Alrasheed, M., Alzayed, A., Al-Abdulmalek, A., Altooq, J. A., & Yassin, M. (2023). Artificial intelligence in sickle disease. Blood reviews, 61, 101102. https://doi.org/10.1016/j.blre.2023.101102
