"use server"

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { z } from 'zod';

const userFormSchema = z.object({
  name: z.string().min(6, { message: 'name must have 6 characters at least' }),
  username: z.string().min(6, { message: 'username must have 6 characters at least' }),
  email: z.string().email({ message: 'invalid email' }),
  password: z.string().min(6, { message: 'password must have 6 characters at least' }),
  confirmPassword: z.string().min(6)
}).refine((data) => data.password === data.confirmPassword, {
  message: 'passwords do not match',
  path: ['confirmPassword']
})

export async function registerUser(_: unknown, formData: FormData) {

  const parsedFormData = userFormSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!parsedFormData.success) {
    return {
      message: parsedFormData.error.errors[0].message
    }
  }

  const { name, username, email, password } = parsedFormData.data

  const response = await fetch(process.env.API_URL + "/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, name, email, password })
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
