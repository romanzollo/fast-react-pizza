import { useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';

function Error() {
  // встроенный хук (React Router v6.4) который позволяет получить информацию об ошибке
  const error = useRouteError();
  console.log(error);

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>

      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
