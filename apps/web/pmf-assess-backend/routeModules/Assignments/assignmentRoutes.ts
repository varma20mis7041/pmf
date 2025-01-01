import express from 'express'
import db from '../../db';
import {assignments} from '../../db/schema'
import { v4 as uuidv4 } from 'uuid';
import minioClient from '../../utils/minioClient';

const router = express.Router();


router.post('/create-assignment',async(request:any , response:any) => {
    const {templateId,title,description,difficulty,files,template} = request.body;
    // console.log(JSON.stringify(request.body));

    // const [newAssignment] = db.

    const bucketName = 'assignments'
    const objectName = `assignment-${uuidv4()}.json`
    const content = JSON.stringify(files);

    await minioClient.putObject(bucketName,objectName,content);
    const url = await minioClient.presignedGetObject(bucketName,objectName,7*24*60*60);

    await db.insert(assignments).values({
        title,
        description,
        templateId,
        bucketUrl : url, 
        difficulty,
        template
    })

    response.status(200).json({
        message : 'Assignment created successfully!'
    })

})

router.get('/get-assignments',async(request:any,response:any)=>{
    try{
        const allAssignments = await db.select().from(assignments);
        response.status(200).json({assignments:allAssignments})
    }catch(error){
        response.status(500).json({error:"Error in fetching all assignments"})
    }

})

export default router