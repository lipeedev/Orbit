export function DashboardTitle() {
  return (
    <div className="flex md:ml-7 flex-col gap-6 items-center md:items-start">
      <div className="mt-20 flex flex-col items-center justify-center md:items-start gap-0 md:gap-2">
        <h1 className="text-3xl md:text-5xl font-bold text-indigo-600">Invite people &</h1>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-800">Manage your events</h2>
        <p className="text-2xl text-gray-500 mt-1">Let's start the fun!</p>
      </div>

      <div className="font-bold flex flex-col md:flex-row gap-2 items-center">
        <div className="flex gap-2">
          <button className="py-2 px-5 bg-indigo-600 rounded-full">
            <a href="/dashboard#events" className="text-white">Explore events</a>
          </button>

          <button className="py-2 px-5 bg-gray-200 rounded-full">
            <span className="text-gray-600">Get premium</span>
          </button>
        </div>

        <button className="py-2 px-5 bg-gray-200 rounded-full">
          <a href="https://github.com/lipeedev/" className="text-gray-600">GitHub</a>
        </button>
      </div>

    </div>
  )
}
