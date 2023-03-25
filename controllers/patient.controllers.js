import { check, validationResult } from "express-validator";
import Patient from "../models/Patient.model.js";
import mongoose from "mongoose";

const registerPatientCntlr = async (req, res) => {
    try {
        const { name, surname, gender, address, phone, ...restPatient} = req.body;

        await check('name').notEmpty().withMessage('El campo nombre es obligatorio').run(req);
        await check('surname').notEmpty().withMessage('El camo de apellido es obligatorio').run(req);
        await check('gender').notEmpty().withMessage('El campo de genero es obligatorio').run(req);

        let result = validationResult(req);
        if(!result.isEmpty()){
            return res.status(400).json({errorMsg: result.array()});
        }
    
        const patientValidator = await Patient.findOne({name});
        if(patientValidator){
            return res.status(400).json({errorMsg: 'El paciente ya esta registrado'});
        } 

        const patient = await Patient.create({name, surname, gender, address, phone});

        return res.status(200).json(patient);

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

const updatePatientCntlr = async (req, res) => {
    try {
        const { patientId } = req.params;
        if(!mongoose.Types.ObjectId.isValid(patientId)){
            return res.status(400).json({errorMsg: 'ID invalido'})
        };

        await check('name').notEmpty().withMessage('El campo nombre es obligatorio').run(req);
        await check('surname').notEmpty().withMessage('El camo de apellido es obligatorio').run(req);
        await check('gender').notEmpty().withMessage('El campo de genero es obligatorio').run(req);

        let result = validationResult(req);
        if(!result.isEmpty()){
            return res.status(400).json({errorMsg: result.array()});
        }

        const {
            _id,
            name,
            surname,
            gender,
            address,
            phone,
            image_url
        } = await Patient.findByIdAndUpdate(patientId,req.body,{new:true});

        return res.status(200).json({
            _id,
            name,
            surname,
            gender,
            address,
            phone,
            image_url
        });

        
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

const getPatientIdCntlr = async (req, res) => {
    try {
        const { patientId } = req.params;
        if(!mongoose.Types.ObjectId.isValid(patientId)){
            return res.status(400).json({errorMsg: 'ID invalido'})
        };

        const patientDetail = await Patient.findById(patientId);

        return res.status(200).json(patientDetail);
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
}

const listPatientCntlr = async (req, res) => {
    try {
        const listPatient = await Patient.find();
        if(!listPatient){
            return res.status(400).json({errorMsg: 'Algo salio mal al obtener la lista'});
        };
        return res.status(200).json(listPatient);
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
    }
}



export {
    registerPatientCntlr,
    updatePatientCntlr,
    getPatientIdCntlr,
    listPatientCntlr
}