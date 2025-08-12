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
              <NavigationBox href="/memes">
              Public File Database (tbd)
              </NavigationBox>
              <NavigationBox href="/t2">
              Discord random image bot (tbd)
              </NavigationBox>
              <NavigationBox href="/t3">
              Horse races (tbd)
              </NavigationBox>
              <NavigationBox href="/t4">
              Blue Prince mora jai box online (tbd)
              </NavigationBox>
              <NavigationBox href="/t5">
              Daily dle (tbd)
              </NavigationBox>
          </NavigationGrid>
        </HomeContainer>
    </>
  )
}

export default Home