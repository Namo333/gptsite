import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ChatPage from "./pages/ChatPage"; // Импортируйте ваш компонент ChatPage

const App = () => {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/prompt/:id" element={<ChatPage />} /> {/* Добавлен маршрут для ChatPage */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;