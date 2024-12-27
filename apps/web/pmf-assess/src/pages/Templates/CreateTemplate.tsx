import { TemplateThemes } from "@/Data/template-themes";
import { Template } from "@/Data/templates";
import EmbedSDKContainer from "@/Layouts/EmbedSDKContainer";
import { useState } from "react";

const baseThemes:{[key:string]:string} = {
    'react' : 'React App',
    'javascript' : 'Javascript',
    'node' : 'Node + Express'
}

const CreateTemplate = () => {

    const [title,updateTitle] = useState("");
    const [description,updateDescription] = useState("");

    const [theme , updateTheme] = useState(null);

    const [project , updateProject] = useState({});

    const [showSdk , updateShowSdkEditor] = useState(false);

    const onClickGetTheme = (e:Event) => {
        e.preventDefault();
        if(title === "" || description === ""){
            alert("please fill the name and description of the template")
        }else{
             const selectedThemeFiles = TemplateThemes.find(t => t.id === theme)
             console.log(theme,TemplateThemes,selectedThemeFiles)
             const project : Template = {
                id:theme,
                title : title,
                description : description,
                template : selectedThemeFiles?.template,
                files : selectedThemeFiles?.files,
                dependencies : selectedThemeFiles?.dependencies
             }
             updateProject(project);
             updateShowSdkEditor(true);
        }
    }
 console.log("current project files",project)
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
                <div className="flex flex-col mb-2">
                    <label className="text-sm text-slate-900 font-semibold ">Theme</label>
                    <select className="border border-black h-[30px]" value={theme} onChange={(e)=>updateTheme(e.target.value)} >
                    {Object.keys(baseThemes).map((eachTheme) => (
                        <option key={eachTheme} value={eachTheme}>
                        {baseThemes[eachTheme]}
                        </option>
                    ))}
                    </select>
                    
                    
                </div>

                <div className="flex justify-center my-5">
                <button onClick={onClickGetTheme} className="h-[30px] px-2 rounded text-white font-medium bg-black mt-5 text-sm">Get Theme</button>
                </div>
            </form>
            {showSdk &&  <EmbedSDKContainer project={project} />}
        </div>
    )
}

export default CreateTemplate;