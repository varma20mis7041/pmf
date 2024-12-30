import { templates } from "@/Data/templates"
import { useState } from "react"
import { FaReact } from "react-icons/fa";
import { Link, NavLink } from "react-router"
import { IoLogoJavascript } from "react-icons/io5";
import { FaNode } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";


const themes = {
    'react' :'react',
    'javascript' : 'javascript',
    'node':'node'
}

const Templates = () => {

   // console.log(templates)
    const [displayThemsPopup,setThemsPopup] = useState(false);
    const [selectedTheme,updateSelectedTheme] = useState(null);

    return <div className="p-10">
        <h1 className="text-4xl font-bold mb-10">Templates</h1>
        <div className="flex justify-end my-5">
            
            <button onClick={() => setThemsPopup(true)} className="h-[30px]  rounded text-white font-medium bg-black px-2 text-sm cursor-pointer">Add new Template</button>
            
        </div>
         {templates.map(template => (
            <div id={template.id} className="flex justify-between mb-10 rounded-md">
            <div className="w-[50%] p-10 border border-slate-300 rounded">
                <h1 className="text-xl font-bold">{template.title}</h1>
                <p>{template.description}</p>
                <button className="h-[30px] px-2 rounded text-white font-medium bg-black mt-5 text-sm">
                    <Link to= {`/templates/${template.id}`} >
                    View Template
                    </Link>
                </button>
            </div>
            <div className="w-[50%] bg-slate-200 p-5">
                {Object.keys(template.files).map(eachKey => (
                    <p>{eachKey}</p>
                ))}
            </div>
        </div>
         ))}
         {displayThemsPopup && (
            <div className="w-screen h-screen fixed top-0 bottom-0 left-0 right-0 ">
                <div className="w-screen h-screen fixed top-0 bottom-0 left-0 right-0 bg-[rgb(49,49,49,0.8)]">
                    <div className="flex justify-center items-center h-screen">
                            <div className="bg-slate-300 h-[30vh] w-[30vw] p-3 rounded">
                                <div className="h-[3%] flex justify-end items-center">
                                    <button className="" onClick={()=>{setThemsPopup(false);updateSelectedTheme(null)}}><IoCloseSharp size={20} /></button>
                                </div>
                                <div className="h-[97%] p-7 flex flex-col justify-between items-center ">
                                <h1 className="text-2xl font-bold text-center">Select a theme</h1>
                                <div className="flex w-[100%] items-center justify-between ">
                                    <div onClick={()=>updateSelectedTheme(themes.react)} className={`border border-gray-800 w-[30%] flex flex-col justify-center items-center rounded cursor-pointer ${selectedTheme === themes.react ? 'opacity-100' : 'opacity-40'} `}>
                                        <div><FaReact size="60" /></div>
                                        <p>React</p>
                                    </div>
                                    <div onClick={()=>updateSelectedTheme(themes.javascript)}  className={`border border-gray-800 w-[30%] flex flex-col justify-center items-center rounded cursor-pointer ${selectedTheme === themes.javascript ? 'opacity-100' : 'opacity-40'} `}>
                                        <div><IoLogoJavascript size="60" /></div>
                                        <p>Javascript</p>
                                    </div>
                                    <div onClick={()=>updateSelectedTheme(themes.node)}  className={`border border-gray-800 w-[30%] flex flex-col justify-center items-center rounded cursor-pointer ${selectedTheme === themes.node ? 'opacity-100' : 'opacity-40'} `}>
                                        <div><FaNode size="60" /></div>
                                        <p>Node</p>
                                    </div>
                                </div>
                                <NavLink to={`/templates/create-template/${selectedTheme}`}>
                                <button disabled={selectedTheme === null} className={`h-[30px]  rounded text-white font-medium bg-black px-2 text-sm ${selectedTheme !== null ? 'cursor-pointer opacity-100' : 'cursor-not-allowed opacity-40' } `}>Get Theme</button>
                                </NavLink>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
         )}
    </div>
}

export default Templates