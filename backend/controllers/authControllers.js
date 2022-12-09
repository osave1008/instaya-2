const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const Register = async (req, res) => {

    try{
        const user = await User.findOne({username : req.body.username});
        if(user){
            return res.status(401).json({message : "Usuario Existe en la DB"});
        }
        if (req.body.password){
            if(req.body.password2 === req.body.password)
            {
                const salt = bcrypt.genSaltSync(10);
                const hashedPassword = bcrypt.hashSync(req.body.password, salt);
                const newUser = new User({
                    name : req.body.name,
                    username : req.body.username,
                    email : req.body.email,
                    password : hashedPassword,
                });
                await newUser.save();
                return res.status(201).json({message : "Usuario Registrado Correctamente"});
            }else{
                return res.status(403).json({message : "las contraseñas no son iguales"});    
            }
        }else{
            return res.status(403).json({message : "Ingrese Un password"});
        }
    }catch(e){
        return res.status(500).json({message : e.message});
    }
};

const Login = async (req, res) => {
    try{
        const user = await User.findOne({username : req.body.username});
        if(!user){
            return res.status(404).json({message : "Usuario no existe en la DB"});
        }
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isPasswordCorrect){
            return res.status(400).json({message : "Password Errado"});
        }

        const payload = {
            id : user._id
        }
        const token = jwt.sign(payload, process.env.JWT_KEY,{
            algorithm : "HS256",
            expiresIn : "3m",
        });

        return res
            .cookie("access_token",token,{httpOnly : true})
            .status(200)
            .json({messages : "Token Asignado Correctamente"});

    }catch(e){
        return res.status(500).json({message : e.message});
    }
};

module.exports = {Register, Login};