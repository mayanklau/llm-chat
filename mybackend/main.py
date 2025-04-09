from fastapi import FastAPI, Request
from dotenv import load_dotenv
import os
import requests

load_dotenv()
api_key = os.getenv("OPENROUTER_API_KEY")

app = FastAPI()

@app.post("/chat")
async def chat(request: Request):
    try:
        body = await request.json()
        prompt = body.get("prompt", "")
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": "openai/gpt-3.5-turbo",
            "messages": [{"role": "user", "content": prompt}]
        }
        response = requests.post("https://openrouter.ai/api/v1/chat/completions", json=payload, headers=headers)
        return {"response": response.json()["choices"][0]["message"]["content"]}
    except Exception as e:
        return {"error": str(e)}
