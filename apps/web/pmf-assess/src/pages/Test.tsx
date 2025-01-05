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
                        <EmbedSDKContainer project={testFiles} buttonName="Submit Test" />
                    </div>
                </>
            )}
        </div>
    );
}

export default Test;
