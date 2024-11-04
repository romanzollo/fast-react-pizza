import { Link, useNavigate } from 'react-router-dom';

function LinkButton({ children, to }) {
  const navigate = useNavigate();

  // tailwind
  const className = 'text-sm text-blue-500 hover:text-blue-600 hover:underline';

  // пример проверки на -1 для дальнего перехода на предыдущую страницу
  // через useNavigate (для навигации)
  if (to === '-1')
    return (
      <button className={className} onClick={() => navigate(-1)}>
        {children}
      </button>
    );
  return (
    <Link className={className} to={to}>
      {children}
    </Link>
  );
}

export default LinkButton;
