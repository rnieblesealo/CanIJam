import { useEffect, useState } from "react"
import axios from "axios"

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

  // fetch arena events on mount
  useEffect(() => {
    fetchArenaEvents()
      .then((res) => {
        console.log(res)

        setEvents(res)
        setLoading(false)
      })
      .catch((err) => {
        console.log("Error fetching arena events: ", err)

        setError(err)
      })
  }, [])

  return (
    <div>
      {/* top logo stays const */}
      <img src="/logo.png" className="p-4" />

      {/* event log */}
      <div className="my-8">
        <span className="m-4">EVENT LOG</span>

        {/* error status */}
        {loading ? <p className="m-4 text-gray-400">Loading...</p> : !error ?
          // events table
          <table className="w-full mt-6 text-center text-red-500">
            <thead>
              <tr>
                <th className="p-4">Event</th>
                <th className="p-4">Date</th>
                <th className="p-4">Time</th>
              </tr>
            </thead>

            <tbody className="text-center px-8">
              {
                events.map((event: EventData, i) => {
                  const eventDate = new Date(event.date)

                  const darkOrLightRow = i % 2 == 0

                  return (
                    <tr key={i} className={`h-24 ${darkOrLightRow ? "bg-gray-900" : "bg-black"}`}>
                      {/* event name */}
                      <td className="w-1/3">
                        <span className="line-clamp-2">
                          {event.name}
                        </span>
                      </td>
                      {/* event date */}
                      <td className="w-1/3">
                        {eventDate.toLocaleDateString("zh-Hans-CN", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })}
                      </td>
                      {/* event time */}
                      <td className="w-1/3">
                        {eventDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          // error message if not loading and error is set
          : <p className="m-4 text-red-400">Error: {error}</p>
        }
      </div>
    </div >
  )
}

export default App
