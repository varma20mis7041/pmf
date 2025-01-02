import { NavLink, useLocation } from "react-router"
import { MdDashboardCustomize } from "react-icons/md";

import { HiTemplate } from "react-icons/hi";
import { MdAssignment } from "react-icons/md";
import { TbTargetArrow } from "react-icons/tb";
import { MdSettings } from "react-icons/md";


const AuthLayout = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const path = pathSegments[0] || '';
    
    return (
        <div className="min-h-[100vh] w-[20%] bg-slate-200 ">
            <h1 className="mx-5 my-3 text-2xl font-mono font-bold">Neo App</h1>
            <nav className="mx-5">
                <NavLink to="/">
                    <div className="flex items-center my-3">
                        <MdDashboardCustomize />
                        <h1 className={`ml-2 text-md text-zinc-800 ${path === "" ? "font-bold" : "font-medium"} `}>Dashboard</h1>
                    </div>
                </NavLink>
                <NavLink to="/templates">
                    <div className="flex items-center my-3">
                        <HiTemplate />
                        <h1 className={`ml-2 text-md  text-zinc-800 ${path === 'templates' ? "font-bold" : "font-medium"} `}>Templates</h1>
                    </div>
                </NavLink>
                <NavLink to="/assignments">
                    <div className="flex items-center my-3">
                        <MdAssignment />
                        <h1 className={`ml-2 text-md  text-zinc-800 ${path === 'assignments' ? "font-bold":"font-medium"} `}>Assignments</h1>
                    </div>
                </NavLink>
                <NavLink to="/attempts">
                    <div className="flex items-center my-3">
                        <TbTargetArrow />
                        <h1 className={`ml-2 text-md  text-zinc-800 ${path === 'attempts' ? "font-bold" : "font-medium"} `}>Attempts</h1>
                    </div>
                </NavLink>
                <NavLink to="/settings">
                    <div className="flex items-center my-3">
                        <MdSettings />
                        <h1 className={`ml-2 text-md  text-zinc-800 ${path === 'settings' ? "font-bold" : "font-medium"} `}>Settings</h1>
                    </div>
                </NavLink>
            </nav>
        </div>
    )
}

export default AuthLayout;