# QA Copilot

AI-powered QA Agent that generates testing artifacts from natural-language requirements.

## Live Demo

[QA Copilot](https://qacraft.netlify.app/)

## Features

- Manual Test Case Generation
- API Test Case Generation
- SQL Validation Queries
- Edge Case Generation
- Playwright Automation Script Generation

## Tech Stack

### Frontend
- React
- JavaScript
- CSS
- TypeScript

### Backend
- Node.js
- Express.js
- TypeScript
- Google Gemini API

## Architecture

React Frontend (Netlify)
        ↓
Express REST API (Render)
        ↓
Google Gemini API
        ↓
Generated QA Artifacts

## Local Setup

### Backend

```bash
cd server
npm install
npm start

Create a .env file:

GEMINI_API_KEY=your_api_key
GEMINI_MODEL=gemini-3.6-flash

Frontend
cd client
npm install
npm start

👨‍💻 Author

Sudarshan Shinde

