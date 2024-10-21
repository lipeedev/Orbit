'use client'

import Image from 'next/image'
import { useState } from 'react';
import { EventCard } from '../components/EventCard';
import { StarIcon } from 'lucide-react';

export default function Me() {
  const [optionSelected, setOptionSelected] = useState('events');

  return (
    <div className="flex h-screen flex-col items-center">

      <div className='md:self-start md:ml-6 flex md:flex-row flex-col items-center'>
        <Image
          src="https://github.com/lipeedev.png"
          alt="me"
          width={200}
          height={200}
          className="rounded-full md:h-44 md:w-44 h-40 w-40 mt-20 border-indigo-500 border-4"
        />

        <div className='flex flex-col items-center md:mt-20 md:ml-5'>
          <h1 className='tracking-wide text-3xl text-gray-600 font-semibold mt-6'>Filipe Souza</h1>
          <h3 className='tracking-wide text-xl text-gray-400 italic'>@lipeedev</h3>

          <div className='flex gap-6 mt-5 text-center'>
            <div>
              <p className='text-gray-500'>Invites</p>
              <p className='text-gray-600 font-semibold'>10</p>
            </div>

            <div className='w-0.5 bg-gray-600 h-full md:h-auto' />

            <div>
              <p className='text-gray-500'>Events</p>
              <p className='text-gray-600 font-semibold'>10</p>
            </div>
          </div>
        </div>

        <button className='mt-5 md:ml-3 md:mt-48 bg-indigo-500 text-white font-semibold py-3 px-5 rounded-md hover:bg-indigo-600'>
          <StarIcon />
        </button>

      </div>

      <div className='px-2 mt-12 flex text-center md:border-b-2 md:border-gray-300 w-full md:gap-8 md:text-lg'>
        <button onClick={() => setOptionSelected('events')} className={`${optionSelected === 'events' ? 'text-indigo-600 border-indigo-300' : 'border-gray-300 text-gray-300'} md:border-none border-b-2  font-semibold md:w-auto w-full transition-colors duration-300`}>Events</button>
        <button onClick={() => setOptionSelected('invites')} className={`${optionSelected === 'invites' ? 'text-indigo-600 border-indigo-300' : 'border-gray-300 text-gray-300'} md:border-none border-b-2 font-semibold md:w-auto w-full transition-colors duration-300`}>Invites</button>
      </div>


      <div className='md:w-full mt-5'>
        {
          optionSelected === 'events'
            ? (<EventCard
              date='22-02-16'
              name='Event Name'
              location='Casa do Pedro'
              description='This is a description of the event'
              time='10:10'
              capacity={100}
              guestsCount={0}
              isInvite={false}
              isOnProfile={true}
            />)
            :
            (<EventCard
              date='22-02-16'
              name='Event Name'
              location='Espaço Martix'
              description='This is a description of the event'
              time='10:10'
              capacity={150}
              guestsCount={0}
              isInvite={true}
              isOnProfile={true}
            />)

        }
      </div>


    </div>
  )
}
