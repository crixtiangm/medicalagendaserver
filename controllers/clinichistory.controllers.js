import { check, validationResult } from "express-validator";
import ClinicHistory from "../models/ClinicHistory.model.js";
import mongoose from "mongoose";

const registerClinicHistoryCntrl = async (req, res) => {
    try {
        const { family_history, allergic, clinical_laboratories, birthdate, _patient} = req.body;
        
        await check('family_history').notEmpty().withMessage('Si no tiene antecedentes familiares ingrese NA').run(req);
        await check('allergic').notEmpty().withMessage('Si el paciente no es alergico a nada ingrese NA').run(req);
        await check('clinical_laboratories').notEmpty().withMessage('Si no tiene historicos de laboratorios ingrese NA').run(req);
        await check('birthdate').notEmpty().withMessage('La fevcha de naciemiento es obligatoria').run(req);

        let result = validationResult(req);
        if(!result.isEmpty()){
            return res.status(400).json({errorMsg: result.array()});
        };

        const clinichistory = await ClinicHistory.create({family_history, allergic, clinical_laboratories,birthdate,_patient});

        return res.status(200).json(clinichistory);

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


const updateClinicHistoryCntrl = async (req, res) => {
    try {
        const { clinichistoryId } = req.params;
        if(!mongoose.Types.ObjectId.isValid(clinichistoryId)){
            return res.status(400).json({errorMsg: 'ID invalido'})
        };

        await check('family_history').notEmpty().withMessage('Si no tiene antecedentes familiares ingrese NA').run(req);
        await check('allergic').notEmpty().withMessage('Si el paciente no es alergico a nada ingrese NA').run(req);
        await check('clinical_laboratories').notEmpty().withMessage('Si no tiene historicos de laboratorios ingrese NA').run(req);
        await check('birthdate').notEmpty().withMessage('La fevcha de naciemiento es obligatoria').run(req);

        let result = validationResult(req);
        if(!result.isEmpty()){
            return res.status(400).json({errorMsg: result.array()});
        };

        const {
            _id,
            family_history, 
            allergic, 
            clinical_laboratories, 
            birthdate
        } = await ClinicHistory.findByIdAndUpdate(clinichistoryId,req.body,{new:true});

        return res.status(200).json({
            _id,
            family_history, 
            allergic, 
            clinical_laboratories, 
            birthdate
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


const getClinicHistoryCntrl = async (req, res) => {
    try {
        const {clinichistoryId} = req.params;
        if(!mongoose.Types.ObjectId.isValid(clinichistoryId)){
            return res.status(400).json({errorMsg: 'ID invalido'})
        };

        const clinchistoryDetail = await ClinicHistory.findById(clinichistoryId);
        return res.status(200).json(clinchistoryDetail);

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

const getClinicHistoryWithPatientIdCntrl =  async (req, res) => {
    try {
        const { patientId } = req.params;
        if(!mongoose.Types.ObjectId.isValid(patientId)){
            return res.status(400).json({errorMsg: 'ID invalido'})
        };

        const clinchistoryDetail = await ClinicHistory.findOne({_patient:patientId}).populate("_patient", "name surname gender");
        return res.status(200).json(clinchistoryDetail);

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
    registerClinicHistoryCntrl,
    updateClinicHistoryCntrl,
    getClinicHistoryCntrl,
    getClinicHistoryWithPatientIdCntrl
}