import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
    const [query, setQuery] = useState('');

    // для навигации
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        if (!query) return;

        navigate(`/order/${query}`); // навигация
        setQuery('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Search order by ID"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </form>
    );
}

export default SearchOrder;
