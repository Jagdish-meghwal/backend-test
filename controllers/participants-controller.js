import { Router } from 'express'
import User from '../models/users-model.js';
import Participants from '../models/participants.js';
import Classes from '../models/classes-model.js';


const router= Router();

export const postCreateParticipant = async (req, res) => {
    try{
        let { class_id, student_id } = req.body;
        let participant = await User.findOne({class_id, student_id});
        
        if(participant){
            return res.status(401).send("participant already exist");
        }
        
        participant = new Participants({
            class_id, 
            student_id
        });

        await participant.save();

        return res.status(200).send({msg: "Student added to class"})

    }catch(error){
        console.log(error.message);
        return res.status(500).json({msg: "server error"});
    }
}


export const postFetchAllStudentInClass = async (req, res) => {
    try{
        let { class_id } = req.body;
        let students= await Participants.find({class_id }).fetch();
        
        if(!students){
            return res.status(401).send("Class is empty");
        }
        return res.status(200).send({msg: "Students found", data: students})

    }catch(error){
        console.log(error.message);
        return res.status(500).json({msg: "server error"});
    }
}

export const postDeleteParticipant = async (req, res) => {
    try{
        let { class_id, instructor_id, student_id } = req.body;
        let class_ = await Classes.findOne({_id: class_id, instructor_id });
        
        if(!class_){
            return res.status(401).send("Intructor remove student from his/her class only");
        }
        
        let participant = await Participants.findOne({class_id, student_id});
        
        await Participants.findByIdAndRemove(participant._id);
        
        return res.status(200).send({msg: "Participant deleted"})
    }catch(error){
        console.log(error.message);
        return res.status(500).json({msg: "server error"});
    }
}

export default router;