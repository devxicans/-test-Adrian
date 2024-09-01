'use server'
import { FormLogin, LoginFormSchema, createSession } from "@/lib";
import { redirect } from "next/navigation";

const developmentEnv = process.env.development || 'https://test-adrian-olive.vercel.app';

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
  const { email, password } = validationResults.data;

  const response = await fetch(`${developmentEnv}/api/signin`, {
    method: 'POST',
    body: JSON.stringify({email, password})
  })

  const data = await response.json();

  // 3. Create Session
  await createSession(data._id)

  redirect('/')
}