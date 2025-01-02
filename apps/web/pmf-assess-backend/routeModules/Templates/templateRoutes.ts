import express from 'express' 
import db from '../../db';
import { templates } from '../../db/schema';
import minioClient from '../../utils/minioClient';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { request } from 'minio/dist/esm/internal/request.mjs';


const router = express.Router();


router.get("/",async(req,res)=>{
    res.send("api");
    console.log("api");
})

router.get('/get-templates',async(request,response) => {


    try{
        const allTemplates = await db.select().from(templates).orderBy(templates.updatedAt);
        response.status(200).json({
            message:"Templates fetched successfully",
            templates : allTemplates
        })
    }catch(error){
        console.error('Error fetching templates from database:', error);
        response.status(500).json({ error: 'Failed to fetch templates' });
    }

})

router.get("/get-template/:id",async(request,response)=>{

    const {id} = request.params;

   try{
    const templateDetails = await db.select().from(templates).where(eq(id,templates.id));
    response.status(200).json({
        templateDetails : templateDetails
    })
   }catch(error){
    console.log(error)
   }
})

// router.get("get-files/:filePath",async(request,response)=>{
//     const {filePath} = request.params;
//     const file = 
// })

router.post('/create-template',async (request,response)=>{
    const {title , description , files,fileNames,template} =  request.body
    //console.log(request.body)

    const id = uuidv4();

    const bucketName = 'templates';
    const objectName = `template-${id}.json`;
    const content = JSON.stringify(files);
    await minioClient.putObject(bucketName,objectName,content);

    const url = await minioClient.presignedGetObject(bucketName,objectName,7*24*60*60)

    await db.insert(templates).values({
        name:title, 
        description,
        bucketUrl : url,
        template,
        fileNames : JSON.stringify(fileNames),
        objectId : id,
        updatedAt : new Date(),
    })

    response.status(200).json({
        message : "New template created successfully"
    });


})

router.post("/update-template",async(request:any,response:any)=>{
    console.log(request.body);
    const {id,title , description , files,fileNames,template,objectId} =  request.body

    const bucketName = "templates";
    const objectName = `template-${objectId}.json`;
    const content = JSON.stringify(files);

    await minioClient.putObject(bucketName,objectName,content);

    await db.update(templates).set({
        name : title,
        description,
        fileNames : JSON.stringify(fileNames),
        updatedAt : new Date()
    }).where(eq(templates.id,id))

    response.status(200).json({
        message : "New template updated successfully"
    });

})

// router.post("/get-preasigned-url",async (request,response)=>{
//     console.log(request.body)
//     const {bucketName , objectName} = request.body;
//    try{
//     const url = await minioClient.presignedGetObject(bucketName,objectName,24*60*60);
//     response.status(200).json({url})
//    }catch(error){
//     console.log(error)
//     response.status(500).json({
//         error : error
//     })
//    }
// })

export default router;