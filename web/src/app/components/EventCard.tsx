'use client'

import { Calendar, CalendarHeartIcon, MailboxIcon, MapPinIcon, UsersIcon } from "lucide-react";
import { Modal } from "./Modal";
import { useState } from "react";

interface EventCardProps {
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  capacity: number
  isInvite?: boolean;
  isPublic?: boolean;
  isOnProfile?: boolean;
  guestsCount: number;
}

export function EventCard({ isOnProfile, guestsCount, location, capacity, isPublic, isInvite, description, date, time, name }: EventCardProps) {
  const [openViewEventDetails, setOpenViewEventDetails] = useState(false);

  return (
    <div className={`${!isPublic ? 'md:grid md:grid-cols-6 md:mx-2' : ''} flex px-6 flex-col rounded-lg bg-gray-100 text-gray-600 py-3`}>
      <div className='flex gap-3 self-start items-center'>
        {
          isInvite && !isPublic
            ? <MailboxIcon className="my-2 bg-white rounded-lg p-2 text-indigo-600" size={48} />
            : <CalendarHeartIcon className="my-2 bg-white rounded-lg p-2 text-indigo-600" size={48} />
        }

        <h1 className="text-xl font-semibold">{name}</h1>
      </div>

      <div className={`${(isPublic && description.length < 38) ? 'md:mb-11' : 'md:mb-4'} mt-2 md:mt-0 flex items-center`}>
        <p className="italic text-lg">{description}</p>
      </div>

      <div className="mt-6 md:mt-0 md:ml-0 ml-0.5 flex text-gray-600 gap-2 items-center">
        <Calendar className="mb-1" />
        <span className="font-semibold">{date} | {time}</span>
      </div>

      <div className="mt-2 md:mt-0 ml-0.5 md:ml-0 flex text-gray-600 gap-2 items-center">
        <UsersIcon className="mb-1" />
        <span className="font-semibold">{guestsCount} / {capacity}</span>
      </div>

      <div className="mt-2 md:mt-0 ml-0.5 md:ml-0 flex text-gray-600 gap-2 items-center">
        <MapPinIcon className="mb-1" />
        <span className="font-semibold">{location}</span>
      </div>

      <div className={`${isPublic ? 'md:mt-6' : 'md:mt-0'} mt-4 flex items-center w-full`}>
        {
          (isInvite && !isOnProfile && isPublic) && (
            <button onClick={() => setOpenViewEventDetails(true)} className='font-semibold w-full text-gray-100 rounded-lg bg-indigo-600 py-2 px-3'>
              Enter on event
            </button>
          )
        }
        {
          (isOnProfile && isInvite) && (
            <button onClick={() => setOpenViewEventDetails(true)} className='font-semibold w-full text-indigo-600 border-2 border-indigo-600 rounded-lg bg-white py-2 px-3'>
              View event
            </button>
          )
        }
        {
          (isOnProfile && !isInvite) && (
            <button className='font-semibold w-full text-indigo-600 border-2 border-indigo-600 rounded-lg bg-white py-2 px-3'>
              Delete event
            </button>
          )
        }

        <Modal
          isOpen={openViewEventDetails}
          onClose={() => setOpenViewEventDetails(false)}
        >
          <div className="flex flex-col items-center justify-center mx-7">
            <h1 className="text-2xl font-semibold">Event Details</h1>
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Calendar className="mb-1" />
                <span className="font-semibold">{date} | {time}</span>
              </div>
              <div className="flex items-center gap-2">
                <UsersIcon className="mb-1" />
                <span className="font-semibold">{guestsCount} / {capacity}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="mb-1" />
                <span className="font-semibold">{location}</span>
              </div>
              <div className="flex items-center gap-2">
                <p className="italic text-lg">{description}</p>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div >
  )
}
