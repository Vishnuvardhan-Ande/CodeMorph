# CodeMorph

CodeMorph is an AI-powered code converter that allows developers to convert code between multiple programming languages.  
It uses **Groq's LLaMA models** in the backend and provides a simple **frontend editor** for writing, converting, and copying code.

---

## 🚀 Features
- Convert code between multiple programming languages (Python, Java, C++, JavaScript, etc.)
- Clean output (only runnable code, no extra explanations)
- Interactive frontend editor with syntax highlighting (CodeMirror)
- Copy-to-clipboard functionality
- Backend powered by **Express.js** and **Groq API**
- Frontend can be deployed on **Vercel**
- Backend can be deployed on **Render**

---

## 📂 Project Structure
CodeMorph/
│── backend/ # Node.js + Express server (handles API calls to Groq)
│ ├── index.js
│ ├── package.json
│ ├── .env # Contains API keys (not pushed to GitHub)
│── frontend/ # Static frontend
│ ├── index.html
│ ├── styles.css
│ ├── script.js
│── LICENSE # MIT License
│── README.md # Project documentation

yaml
Copy code

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Vishnuvardhan-Ande/CodeMorph.git
cd CodeMorph
'''

### 2️⃣ Backend Setup
bash
Copy code
cd backend
npm install

Create a .env file inside backend/ with:
GROQ_API_KEY=your_api_key_here

Run the backend:
node index.js

### 3️⃣ Frontend Setup
Open frontend/index.html in your browser
OR
Deploy frontend to Vercel

🌍 Deployment
Backend → Render

Frontend → Vercel

When deploying frontend, update your script.js to call your Render backend URL instead of http://localhost:5000.
