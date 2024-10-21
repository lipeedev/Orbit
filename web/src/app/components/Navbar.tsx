"use client"

import Logo from '@/assets/logo.png'
import { AlignRight, X } from "lucide-react"
import { useState, useEffect } from "react"
import Image from 'next/image'
import { logout } from '@/app/actions/logout'

export function Navbar() {
  const options = [
    { label: 'Home', path: '/dashboard' },
    { label: 'Profile', path: '/me' },
  ]

  const [isOpen, setIsOpen] = useState(false)
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const handleScroll = () => {
    if (window.scrollY < lastScrollY) {
      setShowNavbar(true)
    } else {
      setShowNavbar(false)
    }
    setLastScrollY(window.scrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  return (
    <div className={`md:relative fixed w-full transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-40'}`}>
      <div className="md:flex md:items-start md:justify-between p-2 bg-white">
        <div className={`${isOpen ? 'border-b border-indigo-100' : ''} z-30 absolute inset-x-0 md:relative flex justify-between items-center bg-white md:mt-2`}>
          <a href='/dashboard'>
            <Image
              src={Logo}
              alt='logo'
              className='h-12 w-auto'
            />
          </a>

          <span className="md:hidden mx-6 cursor-pointer text-3xl text-gray-600 font-semibold" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <AlignRight />}
          </span>
        </div>

        <ul className={`${isOpen ? 'opacity-100 mt-10 pointer-events-auto' : 'opacity-0 pointer-events-none'} md:px-0 px-6 md:opacity-100 md:flex md:items-center transition-all ease-in-out duration-400 w-full text-gray-600 font-semibold left-0 md:w-auto md:gap-8 md:relative absolute bg-white pt-8 md:pt-0 md:mx-3 rounded-lg pb-20 z-20 md:pointer-events-auto`}>
          {options.map((option) => (
            <li className="mt-4 mx-3 flex md:mb-4 flex-col" key={option.label}>
              <a href={option.path}>{option.label}</a>
              <div className="md:hidden mb-3 mt-1 h-[0.5px] w-[80%] bg-indigo-100" />
            </li>
          ))}

          <button className="w-full md:w-auto mt-8 md:mt-0 bg-indigo-600 text-white px-4 py-2 rounded-md">
            Get Premium
          </button>
          <button onClick={async () => await logout()} className="w-full md:w-auto mt-8 md:mt-0 bg-white text-indigo-600 border-2 border-indigo-600 px-4 py-2 rounded-md">
            Sign out
          </button>
        </ul>
      </div>

    </div>
  )
}

