'use client'

import { useFormState } from "react-dom"
import { loginUser } from "./actions"
import { Button } from "@/app/components/Button"
import Logo from '@/assets/logo.png'
import Image from 'next/image'

const initialState = {
  message: ''
}

export default function SignIn() {
  const [error, formAction] = useFormState(loginUser, initialState)

  return (
    <div className='bg-white h-full'>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
          <Image
            src={Logo}
            alt='logo'
            className='h-12 w-auto'
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-600">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action={formAction} className="space-y-6">

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <Button text="Sign in" />
            </div>

            <div>
              <p className="text-sm text-center text-gray-600">
                Don't have an account?{' '}
                <a href="/auth/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Sign up
                </a>
              </p>
              <p className="text-sm mt-3 text-red-500">{error?.message}</p>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}
