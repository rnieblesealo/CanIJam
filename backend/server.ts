import express from "express"
import axios from "axios"

interface ArenaEvent {
  name: string;
  date: string;
}

const app = express()

app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*") // HACK: f***k you cors
  next()
})

app.get("/api/arena-events", async (_, res) => {
  const params = new URLSearchParams({
    keyword: "Addition Financial Arena",
    utm_source: "bing",
    utm_medium: "cpc",
    utm_campaign: "Venues>SS>Combined>Nat>Head Keyword>Exact",
    utm_term: "Addition Financial Arena",
    utm_content:
      "Venues>SS>Combined>Nat>Tier 1>Addition Financial Arena>659>Orlando>FL>EDT>534>Multi-Purpose Venue",
  });

  try {
    // fetch events html
    const { data: html } = await axios.get<string>(
      `https://www.boxofficeticketsales.com/venues/addition-financial-arena?${params}`
    );

    // match for inline response containing data
    const match = html.match(/var\s+esRequest\s*=\s*({[\s\S]*?});/);
    if (!match) {
      res.status(500).json("Failed to find esRequest")
      return
    }

    const esRequest = JSON.parse(match[1])
    const events: any[] = esRequest.data.data;

    // marshal data into our format
    const arenaEvents: ArenaEvent[] = events.map((event) => {
      // datetime_local is like "2026-02-18T19:00:00"
      const date = event.datetime_local.replace("T", " ").slice(0, 16);

      return {
        name: event.title,
        date,
      };
    });

    // send back response
    res.json(arenaEvents)
  } catch (err) {
    res.status(500).json("Internal server error")
  }
})

app.listen(3001)
