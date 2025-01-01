import { TemplateThemes } from "@/Data/template-themes";
import { Template } from "@/Data/templates";
import EmbedSDKContainer from "@/Layouts/EmbedSDKContainer";
import { fetchTemplates } from "@/redux/fetchTemplatesSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

const baseThemes:{[key:string]:string} = {
    'react' : 'create-react-app',
    'javascript' : 'javascript',
    'node' : 'node',
    'angular' : 'angular-cli',
    'vue' : 'vue',
    'typescript' : 'typescript',
    'html' : 'html'
}

const CreateTemplate = () => {

    const {id} = useParams<{id:string}>();

    const [title,updateTitle] = useState("");
    const [description,updateDescription] = useState("");
    const selectedThemeFiles = TemplateThemes.find(t => t.id === id)
    //console.log("id",id,TemplateThemes,selectedThemeFiles)
    const project : Template = {
       id:id,
       title : title,
       description : description,
       template : selectedThemeFiles?.template,
       files : selectedThemeFiles?.files,
       dependencies : selectedThemeFiles?.dependencies
    }
    

    console.log("project",project);


    const dispatch = useDispatch();
    
    
    const getFiles = async(files) => {

        {/* {Object.keys(template.files).map(eachKey => (
                    <p>{eachKey}</p>
                ))} */}
        const fileNames = Object.keys(files);
       // console.log("filePaths" , filePaths)
        
        const templateDetails = {
            title,
            description,
            files,
            fileNames,
            template : baseThemes[`${id}`]
        } 

         console.log(templateDetails)
        const options = {
            method : 'POST',
            headers : {
                'Content-type' : 'application/json',
            },
            body : JSON.stringify(templateDetails)
        }
        const resposnse = await fetch("http://localhost:4000/api/templates/create-template",options)
        console.log(resposnse);
        dispatch(fetchTemplates())
    }
   
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
           <EmbedSDKContainer project={project} getFiles = {getFiles} buttonName = "Add Template" />
        </div>
    )
}

export default CreateTemplate;