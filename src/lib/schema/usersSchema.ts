import mongoose, {Schema} from "mongoose";

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name value"]
    },
    email: {
      type: String,
      required: [true, "Please add a email value"]
    },
    password: {
      type: String,
      required: [true, "Please add a password value"]
    }
  }
)

const user = mongoose.models.users || mongoose.model('users', usersSchema);

export default user;