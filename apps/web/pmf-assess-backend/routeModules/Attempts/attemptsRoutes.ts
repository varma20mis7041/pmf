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
    const {assignmentId,userId,status,score,feedback,files} = req.body;


    const id = uuidv4();

   try{
    const bucketName = 'attempts'
    const objectName = `attempt-${id}.json`
    const content = JSON.stringify(files);
    await minioClient.putObject(bucketName,objectName,content);

    await db.insert(assignmentAttempts).values({
        assignmentId,
        userId,
        status,
        score,
        feedback,
        objectId : id
    })

    console.log("injected")
    res.status(200).json({
        msg : "Attempt created successfully"
    })
   }catch(error){
    res.status(500).json({
        error : error
    })
   }

})

export default router