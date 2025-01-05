import { TemplateThemes } from "@/Data/template-themes";
import { Template } from "@/Data/templates";
import EmbedSDKContainer from "@/Layouts/EmbedSDKContainer";
import { fetchTemplates } from "@/redux/fetchTemplatesSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router";

import ScaleLoader from 'react-spinners/ScaleLoader'

const baseThemes:{[key:string]:string} = {
    'react' : 'create-react-app',
    'javascript' : 'javascript',
    'node' : 'node',
    'angular' : 'angular-cli',
    'vue' : 'vue',
    'typescript' : 'typescript',
    'html' : 'html'
}

const popupStatus = {
    loading : 'loading',
    success : 'success',
    failure : 'failure'
}

const CreateTemplate = () => {

    const {id} = useParams<{id:string}>();

    const [title,updateTitle] = useState("");
    const [description,updateDescription] = useState("");
    const selectedThemeFiles = TemplateThemes.find(t => t.id === id)

    const [popup,updatePopupStatus] = useState(false);
    const [popupState , updatePopupState] = useState(popupStatus.loading)
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
        // updatePopupStatus(true);
        // updatePopupState(popupStatus.loading)

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
        if(resposnse.ok){
            updatePopupState(popupStatus.success)
            dispatch(fetchTemplates());
        }else{
            updatePopupState(popupStatus.failure)
        }
        
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
           {popup && (
            <div className="w-screen h-screen fixed top-0 bottom-0 left-0 right-0 ">
                <div className="w-screen h-screen fixed top-0 bottom-0 left-0 right-0 bg-[rgb(49,49,49,0.8)]">
                    {popupState === popupStatus.loading && (
                        <div className="flex justify-center items-center h-screen">
                        <ScaleLoader />
                    </div>
                    )}
                    {popupState === popupStatus.success && (
                        <div className="w-screen h-screen flex justify-center items-center">
                            <div className="bg-slate-300 h-[30vh] w-[30vw] p-3 rounded flex justify-center items-center ">
                                <div className="flex flex-col items-center justify-center">
                                    <h1 className="mb-3 text-xl font-medium">Template Created Successfully!</h1>
                                    <NavLink to="/templates">
                                        <button className="font-medium py-[2px] rounded text-white bg-black px-2 text-sm cursor-pointer">View Templates</button>
                                    </NavLink>
                                </div>
                        </div>
                        </div>
                    )}
                    {popupState === popupStatus.failure && (
                        <div className="bg-slate-300 h-[40vh] w-[40vw] p-3 rounded ">
                                <div className="flex flex-col items-center justify-center">
                                    <h1 className="mb-3 text-xl font-medium">Error in creating template</h1>
                                    <button onClick={()=>fetchTemplates()} className="font-medium py-[2px] rounded text-white bg-black px-2 text-sm cursor-pointer">Retry</button>
                                </div>
                        </div>
                    )}
                    
                </div>
            </div>
           )}
        </div>
    )
}

export default CreateTemplate;