import { User } from "lucide-react";
import Image from 'next/image'

interface TopHostDetailsProps {
  name: string;
  username: string;
  avatar?: string;
}

export function TopHostDetails({ avatar, name, username }: TopHostDetailsProps) {

  return (
    <div className="flex rounded-lg flex-col mx-5 items-center justify-center h-full">
      <p className="mt-2 md:mt-1 bg-indigo-400 py-1 px-8 text-gray-100 rounded-full font-bold">Top Host</p>
      {
        avatar?.length
          ? <Image alt='avatar' width={200} height={200} src={avatar} className="mt-7 h-24 w-24 rounded-full border-2 border-indigo-600" />
          : <User className="mt-7 text-gray-600 h-24 w-24" />

      }

      <h2 className="mt-2 text-gray-600 text-xl font-semibold">{name}</h2>
      <p className="text-gray-500 italic">@{username}</p>

    </div>
  )
}
