import mongoose from 'mongoose';
const { Schema } = mongoose;

const messageSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref:"User",
    required: true
  }, 
  recieverId: {
    type: Schema.Types.ObjectId,
    ref:"User",
    required: true
  },
  text: String,
  image: String,
}, {
  timestamps:true
});


const Message = mongoose.model("Message", messageSchema)


export default Message