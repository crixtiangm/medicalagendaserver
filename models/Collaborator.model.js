import { Schema, model } from 'mongoose';

const collaboratorSchema = new Schema({
    name:{
        type: String,
        require: [true, 'Name is required']
    },
    surname:{
        type: String,
        require: [true, 'Surname is required']
    },
    gender:{
        type: String,
        require: [true, 'Gender is required']
    },
    address:{
        type: String 
    },
    phone:{
        type: String,
        required: [true, 'Phone is required']
    },
    _user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
    timestamps: true
});

const Collaborator = model('Collaborator', collaboratorSchema);

export default Collaborator;