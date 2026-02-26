import axios from "axios";

interface ArenaEvent {
  name: string;
  date: string;
}

interface ArenaEventsResult {
  arena_events: ArenaEvent[];
}

export async function fetchArenaEvents(): Promise<ArenaEventsResult> {
  const params = new URLSearchParams({
    keyword: "Addition Financial Arena",
    utm_source: "bing",
    utm_medium: "cpc",
    utm_campaign: "Venues>SS>Combined>Nat>Head Keyword>Exact",
    utm_term: "Addition Financial Arena",
    utm_content:
      "Venues>SS>Combined>Nat>Tier 1>Addition Financial Arena>659>Orlando>FL>EDT>534>Multi-Purpose Venue",
  });

  const { data: html } = await axios.get<string>(
    `https://www.boxofficeticketsales.com/venues/addition-financial-arena?${params}`
  );

  const match = html.match(/var\s+esRequest\s*=\s*({[\s\S]*?});/);
  if (!match) {
    throw new Error("Could not find esRequest in HTML");
  }

  const esRequest = JSON.parse(match[1]);
  const events: any[] = esRequest.data.data;

  const arenaEvents: ArenaEvent[] = events.map((event) => {
    // datetime_local is like "2026-02-18T19:00:00"
    const date = event.datetime_local.replace("T", " ").slice(0, 16);

    return {
      name: event.title,
      date,
    };
  });

  return { arena_events: arenaEvents };
}

fetchArenaEvents()
  .then((result) => console.log(JSON.stringify(result, null, 2)))
  .catch((err) => console.error("Error:", err.message));
