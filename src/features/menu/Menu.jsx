import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';

import MenuItem from './MenuItem';

function Menu() {
    // извлекаем данные с помощью хука useLoaderData (react-router v6.4)
    const menu = useLoaderData();
    console.log(menu);

    return (
        <ul>
            {menu.map((pizza) => (
                <MenuItem pizza={pizza} key={pizza.id} />
            ))}
        </ul>
    );
}

// создаем функцию loader для загрузки данных (react-router v6.4)
export async function loader() {
    const menu = await getMenu();

    return menu;
}

export default Menu;
