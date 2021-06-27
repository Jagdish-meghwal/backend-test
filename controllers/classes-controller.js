
import { Router } from 'express'
import User from '../models/users-model.js';
import Classes from '../models/classes-model.js';


const router= Router();

export const postCreateClass = async (req, res) => {
    try{
        let { subject, instructor_id } = req.body;
        let instructor = await User.findOne({_id: instructor_id, role:"INSTRUCTOR"});
        if(!instructor){
            return res.status(400).send({msg:"Not allowed to create class"})
        }
        let class_ = await Classes.findOne({subject, instructor_id});
        if(class_){
            return res.status(401).send("class already exist");
        }
        class_ = new Classes({
            subject, 
            instructor_id
        });
        
        await class_.save();
        console.log(class_);
        
        return res.status(200).send({msg:"Class created"})

    }catch(error){
        console.log(error.message);
        return res.status(500).json({msg:"server error"});
    }
}

export const getFetchClass = async (req, res) => {
    try{
        let class_id = req.params.class_id;
        
        let class_ = await Classes.findOne({_id:class_id });
        if(!class_){
            return res.status(401).send("class not exist");
        }

        console.log(class_);

        return res.status(200).send({msg:"Class found", data:class_})

    }catch(error){
        console.log(error.message);
        return res.status(500).json({msg:"server error"});
    }
}

export const putEditClass = async (req, res) => {
    try{
        let { class_id, instructor_id, subject } = req.body;
        
        let class_ = await Classes.findOne({_id:class_id, instructor_id });
        if(!class_){
            return res.status(401).send("class not exist");
        }

        await Classes.findByIdAndUpdate(class_id, req.body, { new: true });

        return res.status(200).send({msg:"Class Updated"})

    }catch(error){
        console.log(error.message);
        return res.status(500).json({msg:"server error"});
    }
}

export const postDeleteClass = async (req, res) => {
    try{
        let { class_id, instructor_id } = req.body;
        
        let class_ = await Classes.findOne({_id:class_id, instructor_id });

        if(!class_){
            return res.status(401).send("class not exist");
        }

        await Classes.findByIdAndRemove(class_id);

        return res.status(200).send({msg:"Class deleted"})

    }catch(error){
        console.log(error.message);
        return res.status(500).json({msg:"server error"});
    }
}

export const postFetchAllClassesByStudentId = async (req, res) => {
    try{
        let { student_id } = req.body;
        
        let classes = await Classes.find({ student_id }).fetch();

        if(!classes){
            return res.status(401).send("class not exist");
        }

        return res.status(200).send({msg:"Classes found", data:classes})

    }catch(error){
        console.log(error.message);
        return res.status(500).json({msg:"server error"});
    }
}


export default router;