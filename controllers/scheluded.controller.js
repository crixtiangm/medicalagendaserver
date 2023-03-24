import { check, validationResult } from 'express-validator';
import mongoose from 'mongoose';
import Scheduled from '../models/Scheduled.model.js';
import Collaborator from '../models/Collaborator.model.js';


const agendaCntlr = async (req, res) => {
    try {
        const {patient, description, label, day, id_user} = req.body;

        await check('patient').notEmpty().withMessage('El nombre del paciente es obligatorio').run(req);
        await check('description').notEmpty().withMessage('Es necesario agregar una breve descripción del motivo de visita').run(req);
        await check('label').notEmpty().withMessage('El label es obligatori').run(req);
        
        const result = validationResult(req);
        if(!result){
            return res.status(400).json({errorMsg: result.array()});
        };

        const collaborator = await Collaborator.findOne({_user:id_user});
        if(!collaborator){
            return res.status(400).json({errorMsg: 'No se pudieron obtener los datos del collaborador que agenda'})
        }

        const {
            _id,
            patient:patientCreated,
            description:descriptionCreated,
            label:labelCreated,
            day: dayCreated,
            _collaborator
        } = await Scheduled.create({
                patient,
                description,
                label,
                day,
                _collaborator: collaborator._id
        });

        return res.status(200).json({
            data: {
                _id,
                patientCreated,
                descriptionCreated,
                labelCreated,
                dayCreated,
                _collaborator
            }
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

const listAgendaCntlr = async (req, res) => {
    try {
        const listPatientScheduled = await Scheduled.find();
        if(!listPatientScheduled){
            return res.status(400).json({errorMsg: 'Algo salio mal al obtener la lista'});
        };
        return res.status(200).json(listPatientScheduled);
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

const updatePatientAgendaCntlr =  async (req,res) => {
    try {
        const {eventId} =req.params;
        if(!mongoose.Types.ObjectId.isValid(eventId)){
            return res.status(400).json({errorMsg: 'ID invalido'})
        };

        const {
            _id,
            patient, 
            description, 
            label, 
            day, 
            id_user
        } = await Scheduled.findByIdAndUpdate(eventId,req.body,{new:true});

        return res.status(200).json({
                    _id,
                    patient, 
                    description, 
                    label, 
                    day, 
                    id_user
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

const deletePatientAgendaCntlr = async (req,res) => {
    try {
        const {eventId} =req.params;
        if(!mongoose.Types.ObjectId.isValid(eventId)){
            return res.status(400).json({errorMsg: 'ID invalido'})
        };

        await Scheduled.findByIdAndRemove(eventId);
        return res.status(200).json({messageSuccess:"Evento eliminado"});
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
    agendaCntlr,
    listAgendaCntlr,
    updatePatientAgendaCntlr,
    deletePatientAgendaCntlr
}