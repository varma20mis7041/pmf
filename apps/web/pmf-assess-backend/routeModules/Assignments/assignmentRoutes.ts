import express from 'express'
import db from '../../db';
import {assignments} from '../../db/schema'
import { v4 as uuidv4 } from 'uuid';
import minioClient from '../../utils/minioClient';
import { eq } from 'drizzle-orm';
import { request } from 'minio/dist/esm/internal/request.mjs';

const router = express.Router();


router.post('/create-assignment',async(request:any , response:any) => {
    const {templateId,title,description,difficulty,files,template} = request.body;
    // console.log(JSON.stringify(request.body));

    // const [newAssignment] = db.

    const id = uuidv4();

    const bucketName = 'assignments'
    const objectName = `assignment-${id}.json`
    const content = JSON.stringify(files);

    await minioClient.putObject(bucketName,objectName,content);
    const url = await minioClient.presignedGetObject(bucketName,objectName,7*24*60*60);

    await db.insert(assignments).values({
        title,
        description,
        templateId,
        bucketUrl : url, 
        difficulty,
        template,
        objectId : id
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

router.get('/get-assignment/:id',async(request:any,response:any)=>{
    const {id} = request.params;

    try{
        const assignmentDetails = await db.select().from(assignments).where(eq(assignments.id,id));
        response.status(200).json({
            assignment : assignmentDetails
        })
    }catch(error){
        response.status(500).json({
            error : error
        })
    }

})

router.post('/update-assignment',async(request:any,response:any) => {
    const {id,title,description,difficulty,files,objectId} = request.body;
    
    const bucketName = 'assignments';
    const objectName = `assignment-${objectId}.json`;
    const content = JSON.stringify(files);

   try{
    await minioClient.putObject(bucketName,objectName,content);

    await db.update(assignments).set({
        title,
        description,
        difficulty,
    }).where(eq(assignments.id,id));

    response.status(200).json({
        msg : "Assignment updated successfully"
    })
   }catch(error){
    response.status(500).json({
        error : error
    })
   }


})

export default router