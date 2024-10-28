import { useNavigate, useRouteError } from 'react-router-dom';

function Error() {
    const navigate = useNavigate();

    // встроенный хук (React Router v6.4) который позволяет получить информацию об ошибке
    const error = useRouteError();
    console.log(error);

    return (
        <div>
            <h1>Something went wrong 😢</h1>
            <p>{error.data || error.message}</p>
            <button onClick={() => navigate(-1)}>&larr; Go back</button>
        </div>
    );
}

export default Error;
