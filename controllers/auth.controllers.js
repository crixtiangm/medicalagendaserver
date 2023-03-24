import { check, validationResult } from 'express-validator';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.model.js';



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
        
        return res.status(401).json({errorMsg: [{msg:'Usuario o password incorrectos'}]});

    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ errorMsg: error.message });
          }
        if (error.code === 11000) {
            return res.status(400).json({ errorMsg: error.message });
        }
        return res.status(500).json({ errorMsg: error.message });
    }
}

const verifyCntlr = (req,res) => {
    return res.status(200).json(req.payload);
};

export {
    loginCntlr,
    verifyCntlr
}

