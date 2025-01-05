import { NavLink, useLocation, useNavigate } from "react-router"
import { MdDashboardCustomize } from "react-icons/md";

import { HiTemplate } from "react-icons/hi";
import { MdAssignment } from "react-icons/md";
import { TbTargetArrow } from "react-icons/tb";
import { MdSettings } from "react-icons/md";


const AuthLayout = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const path = pathSegments[0] || '';

    const role = localStorage.getItem('role');

    const navigate = useNavigate();

    const onClickLogout = () => {
        localStorage.setItem(role,null);
        navigate('/get-started')
    }
    
    return (
        <div className="flex flex-col justify-between min-h-[100vh] w-[20%] bg-slate-200 ">
            <div className="">
            <h1 className="mx-5 my-3 text-2xl font-mono font-bold">Neo App ({role})</h1>
            <nav className="mx-5">
                <NavLink to="/">
                    <div className="flex items-center my-3">
                        <MdDashboardCustomize />
                        <h1 className={`ml-2 text-md text-zinc-800 ${path === "" ? "font-bold" : "font-medium"} `}>Dashboard</h1>
                    </div>
                </NavLink>
                {role === "dev" && (
                    <NavLink to="/templates">
                    <div className="flex items-center my-3">
                        <HiTemplate />
                        <h1 className={`ml-2 text-md  text-zinc-800 ${path === 'templates' ? "font-bold" : "font-medium"} `}>Templates</h1>
                    </div>
                </NavLink>
                )}
                {(role === "auth" || role === "student" ) && (
                    <NavLink to="/assignments">
                    <div className="flex items-center my-3">
                        <MdAssignment />
                        <h1 className={`ml-2 text-md  text-zinc-800 ${path === 'assignments' ? "font-bold":"font-medium"} `}>Assignments</h1>
                    </div>
                </NavLink>
                )}
                {role === "student" && (
                    <NavLink to="/attempts">
                    <div className="flex items-center my-3">
                        <TbTargetArrow />
                        <h1 className={`ml-2 text-md  text-zinc-800 ${path === 'attempts' ? "font-bold" : "font-medium"} `}>Attempts</h1>
                    </div>
                </NavLink>
                )}
                <NavLink to="/settings">
                    <div className="flex items-center my-3">
                        <MdSettings />
                        <h1 className={`ml-2 text-md  text-zinc-800 ${path === 'settings' ? "font-bold" : "font-medium"} `}>Settings</h1>
                    </div>
                </NavLink>
            </nav>
            
        </div>
        <div className="h-100px flex justify-center items-center mb-5 ">
            <button onClick={onClickLogout} className="bg-black rounded px-2 py-1 cursor-pointer text-white">logout</button>
        </div>
        </div>
    )
}

export default AuthLayout;