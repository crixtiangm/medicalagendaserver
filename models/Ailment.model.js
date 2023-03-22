import { model, Schema } from 'mongoose';

const ailmentSchema = new Schema(
    {
        stature: {
            type: String,
            required: [true, 'Stature is required']
        },
        blood_pressure: {
            type: String,
            required: [true, 'Pressure is required']
        },
        symptoms: {
            type: String,
            required: [true, 'Symptoms is required']
        },
        treatment:{
            type: String,
            required: [true, 'Treatment is required']
        },
        laboratories: {
            type: String
        },
        _patient: {
            type: Schema.Types.ObjectId,
            ref: 'Patient'
        },
        _doctor: {
            type: Schema.Types.ObjectId,
            ref:'Collaborator'
        }
    },
    {
        timestamps:true
    }
);

const Ailment = model('Ailment', ailmentSchema);

export default Ailment;