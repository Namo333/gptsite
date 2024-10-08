import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Forma = () => {
    const [prompt, setPrompt] = useState('');
    const navigate = useNavigate();  // Hook для навигации на другую страницу

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Отправляем промт на бекенд
            const response = await fetch('http://127.0.0.1:8000/process_prompt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            if (response.ok) {
                const data = await response.json();
                const id = data.id;  // Предположим, что бекенд возвращает ID
                navigate(`/prompt/${id}`);  // Перенаправляем на страницу с результатом
            } else {
                console.error('Ошибка при отправке промта');
            }
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center max-w-lg mx-auto mt-[30px]">
            <label htmlFor="voice-search" className="sr-only">Search</label>
            <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z" />
                    </svg>
                </div>
                <input
                    type="text"
                    id="voice-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write a prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="flex items-center justify-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Send
            </button>
        </form>
    );
};

export default Forma;
