import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage";

const App = () => {
  return(
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
