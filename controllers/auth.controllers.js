import { check, validationResult } from 'express-validator';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.model.js';


const saltRounds = 10;


const loginCntlr = async (req, res) => {
    try {
        const { email, password } = req.body;

        await check('email').isEmail().withMessage('El Email es obligatorio').run(req);
        await check('password').notEmpty().withMessage('El password es obligatorio').run(req);

        let result = validationResult(req);

        if(!result.isEmpty()){
            return res.status(400).json({ errorMsg: result.array() });
        };

        const userValid = await User.findOne({email});
        if(!userValid){
            return res.status(401).json({errorMsg: 'Usuario no encontrado'});
        };

        const passValid = bcryptjs.compareSync(password, userValid.password);
        if(passValid){
            const {_id, email, username, rol} = userValid;
            const payload = {_id, email, username, rol};
            const _token = jwt.sign(
                payload,
                process.env.JWT_SECRET,
                {
                    algorithm:"HS256",
                    expiresIn:"1d"
                }
            );
            return res.status(200).json({_token});
        }
        
        return res.status(401).json({errorMsg: 'Usuario o password incorrectos'});

    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ errorMsg: error.message });
          }
        if (error.code === 11000) {
            return res.status(400).json({
              errorMsg: "El usuario con ese correo ya se encuentra registrado",
            });
        }
        
        return res.status(500).json({ errorMsg: error.message });
    }
}


const signupCntlr = async (req, res) => {
    try {
        const {username, email, password, ...restbody} = req.body;

        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){6,30}$/;
        await check('username').notEmpty().withMessage('El campo username es obligatorio').run(req);
        await check('email').isEmail().withMessage('El formato del email es invalido').run(req);
        await check('password').isLength({min:6}).withMessage('La longitud del password debe ser mayor a 6 caracteres').run(req);
        await check('password').matches(regex).withMessage('El password debe contener una mayuscula, una minuscula, un número y un caracter especial "$#@!"').run(req);
        
        let result = validationResult(req);

        if(!result.isEmpty()){
            res.status(400).json({ errorMsg: result.array() });
            return;
        };

        const existUser = await User.findOne({email});
        if(existUser){
            res.status(400).json({errorMsg: 'El usuario ingresado ya existe'});
            return;
        };

        const salt = bcryptjs.genSaltSync(saltRounds);
        const passwordHashed = bcryptjs.hashSync( password, salt);

        const {

            _id,
            username: usernameCreated,
            email: emailCreated

        } = await User.create({
            username,
            email,
            password: passwordHashed
        });

        res.status(201).json({
            user:{
                _id,
                username:usernameCreated,
                email:emailCreated
            }
        })

    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ errorMsg: error.message });
          }
        if (error.code === 11000) {
            return res.status(400).json({
              errorMsg: "El usuario con ese correo ya se encuentra registrado",
            });
        }
        
        return res.status(500).json({ errorMsg: error.message });        
    }
}

const verifyCntlr = (req,res) => {
    return res.status(200).json(req.payload);
};

export {
    loginCntlr,
    signupCntlr,
    verifyCntlr
}

