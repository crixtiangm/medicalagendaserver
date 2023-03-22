import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username:{
      type:String,
      require:[true, 'Username is required'],
      lowercase: true,
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    rol:{
      type: String,
      enum:["Admin","Assistant","Doctor"],
      default: 'Assistant'
    },
    status:{
      type: String,
      default: 'Active'
    },
    image_url:{
      type: String,
      default:'https://res.cloudinary.com/dhgfid3ej/image/upload/v1558806705/asdsadsa_iysw1l.jpg'
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

export default User;
