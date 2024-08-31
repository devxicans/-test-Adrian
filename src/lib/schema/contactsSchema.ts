import mongoose, {Schema} from "mongoose";

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name value"]
    },
    email: {
      type: String,
      required: [true, "Please add a email value"]
    },
    message: {
      type: String,
      required: [true, "Please add a message value"]
    },
  }
)

const contact = mongoose.models.contacts || mongoose.model('contacts', contactsSchema);

export default contact;