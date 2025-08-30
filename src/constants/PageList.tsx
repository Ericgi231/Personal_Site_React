interface NavigationPage {
  url: string;
  title: string;
  description: string;
}

export const HOME_NAVIGATION_PAGES: Record<string, NavigationPage> = {
  fileshare: {
    url: "/fileshare",
    title: "Public Fileshare UI",
    description: "Upload and view files with reactive search and previews (public and unmoderated)"
  },
  mora_jai: {
    url: "/morajai",
    title: "Mora Jai Boxes",
    description: "A re-creation of the Mora Jai boxes from the game Blue Prince written in Typescript"
  },
  horses: {
    url: "/animal-race-bets",
    title: "Animal Race Betting Game",
    description: "Watch and bet on horse races with other online players in real-time, made with node.js and websockets"
  },
  api_help: {
    url: "/help",
    title: "Public API Documentation",
    description: "Documentation for the RESTful php APIs used to upload and retreive from my public fileshare"
  },
  discord_bot: {
    url: "https://github.com/Ericgi231/DiscordBot_Jarvis_Java/tree/master",
    title: "Discord Bot",
    description: "Allows users to make calls to APIs using human readable syntax written in Java"
  },
  nyt_script: {
    url: "https://gist.github.com/Ericgi231/7e20d9faf7ed0f7b6a9860966de6ea73",
    title: "NYT Connections Art Script",
    description: "Tampermonkey script to show the daily New York Times Connections art on the game page"
  },
} as const;