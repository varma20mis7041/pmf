import { TemplateThemes } from "@/Data/template-themes";
import { Template } from "@/Data/templates";
import EmbedSDKContainer from "@/Layouts/EmbedSDKContainer";
import { useState } from "react";
import { useParams } from "react-router";

const baseThemes:{[key:string]:string} = {
    'react' : 'React App',
    'javascript' : 'Javascript',
    'node' : 'Node + Express'
}

const CreateTemplate = () => {

    const {id} = useParams<{id:string}>();

    const [title,updateTitle] = useState("");
    const [description,updateDescription] = useState("");
    const selectedThemeFiles = TemplateThemes.find(t => t.id === id)
    console.log("id",id,TemplateThemes,selectedThemeFiles)
    const project : Template = {
       id:id,
       title : title,
       description : description,
       template : selectedThemeFiles?.template,
       files : selectedThemeFiles?.files,
       dependencies : selectedThemeFiles?.dependencies
    }
    

    console.log("project",project) 

    
    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold font-mono mb-5">Crete new template</h1>
            <form>
                <div className="flex flex-col mb-2">
                    <label className="text-sm text-slate-900 font-semibold">Template Name</label>
                    <input type="text" value={title} onChange={(e) => updateTitle(e.target.value)} className="border border-black rounded h-[30px] px-1 " />
                </div>
                <div className="flex flex-col mb-2">
                    <label className="text-sm text-slate-900 font-semibold ">Template Description</label>
                    <textarea value={description} onChange={(e)=>updateDescription(e.target.value)} className="border border-black rounded px-1" rows = "4" ></textarea> 
                </div>
            </form>
           <EmbedSDKContainer project={project} />
        </div>
    )
}

export default CreateTemplate;