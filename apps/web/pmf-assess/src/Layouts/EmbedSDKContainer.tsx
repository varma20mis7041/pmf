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
            template : 'node',
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


    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data.type === 'test-results') {
                console.log('Test results from StackBlitz:', event.data.results);
                // Now you have the results in your React component
                // You can update state, display them, etc.
            }
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage); // Clean up
        };
    }, []);

    
    return (
        <>
        <div id='embed-container' ref={embeddedSDKRef}>
        </div>
        {buttonName !== "" && (
            <div className='flex justify-center'>
                <button onClick={sendFiles} className='mt-2 h-[30px]  rounded text-white font-medium bg-black px-2 text-sm cursor-pointer'>{buttonName}</button>
            </div>
        )}
        </>
    )
}
export default EmbedSDKContainer;