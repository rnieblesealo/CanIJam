import { useEffect, useState } from "react"
import axios from "axios"
import ICLoader from "./ic-loader"

interface EventData {
  name: string,
  date: string
}

async function fetchArenaEvents() {
  const { data } = await axios.get("http://localhost:3001/api/arena-events")
  return data
}

function App() {
  const [events, setEvents] = useState<EventData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchArenaEvents()
      .then((res) => {
        setEvents(res)
        setLoading(false)
      })
      .catch((err) => {
        console.log("Error fetching arena events: ", err)
        setError(err)
        setLoading(false)
      })
  }, [])

  let content
  if (loading) {
    content = (
      <div className="flex items-center justify-center h-40">
        <ICLoader />
      </div>
    )
  } else if (error) {
    content = <p className="m-4 text-red-400">Error: {error}</p>
  } else {
    content = (
      <table className="w-full mt-6 text-center text-red-500">
        <thead>
          <tr>
            <th className="p-4">Event</th>
            <th className="p-4">Date</th>
            <th className="p-4">Time</th>
          </tr>
        </thead>

        <tbody className="text-center px-8">
          {events.map((event: EventData, i) => {
            const eventDate = new Date(event.date)
            const darkOrLightRow = i % 2 == 0

            return (
              <tr key={i} className={`h-24 ${darkOrLightRow ? "bg-gray-900" : "bg-black"}`}>
                <td className="w-1/3 p-4">
                  <span className="line-clamp-2">{event.name}</span>
                </td>
                <td className="w-1/3">
                  {eventDate.toLocaleDateString("zh-Hans-CN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </td>
                <td className="w-1/3">
                  {eventDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <img src="/logo.png" className="p-4" />
      <div className="flex flex-col flex-1 my-8">
        <span className="m-4">EVENT LOG</span>
        {content}
      </div>
    </div>
  )
}

export default App
