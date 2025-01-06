import EmbedSDKContainer from "@/Layouts/EmbedSDKContainer";
import { useEffect, useState } from "react";
import { useParams } from "react-router";


const lifeCycle = {
    loading : 'Loading',
    success : 'Success',
    failure : 'Failure',
}


const AttemptDetails =  () => {
    const {id} = useParams<{id:string}>();


        const [currentState,updateCurrentState] = useState(lifeCycle.loading);

        const [projectFiles , updateProjectFiles] = useState({});
    
        const [attemptDetails , updateAttemptsDetails] = useState({});

    console.log(id)

    const fetchAssignmentDetails = async() => {
        const response = await fetch(`http://localhost:4000/api/attempts/get-assignment/${id}`,{
            method : 'GET',
            headers : {
                'Content-type' : 'application/json'
            }
        })

        if(response.ok){
            const result = await response.json();
            const attemptDetails = result.attemptDetails[0];
            updateAttemptsDetails(attemptDetails);
            console.log("result",attemptDetails);

            const url = attemptDetails.bucketUrl;
            console.log(url)
            const files = await fetch(url,{
                method:"GET",
                headers:{
                    "Content-type":"application/json"
                },
            });
            const filesResult = await files.json();

            const dependenciesFile = Object.keys(filesResult).find((eachKey) => eachKey === "package.json");

            const project = {
                id : id,
                title : attemptDetails.name,
                description : '',
                files : filesResult,
                template :"node",
                dependencies : dependenciesFile
            };

            updateProjectFiles(project);
            updateCurrentState(lifeCycle.success)
        }else{
            lifeCycle.failure;
        }
    }

    useEffect(()=>{
        fetchAssignmentDetails()
    },[])

    return (
        <div className="p-10">
            <h1 className="text-4xl font-bold mb-10">Attempt</h1>
            {currentState === lifeCycle.loading && (
                <div className="h-[80vh] flex items-center justify-center ">
                     <p className="text-xl font-medium">Loading...</p>
                </div>
            )}
            {currentState === lifeCycle.success && (
                <div className="">
                    <h1 className="text-xl font-medium mb-5">{attemptDetails.assignmentName}</h1>
                    <EmbedSDKContainer project={projectFiles} />
                </div>
            )}
            {currentState === lifeCycle.failure && (
               <div className="h-[80vh] flex items-center justify-center ">
                    <h1>Something went wrong!</h1>
                    <button onClick={fetchAssignmentDetails} className="h-[30px] px-2 rounded text-white font-medium bg-black mt-5 text-sm">Retry</button>
                </div>
            )}
        </div>
    )
}

export default AttemptDetails;