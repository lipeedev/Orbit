import { SearchIcon } from "lucide-react";
import { Carousel } from "@/app/components/Carousel";
import { DashboardTitle } from "@/app/components/DashboardTitle";
import { TopHostDetails } from "@/app/components/TopHostDetails";
import { EventCard } from "@/app/components/EventCard";
import { cookies } from "next/headers";
import { EventFomRequest } from '@/app/types/Event'
import { Modal } from "@/app/components/Modal";

export default async function Dashboard() {
  const hosts = [
    { name: "John Doe", stars: 155, username: "john_doe" },
    { name: "Michael Scotfield", stars: 85, username: "scotfield", avatar: 'https://github.com/lipeedev.png' },
    { name: "Logan", stars: 230, username: "wolv223_" },
    { name: "Marth Flowers", stars: 100, username: "marth67" },
    { name: "Georgia Smith", stars: 300, username: "m_georg14" },
    { name: "Patrick F", stars: 109, username: "p_slayer" },
  ]

  let events: EventFomRequest[] | undefined

  /*const token = cookies().get('orbit.token')?.value
   const eventsResponse = await fetch(process.env.API_URL + '/events', {
     headers: { 'Authorization': `Bearer ${token}` }
   })
 
   if (eventsResponse.ok) {
     events = await eventsResponse.json() as EventFomRequest[]
   }*/

  events = [
    {
      name: 'Wedding Party',
      description: 'This is a wedding party',
      location: 'Lagos, Nigeria',
      date: '2021-12-12',
      time: '12:00',
      capacity: 100,
      is_public: true,
      guests: [],
      owner: { uername: 'Jhon Doe' }
    },
    {
      name: 'Birthday Party',
      description: 'This is a birthday party',
      location: 'Lagos, Nigeria',
      date: '2021-12-12',
      time: '12:00',
      capacity: 100,
      is_public: true,
      guests: [
        { username: 'hsjs' }
      ],
      owner: { uername: 'Jhon Doe' }
    },
    {
      name: 'Birthday Party',
      description: 'This is a birthday party',
      location: 'Lagos, Nigeria',
      date: '2021-12-12',
      time: '12:00',
      capacity: 100,
      is_public: true,
      guests: [],
      owner: { uername: 'Jhon Doe' }
    },
    {
      name: 'Birthday Party',
      description: 'This is a birthday party',
      location: 'Lagos, Nigeria',
      date: '2021-12-12',
      time: '12:00',
      capacity: 100,
      is_public: true,
      guests: [],
      owner: { uername: 'Jhon Doe' }
    },
    {
      name: 'Birthday Party',
      description: 'This is a birthday party',
      location: 'Lagos, Nigeria',
      date: '2021-12-12',
      time: '12:00',
      capacity: 100,
      is_public: true,
      guests: [],
      owner: { uername: 'Jhon Doe' }
    }
  ]

  return (
    <div className="flex flex-col h-screen w-full">

      <div className="flex flex-col md:flex-row md:justify-arround md:items-center">
        <DashboardTitle />
        <Carousel>
          {
            hosts.map((host, index) => (
              <TopHostDetails
                key={index}
                name={host.name}
                username={host.username}
                avatar={host.avatar}
              />
            ))
          }
        </Carousel>
      </div>

      <div className="mx-9 md:mt-40 mt-28 flex items-center md:ml-[360px]">
        <SearchIcon className="m-2 absolute justify-self-start text-gray-500" />
        <input
          placeholder="Search events..."
          className="text-gray-500 pl-10 md:pl-auto md:px-9 placeholder:text-gray-500/90 w-full md:w-auto rounded-xl border-none shadow-gray-200 shadow-lg p-4 focus:border-none focus:ring-gray-200/10"
        />
      </div>

      <div id="events" className="flex md:grid md:grid-cols-4 flex-col gap-6 mx-7 my-6 mt-12">
        {
          events?.slice(0, 12).map((event, index) => (
            <EventCard
              key={index}
              description={event.description}
              location={event.location}
              date={event.date}
              time={event.time}
              name={event.name}
              capacity={event.capacity}
              guestsCount={event.guests.length}
              isInvite={true}
              isPublic={event.is_public}
            />
          ))
        }
      </div>
    </div >
  )
}

