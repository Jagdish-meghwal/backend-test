import mongoose  from "mongoose";

const ParticipantSchema=mongoose.Schema({
    class_id:{
        type:String,
        required:true
    },
    student_id:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
},
    {
        timestamps: true
    }
);

const Participants = mongoose.model('Participants',ParticipantSchema);
export default  Participants; 