import { model, Schema } from 'mongoose';


const patientSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        surname: {
            type: String,
            required: [true, 'Surname is required']
        },
        gender: {
            type: String,
            required: [true, 'Gender is required']
        },
        address: {
            type: String
        },
        phone: {
            type: String
        },
        image_url: {
            type: String,
            default:'https://res.cloudinary.com/dhgfid3ej/image/upload/v1558806705/asdsadsa_iysw1l.jpg'
        }
    },
    {
        timestamps: true
    }
);


const Patient = model('Patient', patientSchema);

export default Patient;


