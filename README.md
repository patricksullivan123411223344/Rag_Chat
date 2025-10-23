RAG Chat Project (JSX + Python)

Overview:
This is a lighweight Retrieval-Augmented Generation (RAG) chat tool using a Next frontend and a Python backend. The goal is to create a local, privacy focused AI assistant that can read your Obsidian notes, embed them, and query them through a locally hosted Ollama model (Tinyllama 1.1B for light compute). 

Tech Stack:
For the frontend, I decided to use the Next.js framework styled with Tailwind + Framer Motion for animations. The backend uses the FastAPI framework and ChromaDB vector store all wired together with Python. The Ollama model uses my local Obsidian vault as a knowledge base. 

Running the Project:
1. Start the Backend: "cd backend" --> "pip install -r requirements.txt" --> "python app.py"
2. Start the Frontend: "cd frontend" --> "npm install" --> "npm run dev"
3. Env Variables: Create a .env file in your backend directory. Be sure to include your      "OBSIDIAN_PATH = <>" "MODEL_NAME = <>" "VECTOR_DB=chroma"

Enjoy!