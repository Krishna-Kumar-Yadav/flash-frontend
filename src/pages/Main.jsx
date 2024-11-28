import { useNavigate } from "react-router-dom";

const Main = () => {
    const navigate = useNavigate()
    return (
        <div className="main grid-15-85 w-full h-full select-none">
            <div className="main_header bg-slate-800 flex-center gap-4">
                <p className="font-bold text-[2rem] text-white p-8 ">Sign Up Today and Start Your Journey!</p>
                <button className="bg-blue-700 rounded-lg px-4 py-2  text-white cursor-pointer active:scale-[0.95]" onClick={() => navigate("/login")}>Log In</button>
                <button className="bg-blue-700 rounded-lg px-4 py-2 text-white cursor-pointer active:scale-[0.95]" onClick={() => navigate("/register")}>Register</button>
            </div>
            <div className="main_body bg-slate-900 flex-center flex-col">
                <img src="src/assets/images/bg-logo.png" className="h-48 border rounded-lg p-8" />
                <p className="font-bold text-[3rem] text-gray-500 p-8 left-6">Your Community Awaits—Dive In!</p>
            </div>

        </div>
    );
}

export default Main;