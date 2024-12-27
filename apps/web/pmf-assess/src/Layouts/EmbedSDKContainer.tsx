import sdk from '@stackblitz/sdk'
import { useEffect, useRef } from 'react';


interface projectAttributes {
    project : {
        id? : string;
        files : {[key:string]:string};
        title : string ;
        description : string;
        template:string,
        dependencies : {[key:string]:string};
        openFile? : string;
        height? : number;
        width? : string;
        initScripts? : string;
    }
}


const EmbedSDKContainer = ({project}:projectAttributes) => {

    console.log("files coming to the sdk",project)
    const embeddedSDKRef = useRef<HTMLDivElement | null >(null);


   const _embedSdk = async () => {

    if(embeddedSDKRef.current){
        console.log("inside the function")
         return sdk.embedProject(embeddedSDKRef.current,
        {
            files : project.files,
            template : project.template,
            title : project.title ?? "temp title",
            description : project.description
        },
        {
            openFile : project?.openFile || 'index.html',
            height : project?.height ?? 600,
            width : project?.width ?? '100%',
            startScript : project?.initScripts,
        }
    );
    }
   }

    useEffect(()=>{
        console.log("project files iin use effect",project)
        _embedSdk();
        
    },[project])
    
    return (
        <>
        <div id='embed-container' ref={embeddedSDKRef}>
        </div>
        </>
    )
}
export default EmbedSDKContainer;