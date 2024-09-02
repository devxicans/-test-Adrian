'use server'
import { createSession, FormState, SignupFormSchema } from "@/lib"
import bcrypt from 'bcrypt';
import { redirect } from "next/navigation";


const developmentEnv = process.env.development || 'https://test-adrian-olive.vercel.app';

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
  const { name, email, password } = validationResult.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const response = await fetch(`${developmentEnv}/api/signup`, {
    method: 'POST',
    body: JSON.stringify({name, email, password: hashedPassword})
  })

  const data = await response.json();

  if (!response.ok) return;

  // 3. Create Session
  await createSession(data._id)
}