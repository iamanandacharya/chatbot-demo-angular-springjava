Customer Chatbot Application
This repository contains a full-stack customer chatbot application, featuring an Ionic Angular frontend, a Spring Boot backend, and a Jenkins CI/CD pipeline for automated builds, tests, and deployments. The backend integrates with OpenAI for intelligent chat responses.

Table of Contents
Project Overview

Features

Prerequisites

Getting Started

Backend Setup (Spring Boot)

Frontend Setup (Ionic Angular)

Running the Application

CI/CD with Jenkins

Project Structure

Contributing

License

1. Project Overview
This application provides a responsive live chat interface for customer support. The frontend, built with Ionic Angular, offers a modern and mobile-friendly user experience. The backend, developed using Spring Boot, handles API requests and communicates with the OpenAI API to generate intelligent responses to customer queries. The entire development process is streamlined with a Jenkins CI/CD pipeline, ensuring continuous integration and automated deployment.

2. Features
Responsive Chat Interface: Built with Ionic Angular for seamless experience across devices (web, mobile).

AI-Powered Responses: Integrates with OpenAI's large language models to provide dynamic and helpful replies.

Spring Boot Backend: Robust and scalable backend to manage chat interactions and OpenAI integration.

Real-time Typing Indicator: Enhances user experience by showing when the bot is generating a response.

Automated CI/CD: Jenkins pipeline for automated building, testing, and deployment of both frontend and backend.

3. Prerequisites
Before you begin, ensure you have the following installed:

Node.js & npm:

Node.js (LTS version)

Ionic CLI:

npm install -g @ionic/cli

Java Development Kit (JDK):

JDK 21 or newer (or OpenJDK)

Maven:

Apache Maven

OpenAI API Key:

Obtain one from the OpenAI Platform.

Docker (Optional, for CI/CD):

Docker Desktop (if you plan to use the Dockerization stages in Jenkins)

Jenkins (Optional, for CI/CD):

A running Jenkins instance with necessary plugins (Pipeline, Git, NodeJS, Maven Integration, Docker Pipeline).

4. Getting Started
Follow these steps to set up and run the application locally.

Backend Setup (Spring Boot)
Clone the repository:

git clone chatbot-demo-angular-springjava
cd chatbot-demo-angular-springjava

Configure OpenAI API Key:

Open src/main/resources/application.properties.

Replace YOUR_OPENAI_API_KEY with your actual OpenAI API key:

openai.api.key=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
openai.model=gpt-3.5-turbo # Or gpt-4, gpt-4o, etc.
openai.api.url=https://api.openai.com/v1/chat/completions
server.port=8080

Build the backend:

mvn clean package

Frontend Setup (Ionic Angular)
Navigate to the frontend directory:

cd chatbot-demo-angular-springjava/my-chatbot-frontend

Install dependencies:

npm install

Verify Backend URL:

Open src/app/home/home.page.ts (or chat.page.ts if renamed).

Ensure backendUrl matches your Spring Boot backend's address (default is http://localhost:8080/api/chat):

// src/app/home/home.page.ts
backendUrl: string = 'http://localhost:8080/api/chat';

5. Running the Application
To run the full application, you need to start both the backend and the frontend.

Start the Spring Boot Backend:

Navigate to the my-chatbot-backend directory.

Run the application:

mvn spring-boot:run

The backend will start on http://localhost:8080.

Start the Ionic Angular Frontend:

Open a new terminal and navigate to the my-chatbot-frontend directory.

Run the Ionic development server:

ionic serve

The frontend will typically open in your browser at http://localhost:8100.

Now you can interact with the chatbot in your browser.

6. CI/CD with Jenkins
This project includes a Jenkinsfile in the root directory that defines a declarative CI/CD pipeline.

Pipeline Stages:

Checkout: Fetches the latest code from the Git repository.

Build Frontend: Installs Node.js dependencies and builds the Ionic Angular application for production.

Test Frontend (Optional): Placeholder for running frontend unit/e2e tests.

Build Backend: Cleans and packages the Spring Boot application using Maven.

Test Backend: Runs all unit and integration tests for the Spring Boot application.

Dockerize (Optional): Builds Docker images for both the frontend (served by Nginx) and the backend (Java JAR). Includes commented-out sections for pushing images to a Docker registry.

Deploy (Example): A placeholder stage for deployment. This needs to be customized based on your target environment (e.g., Kubernetes, cloud services, SSH deployment).

To set up the Jenkins pipeline:

Ensure your Jenkins server has the necessary plugins (Pipeline, Git, NodeJS, Maven Integration, Docker Pipeline).

Create a new "Pipeline" job in Jenkins.

Configure the SCM to point to your Git repository.

Set the "Script Path" to Jenkinsfile (default).

Configure any required Jenkins Credentials for Docker registry login or SSH access if you enable those steps.

7. Project Structure
.
├── Jenkinsfile                  # Jenkins CI/CD Pipeline definition
├── my-frontend-angular          # Ionic Angular Frontend
│   ├── src
│   │   ├── app
│   │   │   ├── home
│   │   │   │   ├── home.page.html
│   │   │   │   ├── home.page.scss
│   │   │   │   └── home.page.ts
│   │   │   └── app.module.ts
│   │   └── ...
│   ├── package.json
│   └── ...
└── backend           # Spring Boot Backend
    ├── src
    │   ├── main
    │   │   ├── java
    │   │   │   └── com
    │   │   │       └── example
    │   │   │           └── chatbot
    │   │   │               ├── ChatbotApplication.java
    │   │   │               ├── config
    │   │   │               │   └── OpenAIConfig.java
    │   │   │               ├── controller
    │   │   │               │   └── ChatController.java
    │   │   │               └── service
    │   │   │                   └── OpenAIService.java
    │   │   └── resources
    │   │       └── application.properties
    │   └── ...
    └── pom.xml

8. Contributing
Feel free to fork the repository, open issues, and submit pull requests.

9. License
This project is open-sourced under the MIT License.