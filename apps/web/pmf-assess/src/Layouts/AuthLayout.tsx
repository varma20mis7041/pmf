import { NavLink } from "react-router"
import { MdDashboardCustomize } from "react-icons/md";

import { HiTemplate } from "react-icons/hi";
import { MdAssignment } from "react-icons/md";
import { TbTargetArrow } from "react-icons/tb";
import { MdSettings } from "react-icons/md";
import { useState } from "react";

const navItems = {
    "dashboard": "DASHBOARD",
    "templates": "TEMPLATES",
    "assignments": "ASSIGNMENTS",
    "attempts": "ATTEMPTS",
    "settings": "SETTINGS"
};

const AuthLayout = () => {
    const [currentTab,updateCurrentTab] = useState(navItems.dashboard)
    console.log(currentTab)
    return (
        <div className="min-h-[100vh] w-[20%] bg-slate-200 ">
            <h1 className="mx-5 my-3 text-2xl font-mono font-bold">Neo App</h1>
            <nav className="mx-5">
                <NavLink to="/">
                    <div className="flex items-center my-2" onClick={()=>updateCurrentTab(navItems.dashboard)}>
                        <MdDashboardCustomize />
                        <h1 className={`ml-2 text-md text-zinc-800 ${currentTab === navItems.dashboard ? "font-bold" : "font-medium"} `}>Dashboard</h1>
                    </div>
                </NavLink>
                <NavLink to="/templates" onClick={()=>updateCurrentTab(navItems.templates)}>
                    <div className="flex items-center my-2">
                        <HiTemplate />
                        <h1 className={`ml-2 text-md  text-zinc-800 ${currentTab === navItems.templates ? "font-bold" : "font-medium"} `}>Templates</h1>
                    </div>
                </NavLink>
                <NavLink to="/assignments" onClick={()=>updateCurrentTab(navItems.assignments)}>
                    <div className="flex items-center my-2">
                        <MdAssignment />
                        <h1 className={`ml-2 text-md  text-zinc-800 ${currentTab === navItems.assignments ? "font-bold":"font-medium"} `}>Assignments</h1>
                    </div>
                </NavLink>
                <NavLink to="/attempts" onClick={()=>updateCurrentTab(navItems.attempts)}>
                    <div className="flex items-center my-2">
                        <TbTargetArrow />
                        <h1 className={`ml-2 text-md  text-zinc-800 ${currentTab === navItems.attempts ? "font-bold" : "font-medium"} `}>Attempts</h1>
                    </div>
                </NavLink>
                <NavLink to="/settings"  onClick={()=>updateCurrentTab(navItems.settings)}>
                    <div className="flex items-center my-2">
                        <MdSettings />
                        <h1 className={`ml-2 text-md  text-zinc-800 ${currentTab === navItems.settings ? "font-bold" : "font-medium"} `}>Settings</h1>
                    </div>
                </NavLink>
            </nav>
        </div>
    )
}

export default AuthLayout;