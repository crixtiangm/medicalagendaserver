import {model, Schema} from 'mongoose';

const scheduledSchema = new Schema(
    {
        patient: {
            type: String,
            required: [true, 'Name is required']
        },
        description: {
            type: String
        },
        label: {
            type: String,
            enum: ['indigo', 'gray', 'green', 'blue', 'red', 'purple'],
            default: 'indigo'
        },
        day: {
            type: Number,
            required: [true, 'Day is required']
        },
        _collaborator: {
            type: Schema.Types.ObjectId,
            ref: 'Collaborator'
        }
    },
    {
        timestamps: true
    }
);


const Scheduled = model('Scheduled', scheduledSchema);

export default Scheduled;