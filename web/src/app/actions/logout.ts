'use server'

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function logout() {
  cookies().delete('orbit.token')
  redirect('/auth/signin')
}
