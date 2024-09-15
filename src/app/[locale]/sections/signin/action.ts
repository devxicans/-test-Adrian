'use server'
import { FormLogin, LoginFormSchema, createSession } from "@/lib";
import connectDB from "@/lib/db/mongoDB";
import user from "@/lib/schema/usersSchema";
import bcrypt from 'bcrypt';

export async function signin(state: FormLogin, formData: FormData) {

  // 1. Validate Fields
  const validationResults = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password')
  })

  if (!validationResults.success) {
    return {
      errors: validationResults.error.flatten().fieldErrors,
    }
  }

  // 2. Create User
  await connectDB()

  const { email, password } = validationResults.data;

  const userExist = await user.findOne({ email });

  if (userExist && (await bcrypt.compare(password, userExist.password))) {
    // 3. Create Session
    await createSession(userExist._id)
  } else {
    return
    {
      errors: 'You should enter a different email'
    }
  }
}