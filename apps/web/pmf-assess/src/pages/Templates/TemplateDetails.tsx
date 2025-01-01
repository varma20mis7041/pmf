import EmbedSDKContainer from "@/Layouts/EmbedSDKContainer";
import { useEffect, useState } from "react";
import { useParams } from "react-router";


const TemplateDetailedPage = () => {
    const {id} = useParams<{id:string}>();

    const [projectFiles , updateProjectFiles] = useState({})

    const fetchTemplateDetails = async() => {
        const templateDetailsResponse = await fetch(`http://localhost:4000/api/templates/get-template/${id}`);
        const result = await templateDetailsResponse.json();
        const templateDetails = result.templateDetails[0];
        const url = result.templateDetails[0].bucketUrl;
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
            title : templateDetails.name,
            description : templateDetails.description,
            files : filesResult,
            template : templateDetails.template,
            dependencies : dependenciesFile
        }

        updateProjectFiles(project);

    }

    useEffect(()=>{
        fetchTemplateDetails()
    },[])
   // console.log(template);j

    const getFiles = (files:any) => {
        console.log(files)
    }

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold">{projectFiles?.title}</h1>
            <p>{projectFiles?.description}</p>
             <EmbedSDKContainer project={projectFiles} getFiles = {getFiles} buttonName = "Save Template" /> 
        </div>
    )
}

export default TemplateDetailedPage;