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


const EmbedSDKContainer = (props) => {

    const {project}:projectAttributes = props;

    const {getFiles,buttonName} = props;

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

   const sendFiles = async() => {
    const iframe = document.getElementById('embed-container');
    const vm = await sdk.connect(iframe);
    const files:any = await vm.getFsSnapshot();
    getFiles(files)
    
   }

    useEffect(()=>{
        console.log("project files iin use effect",project)
        _embedSdk();
        
    },[project]) 

    
    return (
        <>
        <div id='embed-container' ref={embeddedSDKRef}>
        </div>
        <div className='flex justify-center'>
            <button onClick={sendFiles} className='mt-2 h-[30px]  rounded text-white font-medium bg-black px-2 text-sm cursor-pointer'>{buttonName}</button>
        </div>
        </>
    )
}
export default EmbedSDKContainer;