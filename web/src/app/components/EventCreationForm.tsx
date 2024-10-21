import { Calendar } from "lucide-react"

interface EventCreationFormProps {
  isDateSelected: boolean;
  isModalOpen: boolean;
  onDateTimeChange: () => void;
  onCancel: () => void;
}

export function EventCreationForm({ onCancel, onDateTimeChange, isDateSelected, isModalOpen }: EventCreationFormProps) {
  return (
    <form className='flex flex-col items-center mx-6'>
      <h2 className='text-gray-600 font-bold text-xl md:text-2xl tracking-wide'>Create Event</h2>

      <div className="md:grid md:grid-cols-2 mt-4 flex flex-col gap-6 items-center">
        <input id='name' placeholder="Name..." className='rounded-lg shadow p-3 text-gray-600 placeholder:text-gray-400 outline-none ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />
        <input id='description' placeholder="Short description..." className='rounded-lg shadow p-3 text-gray-600 placeholder:text-gray-400 outline-none ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />
        <input id='location' placeholder="Location..." className='rounded-lg shadow p-3 text-gray-600 placeholder:text-gray-400 outline-none ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />
        <input id='password' type='password' placeholder="Password..." className='rounded-lg shadow p-3 text-gray-600 placeholder:text-gray-400 outline-none ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />
        <input id='capacity' type='number' placeholder="Guest capacity..." className='rounded-lg shadow p-3 text-gray-600 placeholder:text-gray-400 outline-none ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />

        <div>
          <div className={`${!isDateSelected && isModalOpen ? 'visible' : 'invisible'} flex mt-3 gap-2 absolute ml-4 items-center`}>
            <Calendar className='text-gray-400' />
            <label htmlFor="datetime" className="text-gray-400">Select date...</label>
          </div>
          <input onChange={onDateTimeChange} id='datetime' type='datetime-local' className='rounded-lg shadow p-3 text-gray-600 placeholder:text-gray-300 outline-none ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />
        </div>

        <div className="flex gap-3 items-center self-start md:self-auto ml-3">
          <input type='checkbox' id='isPublic' className="outline-none" />
          <label htmlFor="isPublic" className="font-semibold text-gray-500">Public event</label>
        </div>

        <div className="flex gap-2 mt-6 w-full font-semibold">
          <button
            onClick={e => {
              e.preventDefault()
              onCancel();
            }}
            className="rounded-lg py-2 w-full px-3 bg-white border-2 border-indigo-600 text-indigo-600">
            Cancel
          </button>

          <button
            type='submit'
            className="rounded-lg py-2 w-full px-3 bg-indigo-600 text-white">
            Confirm
          </button>
        </div>
      </div>
    </form>
  )
}
