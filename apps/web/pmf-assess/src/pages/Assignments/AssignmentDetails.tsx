import EmbedSDKContainer from "@/Layouts/EmbedSDKContainer";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ScaleLoader from 'react-spinners/ScaleLoader';

const AssignmentDetails = () => {
    const {id} = useParams<{id:string}>();

    const [assignmentFiles , updateAssignmentFiles] = useState({});
    const [title, updateTitle] = useState("");
    const [description, updateDescription] = useState("");
    const [difficulty, updateDifficulty] = useState("Easy");
    const [assignmentDetails, updateAssignmentDetails] = useState({})
    const [viewMode, updateViewMode] = useState(true);
    const [loading, setLoading] = useState(true);
    const [popup, updatePopupStatus] = useState(false);
    const [popupState , updatePopupState] = useState('loading');
    const popupStatus = {
        loading : 'loading',
        success : 'success',
        failure : 'failure'
    }

    const fetchAssignmentDetails = async() => {
        try {
            const assignmentDetailsResponse = await fetch(`http://localhost:4000/api/assignments/get-assignment/${id}`);
            const result = await assignmentDetailsResponse.json();
            console.log(result)
            const assignmentDetails = result.assignment[0];
            console.log("assignment details",assignmentDetails)
            updateTitle(assignmentDetails.title);
            updateDescription(assignmentDetails.description);
            updateDifficulty(assignmentDetails.difficulty);
            updateAssignmentDetails(assignmentDetails);
            const url = assignmentDetails.bucketUrl;
            const files = await fetch(url,{
                method:"GET",
                headers:{
                    "Content-type":"application/json"
                },
            });
            const filesResult = await files.json();

            const dependenciesFile = Object.keys(filesResult).find((eachKey) => eachKey === "package.json");
            console.log("files of assignment",filesResult)
            const project = {
                id : id,
                title : assignmentDetails.name,
                description : assignmentDetails.description,
                files : filesResult,
                template : assignmentDetails.template,
                dependencies : dependenciesFile
            };

            updateAssignmentFiles(project);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchAssignmentDetails();
    },[]);

    const getFiles = async(files:any) => {
        updatePopupStatus(true);
        updatePopupState(popupStatus.loading);
        //const fileNames = Object.keys(files);
        const updatedAssignment = {
            id,
            title,
            description,
            difficulty,
            files,
            template:assignmentDetails.template,
            objectId : assignmentDetails.objectId 
        };

        try{
            const postUpdateAssignment = await fetch('http://localhost:4000/api/assignments/update-assignment',{
                method:"POST",
                body : JSON.stringify(updatedAssignment),
                headers : {
                    'Content-type' : 'application/json'
                }
            });
            if (postUpdateAssignment.ok) {
                updatePopupState(popupStatus.success);
            } else {
                updatePopupState(popupStatus.failure);
            }
        }catch(error){
            console.log(error);
            updatePopupState(popupStatus.failure);
        }
    }

    return (
        <div className="p-5">
            {loading ? (
                <div className="h-[70vh] flex justify-center items-center">
                    <ScaleLoader />
                </div>
            ) : (
                <>
                    <div className="flex justify-end items-center">
                        <button onClick={()=>updateViewMode(!viewMode)} className="h-[30px] px-2 rounded text-white font-medium bg-black mt-5 text-sm">{viewMode ? "Edit" : 'View'}</button>
                    </div>
                    {!viewMode ? (
                        <form>
                            <div className="flex flex-col mb-2">
                                <label className="text-sm text-slate-900 font-semibold">Assignment Name</label>
                                <input type="text" value={title} onChange={(e) => updateTitle(e.target.value)} className="border border-black rounded h-[30px] px-1 " />
                            </div>
                            <div className="flex flex-col mb-2">
                                <label className="text-sm text-slate-900 font-semibold ">Assignment Description</label>
                                <textarea value={description} onChange={(e)=>updateDescription(e.target.value)} className="border border-black rounded px-1" rows = "4" ></textarea> 
                            </div>
                            <div className="flex flex-col mb-2">
                                <label className="text-sm text-slate-900 font-semibold ">Difficulty</label>
                                <select className="border border-gray-950" value={difficulty} onChange={(e)=>updateDifficulty(e.target.value)}>
                                    <option value="Easy">Easy</option> 
                                    <option value="Medium">Medium</option>
                                    <option value="Hard">Hard</option>
                                </select>
                            </div>
                        </form>
                    ):(
                        <>
                        <h1 className="text-2xl font-bold">{title}</h1>
                        <p>{description}</p>
                        <p>Level : {assignmentDetails.difficulty}</p>
                        </>
                    )}
                    <div key="stackblitz">
                        <EmbedSDKContainer project={assignmentFiles} getFiles={getFiles} buttonName={`${viewMode ? "":"Update Assignment"}`} />
                    </div>
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
                                                <h1 className="mb-3 text-xl font-medium">Assignment Updated Successfully!</h1>
                                                <button onClick={() => {updateViewMode(true);updatePopupStatus(false)}} className="font-medium py-[2px] rounded text-white bg-black px-2 text-sm cursor-pointer">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {popupState === popupStatus.failure && (
                                    <div className="bg-slate-300 h-[40vh] w-[40vw] p-3 rounded ">
                                        <div className="flex flex-col items-center justify-center">
                                            <h1 className="mb-3 text-xl font-medium">Error in updating assignment</h1>
                                            <button onClick={()=>getFiles(assignmentFiles.files)} className="font-medium py-[2px] rounded text-white bg-black px-2 text-sm cursor-pointer">Retry</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default AssignmentDetails;
