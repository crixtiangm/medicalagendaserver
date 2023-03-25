import { check, validationResult } from 'express-validator';
import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';
import Collaborator from '../models/Collaborator.model.js';
import User from '../models/User.model.js';

const saltRounds = 10;

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
            return res.status(400).json({ errorMsg: result.array() });
        };

        const existUser = await User.findOne({email});
        if(existUser){
            return res.status(400).json({errorMsg: [{msg:'El usuario ingresado ya existe'}]});
            
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
            password: passwordHashed,
            rol: restbody.rol
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
              errorMsg: error.message,
            });
        }
        
        return res.status(500).json({ errorMsg: error.message });        
    };
};


const registerCntrl = async (req, res) => {
    try {
        const { email, name, surname, gender, address, phone, ...restCoolaborator} = req.body;

        await check('email').isEmail().withMessage('El formato del email es invalido').run(req);
        await check('name').notEmpty().withMessage('El campo de name es obligatorio').run(req);
        await check('surname').notEmpty().withMessage('El campo de surname es obligatorio').run(req);
        await check('address').notEmpty().withMessage('El campo de address es obligatorio').run(req);
        await check('phone').notEmpty().withMessage('El campo de phone es obligatorio').run(req);

        const result = validationResult(req);

        if(!result.isEmpty()){
            return res.status(400).json({errorMsg: result.array()});
        };
        
        const userValid = await User.findOne({email});
        if(!userValid){
            return res.status(400).json({errorMsg: [{msg:'El correo del usuario no existe es necesario registralo primero'}]})
        };

        const existCollaborator = await Collaborator.findOne({_user:userValid._id});
        if(existCollaborator){
            return res.status(400).json({errorMsg: [{msg:`El colaborador asociado al email: ${email} ya fue registrado anteriormente`}]});
        };

        const collaboratorValid = await Collaborator.findOne({name, surname});
        if(collaboratorValid){
            return res.status(400).json({errorMsg: [{msg: `El colaborador ${name + " " + surname} ya esta registrado`}]});
        };

        const {
            _id,
            name:nameCreated, 
            surname:surnameCreated,
            gender: genderCreated,
            address:addressCreated,
            phone: phoneCreated,
            _user
        } = await Collaborator.create(
            {
                name, 
                surname, 
                gender, 
                address, 
                phone, 
                _user:userValid._id
            });

        res.status(201).json({
            collaborator:{
                _id,
                nameCreated,
                surnameCreated,
                genderCreated,
                addressCreated,
                phoneCreated,
                _user
            }
        });

    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ errorMsg: error.message });
          };

        if (error.code === 11000) {
            return res.status(400).json({
              errorMsg: error.message,
            });
        };
        
        return res.status(500).json({ errorMsg: error.message });
    };
};

const getCollaboratorIdCntrl = async (req, res) => {
    try {
        const {userId} = req.params;

        if(!mongoose.Types.ObjectId.isValid(userId)){
            return res.status(400).json({errorMsg: 'Id invalido'});
        };

        const {_id, name, surname, gender, address, phone, _user} = await Collaborator.findOne({_user:userId});
        
        if(!_id) {
            return res.status(400).json({errorMsg: [{msg:'Error al obtener los datos del colaborador valide el Id'}]});
        }

        return res.status(200).json({
            collaborator:{
                _id,
                name,
                surname,
                gender,
                address,
                phone,
                _user
            }
        });

    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ errorMsg: error.message });
          };

        if (error.code === 11000) {
            return res.status(400).json({
              errorMsg: error.message,
            });
        };
        
        return res.status(500).json({ errorMsj: error.message });
    };
};


export {
    signupCntlr,
    registerCntrl,
    getCollaboratorIdCntrl
}