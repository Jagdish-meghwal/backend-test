import mongoose  from "mongoose";

const ClassSchema = mongoose.Schema({
    subject:{
        type:String,
        required:true
    },
    instructor_id:{
        type:String,
        required:true,
    },
},
    {
        timestamps: true
    }
);

const Classes = mongoose.model('Classes', ClassSchema);
export default  Classes; 