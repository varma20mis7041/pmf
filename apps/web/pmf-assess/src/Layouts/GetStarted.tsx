import { useNavigate } from "react-router";

const GetStarted = () => {
    const navigate = useNavigate();

    // Helper function to handle role selection
    const selectRole = (role) => {
        localStorage.setItem("role", role);
        navigate("/");
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="w-[40vw] h-[40vh] bg-slate-300 flex flex-col items-center p-5">
                <h1 className="text-xl font-medium">Choose your role!</h1>
                <div className="h-[80%] flex flex-col justify-around items-center">
                    <div className="bg-black rounded px-2 py-1 cursor-pointer" onClick={() => selectRole("dev")}>
                        <h1 className="text-lg text-white">Developer</h1>
                    </div>
                    <div className="bg-black rounded px-2 py-1 cursor-pointer" onClick={() => selectRole("auth")}>
                        <h1 className="text-lg text-white">Author</h1>
                    </div>
                    <div className="bg-black rounded px-2 py-1 cursor-pointer" onClick={() => selectRole("student")}>
                        <h1 className="text-lg text-white">Student</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GetStarted;
