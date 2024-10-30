import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';

import MenuItem from './MenuItem';

function Menu() {
    // извлекаем данные из loader с помощью хука useLoaderData (react-router v6.4)
    const menu = useLoaderData();

    return (
        <ul>
            {menu.map((pizza) => (
                <MenuItem pizza={pizza} key={pizza.id} />
            ))}
        </ul>
    );
}

// создаем функцию loader для загрузки данных через react-router (react-router v6.4)
export async function loader() {
    const menu = await getMenu();

    return menu;
}

export default Menu;
