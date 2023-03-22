import { model, Schema } from 'mongoose';


const clinicHistorySchema = new Schema(
    {
        family_history:{
            type:String
        },
        allergic:{
            type:String
        },
        clinical_laboratories: {
            type: String
        },
        birthdate: {
            type:String,
            require: [true, 'Birthdate is required']
        },
        _patient: {
            type: Schema.Types.ObjectId,
            ref: 'Patient'
        }
    },
    {
        timestamps: true
    }
);

const ClinicHistory = model('ClinicHistory', clinicHistorySchema);

export default ClinicHistory;