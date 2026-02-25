interface EventData {
  name: string,
  date: string
}

function App() {
  const mockData: EventData[] = [
    {
      "name": "UCF Knights Women's Basketball vs. West Virginia Mountaineers",
      "date": "2026-02-25 19:00"
    },
    {
      "name": "Katt Williams",
      "date": "2026-02-27 20:00"
    },
    {
      "name": "UCF Knights vs. Baylor Bears",
      "date": "2026-02-28 20:00"
    },
    {
      "name": "Orlando Valkyries vs. Grand Rapids Rise",
      "date": "2026-03-01 15:00"
    },
    {
      "name": "UCF Knights vs. Oklahoma State Cowboys",
      "date": "2026-03-03 19:00"
    },
    {
      "name": "Orlando Valkyries vs. Columbus Fury",
      "date": "2026-03-05 19:00"
    },
    {
      "name": "Orlando Valkyries vs. Dallas Pulse",
      "date": "2026-03-07 19:00"
    },
    {
      "name": "Orlando Valkyries vs. San Diego Mojo",
      "date": "2026-03-14 19:00"
    },
    {
      "name": "Dancing with the Stars Live",
      "date": "2026-03-26 19:30"
    },
    {
      "name": "Major League Volleyball All-Star Match",
      "date": "2026-03-28 12:00"
    },
    {
      "name": "Orlando Valkyries vs. Omaha Supernovas",
      "date": "2026-04-16 19:00"
    },
    {
      "name": "The R&B Lovers Tour: Keith Sweat, Joe, Dru Hill & Ginuwine",
      "date": "2026-04-17 20:00"
    },
    {
      "name": "Orlando Valkyries vs. San Diego Mojo",
      "date": "2026-04-19 15:00"
    },
    {
      "name": "Orlando Valkyries vs. Indy Ignite",
      "date": "2026-04-23 19:00"
    },
    {
      "name": "Russell Dickerson",
      "date": "2026-04-25 19:00"
    },
    {
      "name": "Orlando Valkyries vs. Atlanta Vibe",
      "date": "2026-05-01 19:00"
    },
    {
      "name": "Yungblud",
      "date": "2026-06-01 20:00"
    },
    {
      "name": "Charlie Puth, Lawrence & Ally Salort",
      "date": "2026-06-06 19:30"
    },
    {
      "name": "Louis Tomlinson",
      "date": "2026-07-23 19:00"
    },
    {
      "name": "Phil Wickham",
      "date": "2026-10-09 19:00"
    },
    {
      "name": "CeCe Winans",
      "date": "2026-10-27 19:00"
    },
    {
      "name": "Cristian Castro",
      "date": "2027-03-12 20:00"
    }
  ]

  return (
    <div>
      {/* top logo stays const */}
      <img src="/logo.png" className="p-4" />

      {/* event log */}
      <div className="my-8">
        <span className="m-4">EVENT LOG</span>

        {/* events table */}
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
              mockData.map((event: EventData, i) => {
                const eventDate = new Date(event.date)

                const darkOrLightRow = i % 2 == 0

                return (
                  <tr className={`h-24 ${darkOrLightRow ? "bg-gray-900" : "bg-black"}`}>
                    {/* event name */}
                    <td className="w-1/3">
                      <span className="line-clamp-2">
                        {event.name}
                      </span>
                    </td>
                    {/* event date */}
                    <td key={i} className="w-1/3">
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

      </div>
    </div >
  )
}

export default App
