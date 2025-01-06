import EmbedSDKContainer from "@/Layouts/EmbedSDKContainer";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import ScaleLoader from 'react-spinners/ScaleLoader';

const popupStatus = {
    loading : 'loading',
    success : 'success',
    failure : 'failure'
}

const Test = () => {
    const { id } = useParams<{ id: string }>();
    const [testFiles, updateTestFiles] = useState({});
    const [title, updateTitle] = useState("");
    const [description, updateDescription] = useState("");
    const [difficulty, updateDifficulty] = useState("Easy");
    const [loading, setLoading] = useState(true);


    const [popup, updatePopupStatus] = useState(false);
    const [popupState, updatePopupState] = useState(popupStatus.loading);

    const fetchTestDetails = async () => {
        try {
            const testDetailsResponse = await fetch(`http://localhost:4000/api/assignments/get-assignment/${id}`);
            const result = await testDetailsResponse.json();
            console.log("test results",result)
            const testDetails = result.assignment[0];
            
            updateTitle(testDetails.title);
            updateDescription(testDetails.description);
            updateDifficulty(testDetails.difficulty);
            
            const url = testDetails.bucketUrl;
            const files = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                },
            });
            const filesResult = await files.json();

            const project = {
                id: id,
                title: testDetails.title,
                description: testDetails.description,
                files: filesResult,
                template: testDetails.template
            };

            updateTestFiles(project);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTestDetails();
    }, []);


    const getFiles  = async(files:any) => {

        const testOutputFile = Object.keys((files)).find((eachKey) => eachKey === 'test-output.json');
        if(testOutputFile === undefined){
            alert("please run npm run test command in the terminal and submit ");
            return;
        }
        
        updatePopupStatus(true);
        updatePopupState(popupStatus.loading)


        const testResults = JSON.parse(files[testOutputFile]);
        const totalTestCases =  testResults.numTotalTestSuites;
        const passedTestCases = testResults.numTotalTests;
        //const failedTestCases = testResults.numFailedTests;

        const score = (passedTestCases / totalTestCases) * 100;
        

        const feedback = {
            totalTestSuites: testResults.numTotalTestSuites || 0,
            passedTestSuites: testResults.numPassedTestSuites || 0,
            failedTestSuites: testResults.numFailedTestSuites || 0,
            totalTestCases: testResults.numTotalTests || 0,
            passedTestCases: testResults.numPassedTests || 0,
            failedTestCases: testResults.numFailedTests || 0,
            testCaseDetails: (testResults.testResults || []).map(testResult => ({
              testName: testResult.assertionResults?.[0]?.title || 'Unknown Test',
              status: testResult.assertionResults?.[0]?.status || 'unknown',
              failureMessage: testResult.assertionResults?.[0]?.failureMessages?.[0] || 'No failure message',
              duration: testResult.assertionResults?.[0]?.duration || 'N/A',
              fileName: testResult.name || 'Unknown File',
              startTime: testResult.startTime || 'N/A',
              endTime: testResult.endTime || 'N/A',
            })),
          };
          
          console.log(feedback)

          const attempt = {
            assignmentId : id,
            assignmentName : title,
            level : difficulty,
            userId : 1,
            status : score === 100 ? 'Solved' : 'In Progress',
            score,
            feedback,
            files,
          }
          console.log("attempt",attempt);

          try {
            const postAssignmentAttempt = await fetch('http://localhost:4000/api/attempts/create-attempt', {
              method: 'POST',
              body : JSON.stringify(attempt),
              headers: {
                'Content-type': 'application/json',
              },
            });
          
            const response = await postAssignmentAttempt.json();
            console.log(response);
            updatePopupState(popupStatus.success)
          } catch (error) {
            console.error('Error:', error);
            updatePopupState(popupStatus.failure)
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
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <p>{description}</p>
                    <p>Level: {difficulty}</p>
                    <div key="stackblitz">
                        <EmbedSDKContainer getFiles = {getFiles} project={testFiles} buttonName="Submit Test" />
                    </div>
                </>
            )}
            {popup && (
                <div className="w-screen h-screen fixed top-0 bottom-0 left-0 right-0 bg-[rgb(49,49,49,0.8)]">
                    {popupState === popupStatus.loading && (
                        <div className="flex justify-center items-center h-screen">
                            <ScaleLoader />
                        </div>
                    )}
                    {popupState === popupStatus.success && (
                        <div className="w-screen h-screen flex justify-center items-center">
                            <div className="bg-slate-300 h-[30vh] w-[30vw] p-3 rounded flex flex-col justify-center items-center">
                                <h1 className="text-xl font-medium mb-2">Assignment Submitted Successfully!</h1>
                                <NavLink to="/attempts">
                                        <button className="font-medium py-[2px] rounded text-white bg-black px-2 text-sm cursor-pointer">View Attempts</button>
                                    </NavLink>
                            </div>
                        </div>
                    )}
                    {popupState === popupStatus.failure && (
                        <div className="bg-slate-300 h-[40vh] w-[40vw] p-3 rounded">
                            <div className="flex flex-col items-center justify-center">
                                <h1 className="text-xl font-medium">Error in Submitting Assignment</h1>
                                <button onClick={() => updatePopupStatus(false)} className="font-medium py-[2px] rounded text-white bg-black px-2 text-sm cursor-pointer">Close</button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Test;
