import { 
  HomeContainer, 
  Name, 
  Description, 
  SocialLinks, 
  SocialIcon, 
  NavigationGrid, 
  NavigationBox 
} from '@pages/Home/Home.styles.js';

import { HOME_NAVIGATION_PAGES } from '@constants/PageList.js';

const NavigationBoxes = () => (
  <>
    {Object.entries(HOME_NAVIGATION_PAGES).map(([key, { url, title, description }]) => (
      <NavigationBox key={key} href={url}>
        <h3>{title}</h3>
        <p>{description}</p>
      </NavigationBox>
    ))}
  </>
);

const Home = () => (
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
        <NavigationBoxes />
      </NavigationGrid>
    </HomeContainer>
  </>
)

// TODO: Horse races game
// TODO: Daily DLE

export default Home;