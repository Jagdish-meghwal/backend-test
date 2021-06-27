
import { Router } from 'express'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';
import config from 'config'
import User from '../models/users-model.js';


const router = Router();

export const postRegister = async (req, res) => {
    function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    try{
        let {  email, password } = req.body;

        if(!validateEmail(email)){
            return res.status(400).send({msg:"invlalid email"});
        }

        let user = await User.findOne({email});

        if(user){
            return res.status(401).send("user already exist");
        }

        const salt = await bcryptjs.genSalt(10);
        password = await bcryptjs.hash(password,salt);
        
        user = new User(req.body);
        await user.save();
        
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            (err,token) => {
                if(err) throw err;
                res.json({token});
            }
        )
    }catch(error){
        console.log(error.message);
        return res.status(500).json({msg:"server error"});
    }
    res.send(req.body)
}

export const postLogin = async (req, res) => {
    try{
        let { email, password } = req.body;
        let user = await User.findOne({email});
       
        if(!user){
            return res.status(401).send("user not exist");
        }
        const validPassword = await bcryptjs.compare(password,user.password);
        if(validPassword){
            const payload = { 
                user:{
                    id:user.id
                }
            }
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                (err,token) => {
                    if(err) throw err;

                    res.json({token});
                }
            )
        }
        else{
            res.send("wrong password");
        }
    }catch(error){
        console.log(error.message);
        return res.status(500).json({msg:"server error"});
    
    }  
}

export const postUser = async (req, res) =>{
    try{
        const user = await User.findById(req.body.id).select('-password');
        res.json(user);
    }catch(error){
        console.log(error.message);
        return res.status(500).json({msg:"server error"});
    }
}

export default router;