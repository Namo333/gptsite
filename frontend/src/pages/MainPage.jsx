import Navbar from "../components/Navbar"
import Forma from "../components/Forma"

const MainPage = () => {
  return(
    <div className="">
        <header>
            <Navbar/>
        </header>
        <div className="w-full mx-auto max-w-screen-xl py-10 px-4 gap-10 flex flex-col">
            <section className="mt-[100px]">
                <h1 className="text-[110px] max-md:text-[65px] text-center font-bold">Chat GPT from <span className="text-blue-500">Namo</span></h1>
                <Forma />
            </section>
        </div>
    </div>
  )
}

export default MainPage
