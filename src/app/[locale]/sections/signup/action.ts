'use server'
import { createSession, FormState, SignupFormSchema } from "@/lib"
import bcrypt from 'bcrypt';
import connectDB from "@/lib/db/mongoDB";
import user from "@/lib/schema/usersSchema";

export async function signup(state: FormState, formData: FormData) {

  // 1. Validate Fields
  const validationResult = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    }
  }

  // 2. Create User
  await connectDB();

  const { name, email, password } = validationResult.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const checkIfEmailExist = await user.findOne({email})

  if (checkIfEmailExist) {
    return
      { errors: 'You should enter a different email' }
  }

  const newUser = await user.create({
    name,
    email,
    password : hashedPassword
  })

  // 3. Create Session
  await createSession(newUser._id)
}