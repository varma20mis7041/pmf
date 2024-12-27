import { templates } from "@/Data/templates";
import EmbedSDKContainer from "@/Layouts/EmbedSDKContainer";
import { useParams } from "react-router";


const TemplateDetailedPage = () => {
    const {id} = useParams<{id:string}>();
    const template = templates.find((eachTemplate) => eachTemplate.id === id );
    console.log("current template",template)
    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold">{template?.title}</h1>
            <p>{template?.description}</p>
            <EmbedSDKContainer project={template} />
        </div>
    )
}

export default TemplateDetailedPage;