import { check, validationResult } from "express-validator";
import Ailment from "../models/Ailment.model.js";
import mongoose from "mongoose";

const registerAilmentCntrl = async (req, res) => {
    try {
        const { 
            stature, 
            blood_pressure, 
            symptoms, 
            treatment, 
            laboratories, 
            _patient, 
            _doctor
        } = req.body;

        await check('stature').notEmpty().withMessage('El campo de estatura es obligatoria').run(req);
        await check('blood_pressure').notEmpty().withMessage('El campo de presión arterial es obligatorio').run(req);
        await check('symptoms').notEmpty().withMessage('El campo de sintomas es obligatorio').run(req);
        await check('treatment').notEmpty().withMessage('El campo de tartamiento es obligatorio').run(req);

        const result = validationResult(req);
        if(!result.isEmpty()){
            return res.status(400).json({errorMsg: result.array()});
        };

        const ailmentRegistered = await Ailment.create({stature, blood_pressure, symptoms, treatment, laboratories, _patient, _doctor});
        return res.status(200).json(ailmentRegistered);

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

const updateAilmentCntrl = async (req, res) => {
    try {
        const { ailmentId } = req.params;
        if(!mongoose.Types.ObjectId.isValid(ailmentId)){
            return res.status(400).json({errorMsg: 'ID invalido'})
        };

        await check('stature').notEmpty().withMessage('El campo de estatura es obligatoria').run(req);
        await check('blood_pressure').notEmpty().withMessage('El campo de presión arterial es obligatorio').run(req);
        await check('symptoms').notEmpty().withMessage('El campo de sintomas es obligatorio').run(req);
        await check('treatment').notEmpty().withMessage('El campo de tartamiento es obligatorio').run(req);

        const result = validationResult(req);
        if(!result.isEmpty()){
            return res.status(400).json({errorMsg: result.array()});
        };

        const ailmentUpdated = await Ailment.findByIdAndUpdate(ailmentId,req.body,{new:true});
        return res.status(200).json(ailmentUpdated);

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

const getAilmentIdCntrl = async (req, res) => {
    try {
        const { ailmentId } = req.params;
        if(!mongoose.Types.ObjectId.isValid(ailmentId)){
            return res.status(400).json({errorMsg: 'ID invalido'})
        };
        
        const ailmentDetail = await Ailment.findById(ailmentId);
        return res.status(200).json(ailmentDetail);

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

const getAilmentWithPatientIdCntlr = async (req, res) => {
    try {
        const { patientId } = req.params;
        if(!mongoose.Types.ObjectId.isValid(patientId)){
            return res.status(400).json({errorMsg: 'ID invalido'})
        };

        const ailmentList = await Ailment.find({_patient:patientId}).populate('_doctor', "name surname");
        return res.status(200).json(ailmentList);
        
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
    registerAilmentCntrl,
    updateAilmentCntrl,
    getAilmentIdCntrl,
    getAilmentWithPatientIdCntlr
}