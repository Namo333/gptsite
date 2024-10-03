import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Forma from "../components/Forma";

const ChatPage = () => {
    const { id } = useParams();  // Получаем ID из параметров URL
    const [response, setResponse] = useState(null);

    useEffect(() => {
        // Запрос на получение ответа от ИИ
        const fetchResponse = async () => {
            try {
                const res = await fetch(`http://127.0.0.1:8000/get_response/${id}`);
                const data = await res.json();
                setResponse(data.response);
            } catch (error) {
                console.error("Ошибка при получении ответа:", error);
            }
        };

        fetchResponse();
    }, [id]);

    return (
        <div className="">
            <header>
                <Navbar />
            </header>
            <div className="w-full mx-auto max-w-screen-xl py-10 px-4 gap-10 flex flex-col">
                <section className="mt-[100px]">
                    <p>Ответ от GPT: {response ? response : 'Загрузка...'}</p>
                    <Forma />
                </section>
            </div>
        </div>
    );
};

export default ChatPage;
