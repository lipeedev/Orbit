"use server"

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { z } from 'zod';

const userFormSchema = z.object({
  email: z.string().email({ message: 'invalid email' }),
  password: z.string().min(1, { message: 'invalid fields' }),
})

export async function loginUser(_: unknown, formData: FormData) {

  const parsedFormData = userFormSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!parsedFormData.success) {
    return {
      message: parsedFormData.error.errors[0].message
    }
  }

  const { email, password } = parsedFormData.data

  const response = await fetch(process.env.API_URL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  }).then(data => data.json())

  if (response.error) {
    return {
      message: response.error
    }
  }

  if (response.token) {
    cookies().set('orbit.token', response.token, {
      maxAge: 60 * 60 * 1, // 1 hour,
      httpOnly: true,
      path: '/',
      sameSite: 'strict'
    })

    redirect('/dashboard')

  }
}
