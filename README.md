# quwin.dev

This repository contains the source code for my personal portfolio website, built to showcase my background, education, work experience, projects, and technical interests. The site also includes an interactive Project Assistant powered by a Retrieval-Augmented Generation system that answers questions about my projects using GitHub documentation as context.

## Overview

The portfolio is designed as a clean, responsive, single-page website with sections for:

* About me
* Education
* Work experience
* Projects
* Contact links
* Resume
* Interactive Project Assistant

The homepage introduces who I am, provides links to my GitHub, LinkedIn, and email, and presents my portfolio content through reusable React components. The site is organized around modular components for the viewport hero, navigation, content sections, project cards, education entries, experience entries, and the assistant interface.

## Tech Stack

The portfolio is built with:

* **Next.js** – React framework used for the application structure and API route handling
* **React** – Component-based UI development
* **TypeScript** – Type-safe component props, API request/response types, and application logic
* **Tailwind CSS** – Utility-first styling and responsive layout
* **Vercel** – Deployment platform
* **React Markdown** – Rendering assistant responses with Markdown support
* **remark-gfm** – GitHub Flavored Markdown support for assistant responses

## Project Assistant

A key feature of the site is the Project Assistant, an embedded chat interface that allows visitors to ask questions about selected projects.

The assistant lets users choose from project contexts such as:

* About Me
* RAG Pipeline
* GPU Poker Solver
* Discord Community Utilities
* API Gateway + Rate Limiter
* Portfolio Website

Each project maps to a corresponding documentation collection. When a user submits a question, the frontend sends the question and selected collection name to the local Next.js API route:

```ts
/api/rag/ask
```

The API route then forwards the request to an external RAG backend using the configured environment variable:

```env
RAG_API_URL=
RAG_API_KEY=
```

The request includes retrieval parameters such as `top_k`, `rerank_top_k`, `dense_weight`, and `sparse_weight`. The RAG backend retrieves relevant GitHub documentation chunks, reranks them, generates a grounded answer, and returns sources and confidence metadata.

The frontend displays:

* The assistant's answer
* Linked source files
* Retrieval confidence
* Answer completeness

This allows the portfolio to function not only as a static resume site, but also as an interactive technical documentation interface for my projects.

## RAG Backend Integration

The Project Assistant integrates with my separate [RAG Pipeline for GitHub Documentation](https://github.com/quwin/RAG-Github-Documentation-Pipeline) project. That system is responsible for ingesting GitHub documentation, embedding content, storing vectors, retrieving relevant chunks, and generating cited responses.

At a high level, the integration works like this:

1. A visitor selects a project in the portfolio assistant.
2. The selected project determines the RAG collection name.
3. The visitor submits a question.
4. The Next.js frontend sends the question to `/api/rag/ask`.
5. The API route forwards the question to the external RAG backend.
6. The backend retrieves relevant GitHub documentation.
7. The backend returns a cited answer, source chunks, and confidence scores.
8. The portfolio displays the answer and links to the relevant source files.

This architecture keeps the frontend lightweight while allowing the assistant to answer project-specific questions using external documentation and code context.

## Local Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Then open:

```txt
http://localhost:3000
```

## Environment Variables

Create a `.env.local` file in the project root:

```env
RAG_API_URL=your_rag_backend_url
RAG_API_KEY=your_optional_api_key
```

`RAG_API_URL` is required for the Project Assistant to query the backend. `RAG_API_KEY` is optional and is only sent if configured.

## Deployment

The site is intended to be deployed on Vercel. The RAG backend URL and API key should be configured as environment secrets in the deployment settings.

## Repository Structure

```txt
app/
  api/
    rag/
      ask/
        route.ts        # Next.js API route for forwarding assistant questions
  Content.tsx           # Main page content sections
  ViewportPage.tsx      # Landing viewport
  ProjectAssistant.tsx  # Chat interface for project-specific RAG queries
  Projects.tsx          # Project list data
  Project.tsx           # Reusable project card
  Education.tsx         # Education entry component
  Experience.tsx        # Experience entry component
  Navbar.tsx            # Scroll navigation
  globals.css           # Global Tailwind and site styles
```

## Featured Projects

The portfolio highlights projects including:

* **RAG Pipeline for GitHub Documentation** – A deployable RAG pipeline for ingesting and querying GitHub documentation
* **UnderTheGun** – A GPU-accelerated postflop poker solver
* **API Gateway + Rate Limiter** – A configurable Go API gateway with per-plan rate limiting
* **infiniportal** – A full-stack web platform with Discord chatbot utilities
* **Belevator** – A deterministic physics-based mobile game
* **Portfolio Website** – This website

## Purpose

This portfolio is meant to demonstrate both my software engineering background and my ability to build practical AI-assisted developer tools. By combining a traditional portfolio with a RAG-powered documentation assistant, the site gives visitors a more interactive way to explore my technical work.
