import { useEffect, useState } from "react";
import { NavLink } from "react-router";

const lifeCycle = {
    loading : 'Loading',
    success : 'Success',
    failure : 'Failure',
}

const Attempts = () => {

    const [currentState,updateCurrentState] = useState(lifeCycle.loading);

    const [attempts , updateAttempts] = useState([]);

    const fetchAttempts = async() => {
        const response = await fetch('http://localhost:4000/api/attempts/get-attempts',{
            method : 'GET',
            headers : {
                'Content-type' : 'application/json'
            }
        })

        if(response.ok){
            const result = await response.json();
            updateAttempts(result.attempts)
            updateCurrentState(lifeCycle.success)
            console.log("response",result)
        }else{
            updateCurrentState(lifeCycle.failure)
        }

       
    }

    useEffect(()=>{
        fetchAttempts();
    },[])
    return (
        <div className="p-10">
            <h1 className="text-4xl font-bold mb-10">Attempts</h1>
            {currentState === lifeCycle.loading && (
                <div className="h-[80vh] flex items-center justify-center ">
                     <p className="text-xl font-medium">Loading...</p>
                </div>
            )}
            {currentState === lifeCycle.success && (
                <div className="h-[80vh]">
                    {attempts.length === 0 ? (
                        <div className="h-full w-full flex justify-center items-center">
                            <h1>No Attempts Found</h1>
                        </div>
                    ):(
                        <>
                        <div className="w-full bg-slate-300 rounded mb-3 p-2">
                            <div className="grid grid-cols-5">
                                <p className="font-bold flex justify-center items-center">Name</p>
                                <p className="font-bold flex justify-center items-center">Level</p>
                                <p className="font-bold flex justify-center items-center">Status</p>
                                <p className="font-bold flex justify-center items-center">Score</p>
                                <p className="font-bold flex justify-center items-center">View</p>
                            </div>
                        </div>
                        {attempts.map((eachAttempt)=> (
                            <div key={eachAttempt.id || index} className="w-full bg-slate-100 rounded mb-3 p-2">
                            <div className="grid grid-cols-5">
                            <div className="flex justify-center items-center">
                                <p className="font-medium">{eachAttempt.name}</p>
                            </div>
                            <div className="flex justify-center items-center">
                                <p className="font-medium">{eachAttempt.level}</p> {/* Assuming `template` is a field */}
                            </div>
                            <div className="flex justify-center items-center">
                                <p className={`font-medium   px-2 rounded  `}>{eachAttempt.status}</p> 
                            </div>
                            <div className="flex justify-center items-center ">
                                <p className={`font-medium  px-2 rounded `}>{eachAttempt.score}</p> 
                            </div>
                            <NavLink to={`/attempts/${eachAttempt.id}`}>
                            <div className="flex justify-center items-center ">
                                <p className={`font-medium   px-2 rounded `}>view</p> 
                            </div>
                            </NavLink>
                           </div>
            
                        </div>
                        ))}
                        </>
                    )}
                </div>
            )}
        </div>
    )
}

export default Attempts;