import { useState } from 'react';
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

  return (
    <nav class="bg-[#0E1116] border-b-2 border-[#ffffff20]">
        <div class="max-w-screen-3xl flex flex-wrap items-center justify-between mx-auto py-4 px-8">
            <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ChatGPT</span>
            </Link>
            
            <a href="https://github.com/namo333">
                <svg viewBox="-0.5 -0.5 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" id="Github--Streamline-Unicons" height={26} width={26} ><desc>{"Github Streamline Icon: https://streamlinehq.com"}</desc><path d="M7.4999375 0.331375c-1.7452500000000002 0.0000625 -3.4335625 0.6211875 -4.7627500000000005 1.752125C1.4079375 3.2144375 0.5245 4.7815 0.24493750000000003 6.504250000000001c-0.2795625 1.7226875 0.063 3.4886875 0.966375 4.981999999999999 0.9033125 1.4931875 2.3085625000000003 2.6163125 3.9642500000000003 3.1683125 0.3675 0.06431250000000001 0.5053125 -0.1561875 0.5053125 -0.349125 0 -0.1745625 -0.0091875 -0.753375 -0.0091875 -1.3689375000000001 -1.8466874999999998 0.3399375 -2.3244375 -0.450125 -2.4714375 -0.8635625 -0.16312500000000002 -0.4020625 -0.4216875 -0.758375 -0.753375 -1.0381875 -0.25725000000000003 -0.1378125 -0.62475 -0.47775 -0.0091875 -0.4869375 0.2350625 0.025500000000000002 0.4604375 0.10731249999999999 0.6571875 0.2384375 0.1966875 0.131125 0.3589375 0.3078125 0.47287500000000005 0.5149374999999999 0.1005 0.1805625 0.2356875 0.3395625 0.39775 0.4678125 0.1620625 0.12825 0.347875 0.2233125 0.5467500000000001 0.2795625 0.198875 0.0563125 0.406875 0.072875 0.612125 0.048687499999999995s0.40375 -0.08862500000000001 0.584 -0.1896875c0.0318125 -0.3736875 0.19837500000000002 -0.7230625 0.468625 -0.9830625 -1.635375 -0.18375 -3.3442499999999997 -0.8176875 -3.3442499999999997 -3.6290625 -0.0103125 -0.7304375000000001 0.2591875 -1.4371875 0.753375 -1.97525 -0.22468749999999998 -0.6348750000000001 -0.1984375 -1.3316249999999998 0.0735 -1.94775 0 0 0.6155 -0.19293749999999998 2.02125 0.753375 1.2026249999999998 -0.33075 2.47225 -0.33075 3.6749375 0 1.4056875 -0.9555 2.02125 -0.753375 2.02125 -0.753375 0.2719375 0.616125 0.29825 1.312875 0.0735 1.94775 0.4955625 0.5371250000000001 0.7654375 1.2445625 0.753375 1.97525 0 2.8205625000000003 -1.7180624999999998 3.4453125 -3.3534375 3.6290625 0.175375 0.17775 0.3104375 0.39125 0.39606250000000004 0.6258125000000001 0.085625 0.2346875 0.11975 0.485 0.1000625 0.7339374999999999 0 0.983125 -0.0091875 1.773125 -0.0091875 2.0211875 0 0.19293749999999998 0.1378125 0.42262500000000003 0.5053125 0.349125 1.6527500000000002 -0.5564375 3.0539375 -1.6821875 3.9534374999999997 -3.1761875 0.8995625 -1.4940624999999998 1.2388124999999999 -3.2591875 0.9573125 -4.98025 -0.28150000000000003 -1.721 -1.1654375 -3.286 -2.494125 -4.4155625C10.93075 0.9529375 9.243875000000001 0.33231249999999996 7.4999375 0.331375Z" fill="#ffffff" strokeWidth={1} /></svg>
            </a>
        </div>
        <Outlet/>
    </nav>
  )
}

export default Navbar
