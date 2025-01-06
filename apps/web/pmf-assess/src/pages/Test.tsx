import EmbedSDKContainer from "@/Layouts/EmbedSDKContainer";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ScaleLoader from 'react-spinners/ScaleLoader';

const Test = () => {
    const { id } = useParams<{ id: string }>();
    const [testFiles, updateTestFiles] = useState({});
    const [title, updateTitle] = useState("");
    const [description, updateDescription] = useState("");
    const [difficulty, updateDifficulty] = useState("Easy");
    const [loading, setLoading] = useState(true);

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

        const testResults = JSON.parse(files[testOutputFile]);

        if(testResults === undefined){
            alert("please run npm run test command in the terminal and submit ");
            return;
        }

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
            userId : 1,
            status : score === 100 ? 'Passed' : 'Failed',
            score,
            feedback : JSON.stringify(feedback),
            files : JSON.stringify(files)
          }
          console.log("attempt",attempt);

          try {
            const postAssignmentAttempt = await fetch('http://localhost:4000/api/attempts/create-attempt', {
              method: 'POST',
              headers: {
                'Content-type': 'application/json',
              },
            });
          
            const response = await postAssignmentAttempt.json();
            console.log(response);
          } catch (error) {
            console.error('Error:', error);
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
        </div>
    );
}

export default Test;
