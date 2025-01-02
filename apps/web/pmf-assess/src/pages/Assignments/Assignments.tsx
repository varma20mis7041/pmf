import { fetchTemplates } from "@/redux/fetchTemplatesSlice";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";

const Assignments = () => {
    const [assignments,updateAssignments] = useState([]);
    const [displayChooseTemplate,updateChooseTemplatePopupStatus] = useState(false);
    const [selectedTemplate,updateSelectedTemplate] = useState(null);

    const [loading,updateLoadingStatus] = useState(true);

    const dispatch = useDispatch();

    const templates = useSelector((state:RootState)=> state.templates.templates);
    const error = useSelector((state:RootState)=> state.templates.error)
    const status = useSelector((state:RootState)=> state.templates.status)
    // console.log("state from redux store",templates,error,status)

   
    console.log(templates)

    const navigate = useNavigate();

    const onClickCreateAssignment = () => {
        console.log(selectedTemplate)
        navigate(`new/${selectedTemplate.id}/${selectedTemplate.template}`)
    }
    console.log(selectedTemplate)

    const fetchAllAssignemnts = async() => {

        try{
            const response = await fetch('http://localhost:4000/api/assignments/get-assignments',{
                method:"GET",
                headers : {
                    'Content-type' : 'application/json'
                }
            })
    
            if(response.ok){
                const result = await response.json();
                console.log("all assignments",result);
                updateAssignments(result.assignments)
            }
        }catch(error){
            console.log(error)
        }finally{
            updateLoadingStatus(false)
        }
       
    }

    useEffect(()=>{
        fetchAllAssignemnts();
    },[])

    const getDifficultyColor = (difficulty:string) => {
        switch (difficulty) {
          case 'Easy':
            return 'bg-green-500'
          case 'Medium':
            return 'bg-yellow-500'
          case 'Hard':
            return 'bg-red-500'
          default:
            return 'bg-gray-500'
        }
      }


    return (
        <div className="p-10">
        <h1 className="text-4xl font-bold mb-10">Assignments</h1>
        
        {assignments.length === 0 && (
            <div className="h-[80vh] w-full flex flex-col justify-center items-center">
               {loading ? (
                <p className="text-xl font-medium">Loading...</p>
               ):(
                <>
                    <h1 className="text-xl font-bold mb-2">No Assignments Found!</h1>
                    <button onClick={()=>updateChooseTemplatePopupStatus(true)}  className="h-[30px]  rounded text-white font-medium bg-black px-2 text-sm cursor-pointer">Add new Assignment</button>
                </>
               )}
            </div>
        )}
        {assignments.length > 0 && (
            <div>
            <div className="flex justify-end my-5">
            <button  onClick={()=>updateChooseTemplatePopupStatus(true)}  className="h-[30px] rounded text-white font-medium bg-black px-2 text-sm cursor-pointer">Add new Assignment</button>
        </div>
        <div className="w-full bg-slate-300 rounded mb-3 p-2">
            <div className="grid grid-cols-4">
                <p className="font-bold flex justify-center items-center">Name</p>
                <p className="font-bold flex justify-center items-center">Type</p>
                <p className="font-bold flex justify-center items-center">Level</p>
                <p className="font-bold flex justify-center items-center">Edit</p>
            </div>
        </div>
        {assignments.map((eachAssignment, index) => (
            <div key={eachAssignment.id || index} className="w-full bg-slate-100 rounded mb-3 p-2">
                <div className="grid grid-cols-4">
                <div className="flex justify-center items-center">
                    <p className="font-medium">{eachAssignment.title}</p>
                </div>
                <div className="flex justify-center items-center">
                    <p className="font-medium">{eachAssignment.template}</p> {/* Assuming `template` is a field */}
                </div>
                <div className="flex justify-center items-center ">
                    <p className={`font-medium bg-gray-500  px-2 rounded ${getDifficultyColor(eachAssignment.difficulty)} `}>{eachAssignment.difficulty}</p> {/* Assuming `difficulty` is a field */}
                </div>
                <div className="flex justify-center items-center">
                    <NavLink to={`/assignments/${eachAssignment.id}`}>
                    <button className="font-medium py-[2px] rounded text-white bg-black px-2 text-sm cursor-pointer">Edit</button>
                    </NavLink>
                </div>
            </div>

            </div>
        ))}
            </div>
        )}
       
        
        <div className="overflow-y-auto">
        {displayChooseTemplate && (
                    <div className="w-screen h-screen fixed top-0 bottom-0 left-0 right-0 ">
                        <div className="w-screen h-screen fixed top-0 bottom-0 left-0 right-0 bg-[rgb(49,49,49,0.8)]">
                            <div className="flex justify-center items-center h-screen">
                                    <div className="bg-slate-300  w-[70vw] p-3 rounded overflow-y-auto">
                                        <div className="h-[3%] flex justify-end items-center">
                                            <button className="" onClick={()=>{updateChooseTemplatePopupStatus(false);updateSelectedTemplate(null)}}><IoCloseSharp size={20} /></button>
                                        </div>
                                        <h1 className="text-center text-2xl font-bold mb-3">Choose a Template</h1>
                                        {status === 'loading' || status === 'idle' && (
                                            <div className="h-[100%] flex justify-center items-center">
                                                <h1 className="text-xl">Loading...</h1>
                                            </div>
                                        )}
                                        {status === 'succeeded' && templates.length > 0  && templates.map(template => (
                                            <div onClick={()=>updateSelectedTemplate(template)} id={template.id} className={`flex justify-between mb-10 rounded-md cursor-pointer  ${selectedTemplate?.id === template.id ? 'opacity-100':"opacity-60"} `}>
                                                <div className="w-[50%] p-10 border border-slate-400 rounded">
                                                    <h1 className="text-xl font-bold">{template.name}</h1>
                                                    <p>{template.description}</p>
                                                </div>
                                                <div className="w-[50%] bg-slate-200 p-5">
                                                    {JSON.parse(template.fileNames).map(eachKey => (
                                                        <p>{eachKey}</p>
                                                    ))} 
                                                </div>
                                            </div>
                                            ))}
                                            {status === "failed" && (
                                                        <div className="h-[70vh] flex justify-center items-center">
                                                            <div className="flex flex-col justify-center items-center">
                                                                <h1 className="mb-2 text-xl font-bold">{error}</h1>
                                                                <button onClick={()=>dispatch(fetchTemplates())} className="h-[30px]  rounded text-white font-medium bg-black px-2 text-sm cursor-pointer">Retry</button>
                                                            </div>
                                                        </div>
                                                     )}
                                            <div className="flex justify-center items-center">
                                                <button disabled={selectedTemplate === null} onClick={onClickCreateAssignment}
                                                className={`h-[30px]  rounded text-white font-medium bg-black px-2 text-sm ${selectedTemplate === null ? 'cursor-not-allowed opacity-50':"opacity-100 cursor-pointer"}  `}>
                                                    Create Assignment
                                                </button>
                                            </div>
                                    </div>
                            </div>
                        </div>
                    </div>
        )}
        </div>
    </div>
    )
}

export default Assignments;