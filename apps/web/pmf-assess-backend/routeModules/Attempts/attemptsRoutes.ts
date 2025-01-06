import express from 'express' 
import db from '../../db';
import { templates } from '../../db/schema';
import minioClient from '../../utils/minioClient';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

import {assignmentAttempts} from '../../db/schema'


const router = express.Router();


router.post('/create-attempt',async(req,res)=>{
    console.log("injected")
    const {assignmentId,assignmentName,level,userId,status,score,feedback,files} = req.body;
    console.log(req.body)
   // console.log("files",files);

    const id = uuidv4();

   try{
        const bucketName = 'attempts'
        const objectName = `attempt-${id}.json`
        const content = JSON.stringify(files);
        
        await minioClient.putObject(bucketName,objectName,content);
        console.log("hi")
        const url = await minioClient.presignedGetObject(bucketName,objectName,7*24*60*60)
        console.log("url")
        await db.insert(assignmentAttempts).values({
            assignmentId,
            assignmentName,
            level,
            userId,
            status,
            score,
            feedback,
            bucketUrl : url,
            objectId : id,
            updatedAt : new Date()
        })

        console.log("injected")
        res.status(200).json({
            msg : "Attempt created successfully"
        })
   }catch(errorMsg){
    //console.log(error)
    res.status(500).json({
        error : errorMsg
    })
   }

})

router.get('/get-attempts',async(req,res)=>{
    
    try{
        const attempts = await db.select({
            id:assignmentAttempts.id,
            name : assignmentAttempts.assignmentName,
            level : assignmentAttempts.level,
            status : assignmentAttempts.status,
            score : assignmentAttempts.score
        }).from(assignmentAttempts);
        res.status(200).json({
            attempts
        })
    }catch(error){
        res.status(500).json({
            err : error
        })
    }

})

router.get('/get-assignment/:id',async(request , response) => {

    const {id} = request.params;

    console.log(id)

   try{
    const attemptDetails = await db.select().from(assignmentAttempts).where(eq(assignmentAttempts.id,id))
    response.status(200).json({
        attemptDetails
    })
   }catch(error){
    response.status(500).json({
        errMsg : error
    })
   }
})

export default router