'use client'

interface ButtonProps {
  text: string
}
import { useFormStatus } from "react-dom"

export function Button({ text }: ButtonProps) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className={`${pending ? 'bg-gray-100' : 'bg-indigo-600'} flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
    >
      {pending ? 'Loading...' : text}
    </button >
  )
}
