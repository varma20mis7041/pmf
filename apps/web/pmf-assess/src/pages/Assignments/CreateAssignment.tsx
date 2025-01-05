import { useEffect, useState } from "react";
import { TemplateThemes } from "@/Data/template-themes";
import { NavLink, useParams } from "react-router";
import { Template } from "@/Data/templates";
import EmbedSDKContainer from "@/Layouts/EmbedSDKContainer";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ScaleLoader from 'react-spinners/ScaleLoader';

const popupStatus = {
    loading : 'loading',
    success : 'success',
    failure : 'failure'
}

const CreateAssignment = () => {
    const {id,template} = useParams<{id:string,template:string}>();
    const selectedTemplateFiles = useSelector((state:RootState)=> state.templates.templates?.filter((eachTemplate)=>(eachTemplate.id == id)))[0];
    const status = useSelector((state:RootState) => state.templates.status);

    const [projectConfig, updateProjectConfig] = useState<Template>();
    const [popup, updatePopupStatus] = useState(false);
    const [popupState, updatePopupState] = useState(popupStatus.loading);

    const fetchTemplateFiles = async() => {
        
        try {
            const url = selectedTemplateFiles.bucketUrl;
            const files = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                },
            });
            const filesResult = await files.json();

            const dependenciesFile = Object.keys(filesResult).find((eachKey) => eachKey === "package.json");

            const project = {
                id : id,
                title : selectedTemplateFiles.name,
                description : selectedTemplateFiles.description,
                files : filesResult,
                template : selectedTemplateFiles.template,
                dependencies : dependenciesFile
            }

            updateProjectConfig(project);
            
        } catch (error) {
         
            console.log(error);
        }
    }

    useEffect(() => {
        fetchTemplateFiles();
    }, []);

    const [title, updateTitle] = useState("");
    const [description, updateDescription] = useState("");
    const [difficulty, updateDifficulty] = useState("Easy");

    const getFiles = async(files) => {
        

        console.log(files);
        if(title === "" || description === "") {
            alert("Please fill title and description fields");
        } else {
            updatePopupStatus(true);
            updatePopupState(popupStatus.loading);
            const assignmentDetails = {
                templateId : id,
                title,
                description,
                difficulty,
                files,
                template
            }
            try {
                const postAssignment = await fetch("http://localhost:4000/api/assignments/create-assignment", {
                    method :"POST",
                    body : JSON.stringify(assignmentDetails),
                    headers : {
                        'Content-type':'application/json'
                    }
                })

                if(postAssignment.ok) {
                    const result = await postAssignment.json();
                    console.log("create assignment end point results", result);
                    updatePopupState(popupStatus.success);
                }else{
                    updatePopupState(popupStatus.failure);
                }
            } catch(error) {
                console.log(error);
                updatePopupState(popupStatus.failure);
            }
        }
    }

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold font-mono mb-5">Create new Assignment</h1>
            <form className="mb-5">
                <div className="flex flex-col mb-2">
                    <label className="text-sm text-slate-900 font-semibold">Assignment Name</label>
                    <input type="text" value={title} onChange={(e) => updateTitle(e.target.value)} className="border border-black rounded h-[30px] px-1 " />
                </div>
                <div className="flex flex-col mb-2">
                    <label className="text-sm text-slate-900 font-semibold ">Assignment Description</label>
                    <textarea value={description} onChange={(e)=>updateDescription(e.target.value)} className="border border-black rounded px-1" rows = "4" ></textarea> 
                </div>
                <div className="flex flex-col mb-2">
                    <label className="text-sm text-slate-900 font-semibold ">Difficulty</label>
                    <select className="border border-gray-950" value={difficulty} onChange={(e)=>updateDifficulty(e.target.value)}>
                        <option value="Easy">Easy</option> 
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>
            </form>
            <EmbedSDKContainer project={projectConfig} getFiles = {getFiles} buttonName = "Create Assignment" />
            {popup && (
                <div className="w-screen h-screen fixed top-0 bottom-0 left-0 right-0 bg-[rgb(49,49,49,0.8)]">
                    {popupState === popupStatus.loading && (
                        <div className="flex justify-center items-center h-screen">
                            <ScaleLoader />
                        </div>
                    )}
                    {popupState === popupStatus.success && (
                        <div className="w-screen h-screen flex justify-center items-center">
                            <div className="bg-slate-300 h-[30vh] w-[30vw] p-3 rounded flex flex-col justify-center items-center">
                                <h1 className="text-xl font-medium mb-2">Assignment Loaded Successfully!</h1>
                                <NavLink to="/assignments">
                                        <button className="font-medium py-[2px] rounded text-white bg-black px-2 text-sm cursor-pointer">View Assignments</button>
                                    </NavLink>
                            </div>
                        </div>
                    )}
                    {popupState === popupStatus.failure && (
                        <div className="bg-slate-300 h-[40vh] w-[40vw] p-3 rounded">
                            <div className="flex flex-col items-center justify-center">
                                <h1 className="text-xl font-medium">Error Loading Assignment</h1>
                                <button onClick={() => updatePopupStatus(false)} className="font-medium py-[2px] rounded text-white bg-black px-2 text-sm cursor-pointer">Close</button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default CreateAssignment;
