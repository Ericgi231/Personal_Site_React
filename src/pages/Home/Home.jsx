import { 
  HomeContainer, 
  Name, 
  Description, 
  SocialLinks, 
  SocialIcon, 
  NavigationGrid, 
  NavigationBox 
} from './Home.styles'

const Home = () => {
  return (
    <>
        <HomeContainer>
          <Name>Eric Grant</Name>
          <Description>
            Former Amazon engineer with 4+ years of experience building scalable cloud systems.<br />
            Passionate about full-stack development, automation, and exploring the latest technologies.
          </Description>
          <SocialLinks>
              <SocialIcon href="https://github.com/Ericgi231" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
              </SocialIcon>
              <SocialIcon href="https://www.linkedin.com/in/eric-grant-b73020154/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
              </SocialIcon>
          </SocialLinks>
          <NavigationGrid>
              <NavigationBox href="/fileshare">
                <h3>Public Fileshare UI</h3>
                <p>Upload and view files via web interface with reactive search and previews</p>
              </NavigationBox>
              <NavigationBox href="/help">
                <h3>Public Fileshare APIs</h3>
                <p>Documentation for the RESTful APIs used to upload and retreive from my public fileshare</p>
              </NavigationBox>
              <NavigationBox href="https://github.com/Ericgi231/DiscordBot_Jarvis_Java/tree/master">
                <h3>Discord Bot</h3>
                <p>Allows users to make calls to APIs using human readable syntax</p>
              </NavigationBox>
              <NavigationBox href="https://gist.github.com/Ericgi231/7e20d9faf7ed0f7b6a9860966de6ea73">
                <h3>NYT Connections Art Script</h3>
                <p>Tampermonkey script to show the daily New York Times Connections art on the game page.</p>
              </NavigationBox>
          </NavigationGrid>
        </HomeContainer>
    </>
  )
}

// TODO: Horse races game
// TODO: Daily DLE
// TODO: Mara Jai box game

export default Home;