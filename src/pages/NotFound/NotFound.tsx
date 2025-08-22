import { 
  NotFoundContainer, 
  ErrorCode, 
  ErrorMessage, 
  ErrorDescription, 
  HomeButton 
} from '@pages/NotFound/NotFound.styles.js';

const NotFound = () => (
  <>
    <NotFoundContainer>
      <ErrorCode>404</ErrorCode>
      <ErrorMessage>Page Not Found</ErrorMessage>
      <ErrorDescription>
          The page you're looking for doesn't exist or has been moved.
      </ErrorDescription>
      <HomeButton href="/">Go Home</HomeButton>
    </NotFoundContainer>
  </>
)
export default NotFound;