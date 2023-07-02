import path from 'path';
import express from 'express';
import multer from 'multer';


const router = express.Router();

// to store images in disk on server
const storage = multer.diskStorage({
    // cb : callback
    destination(request,file,cb){
        cb(null,'uploads/')
    },

    // to describe format of file name
    filename(request,file,cb){
        cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

// for checking file type
const  checkFileType = (file,cb) => {
    const filetypes = /jpg|jpeg|png/
    
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if(extname && mimetype){
        return cb(null,true)
    }else{

        cb('Images only!')
    }
}


const upload = multer({storage})

router.post('/',upload.single('image'),(request,response) => {response.send({message:"Image Uploaded", image:`/${request.file.path}`})})
                            // .fieldname

export default router
