import { useEffect, useState } from "react";
import { TemplateThemes } from "@/Data/template-themes";
import { useParams } from "react-router";
import { Template } from "@/Data/templates";
import EmbedSDKContainer from "@/Layouts/EmbedSDKContainer";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";


const CreateAssignment = () => {
    const {id,template} = useParams<{id:string,template:string}>();
    const selectedTemplateFiles = useSelector((state:RootState)=> state.templates.templates?.filter((eachTemplate)=>(eachTemplate.id == id)))[0];
    const status = useSelector((state:RootState) => state.templates.status);
   // console.log("selected files",selectedTemplateFiles)
    const [projectConfig,updateProjectConfig] = useState<Template>();
    

    const fetchTemplateFiles = async() => {
        const url = selectedTemplateFiles.bucketUrl;
        const files = await fetch(url,{
            method:"GET",
            headers:{
                "Content-type":"application/json"
            },
        });
        const filesResult = await files.json();

        const dependenciesFile = Object.keys(filesResult).find((eachKey) => eachKey === "package.json")

        const project = {
            id : id,
            title : selectedTemplateFiles.name,
            description : selectedTemplateFiles.description,
            files : filesResult,
            template : selectedTemplateFiles.template,
            dependencies : dependenciesFile
        }

        updateProjectConfig(project);
    }
    useEffect(()=>{
            fetchTemplateFiles();
    },[])

    const [title,updateTitle] = useState("");
    const [description,updateDescription] = useState("");
    const [difficulty , updateDifficulty] = useState("Easy");
    const getFiles = async(files) => {
            console.log(files)
            if(title === "" || description === ""){
                alert("Please fill title and description fields")
            }else{
                const assignmentDetails = {
                    templateId : id,
                    title,
                    description,
                    difficulty,
                    files,
                    template
                }
                try{
                    const postAssignment = await fetch("http://localhost:4000/api/assignments/create-assignment",{
                        method :"POST",
                        body : JSON.stringify(assignmentDetails),
                        headers : {
                            'Content-type':'application/json'
                        }
                    })
                    

                    if(postAssignment.ok){
                        const result =await postAssignment.json();
                        console.log("create assignment end point results",result)
                    }

                    console.log(postAssignment.ok);
                }catch(error){
                    console.log(error)
                }
            }
    }
    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold font-mono mb-5">Crete new Assignment</h1>
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
            {/* {status === 'loading' || status === 'idle' && (
            <div className="h-[70vh] flex justify-center items-center">
                <h1 className="text-xl text-black ">Loading...</h1>
            </div>
        )} */}
        </div>
    )
}

export default CreateAssignment;