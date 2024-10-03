from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import os
import json
import time
from transformers import pipeline

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

gpt_model = pipeline('text-generation', model='bigscience/bloom-560m')

class PromptRequest(BaseModel):
    prompt: str

def process_prompt(prompt: str) -> dict:
    unx_time = int(time.time())
    os.makedirs(f"./data/{unx_time}/json/", exist_ok=True)

    conversation_history = [{"role": "user", "content": prompt}]

    # Записываем запрос в JSON файл
    with open(f"./data/{unx_time}/json/{unx_time}.json", 'w', encoding="utf-8") as file:
        json.dump({"title": unx_time, "chat": conversation_history}, file, indent=4, ensure_ascii=False)

    try:
        # Генерируем ответ с помощью модели BLOOM
        bot_response = gpt_model(prompt, max_length=200, num_return_sequences=1, truncation=True)  # Добавляем truncation=True
        bot_response_text = bot_response[0]['generated_text'].strip()  # Удаляем лишние пробелы

    except Exception as e:
        bot_response_text = "Извините, произошла ошибка."

    # Добавляем ответ в историю и сохраняем её
    conversation_history.append({"role": "assistant", "content": bot_response_text})

    with open(f"./data/{unx_time}/json/{unx_time}.json", 'w', encoding="utf-8") as file:
        json.dump({"title": unx_time, "chat": conversation_history}, file, indent=4, ensure_ascii=False)

    return {"id": unx_time, "response": bot_response_text}


# Маршрут для обработки промта
@app.post("/process_prompt")
async def process_prompt_route(prompt_request: PromptRequest):
    result = process_prompt(prompt_request.prompt)
    return JSONResponse(content=result)

# Маршрут для получения сохраненного ответа
@app.get("/get_response/{id}")
async def get_response(id: int):
    try:
        with open(f"./data/{id}/json/{id}.json", 'r', encoding="utf-8") as file:
            data = json.load(file)
        return JSONResponse(content={"response": data["chat"][-1]["content"]})
    except FileNotFoundError:
        return JSONResponse(content={"error": "Файл не найден"}, status_code=404)
