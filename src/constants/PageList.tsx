interface NavigationPage {
  url: string;
  title: string;
  description: string;
}

export const HOME_NAVIGATION_PAGES: Record<string, NavigationPage> = {
  fileshare: {
    url: "/fileshare",
    title: "Public Fileshare UI",
    description: "Upload and view files via web interface with reactive search and previews"
  },
  api_help: {
    url: "/help",
    title: "Public Fileshare APIs",
    description: "Documentation for the RESTful APIs used to upload and retreive from my public fileshare"
  },
  discord_bot: {
    url: "https://github.com/Ericgi231/DiscordBot_Jarvis_Java/tree/master",
    title: "Discord Bot",
    description: "Allows users to make calls to APIs using human readable syntax"
  },
  nyt_script: {
    url: "https://gist.github.com/Ericgi231/7e20d9faf7ed0f7b6a9860966de6ea73",
    title: "NYT Connections Art Script",
    description: "Tampermonkey script to show the daily New York Times Connections art on the game page"
  },
  mora_jai: {
    url: "/morajai",
    title: "Mora Jai Boxes",
    description: "A reaction of the Mora Jai boxes from the game Blue Prince with custom boxes"
  },
} as const;