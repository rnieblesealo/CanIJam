import axios from "axios";

interface HomeEvent {
  name: string;
  date: string;
}

async function fetchUCFHomeEvents(): Promise<HomeEvent[]> {
  const params = new URLSearchParams({
    "filter[upcoming]": "true",
    "filter[hide_from_all_sports_schedule]": "false",
    sort: "datetime",
    include: "schedule.sport",
    per_page: "50",
    page: "1",
  });

  const { data: response } = await axios.get(
    `https://ucfknights.com/website-api/schedule-events?${params}`
  );

  const homeEvents: HomeEvent[] = response.data
    .filter((event: any) =>
      event.location?.toLowerCase().includes("orlando, fla")
    )
    .map((event: any) => {
      const sport = event.schedule?.sport?.name ?? "";
      const opponent = event.opponent_name ?? "TBA";
      const name = sport ? `${sport}: UCF vs. ${opponent}` : `UCF vs. ${opponent}`;

      // datetime comes as UTC e.g. "2026-02-19T23:00:00.000000Z" — convert to Orlando local time
      const dt = new Date(event.datetime);
      const date = dt.toLocaleString("sv-SE", {
        timeZone: "America/New_York",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }); // "YYYY-MM-DD HH:MM"

      return { name, date };
    });

  return homeEvents;
}

fetchUCFHomeEvents()
  .then((result) => console.log(JSON.stringify(result, null, 2)))
  .catch((err) => console.error("Error fetching UCF home events:", err.message));
