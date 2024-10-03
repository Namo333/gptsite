from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import openai
import os
import json
import time

app = FastAPI()

# Настройка CORS
origins = [
    "http://localhost:5173",  # Добавьте URL вашего фронтенда (или "http://127.0.0.1:5173" если используется этот адрес)
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Разрешенные источники
    allow_credentials=True,
    allow_methods=["*"],  # Разрешаем все методы (GET, POST и т.д.)
    allow_headers=["*"],  # Разрешаем все заголовки
)

# Установите ваш ключ OpenAI API
openai.api_key = 'sk-abcdef1234567890abcdef1234567890abcdef12'

class PromptRequest(BaseModel):
    prompt: str

# Функция для обработки промта
def process_prompt(prompt: str) -> dict:
    unx_time = int(time.time())
    os.makedirs(f"./data/{unx_time}/json/", exist_ok=True)

    conversation_history = [{"role": "user", "content": prompt}]

    # Записываем запрос в JSON файл
    with open(f"./data/{unx_time}/json/{unx_time}.json", 'w', encoding="utf-8") as file:
        json.dump({"title": unx_time, "chat": conversation_history}, file, indent=4, ensure_ascii=False)

    try:
        # Запрашиваем ответ от GPT-3.5 через OpenAI API
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=conversation_history,
        )
        bot_response_text = response['choices'][0]['message']['content']
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
