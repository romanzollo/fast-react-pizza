import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './ui/Home';
import Menu, { loader as menuLoader } from './features/menu/Menu'; // добавляем лоадер через импорт
import Cart from './features/cart/Cart';
import CreateOrder from './features/order/CreateOrder';
import Order from './features/order/Order';
import AppLayout from './ui/AppLayout';
import Error from './ui/Error';

// Only for React Router since vers. 6.4
const router = createBrowserRouter([
    {
        element: <AppLayout />,
        errorElement: <Error />, // добавляем обработчик ошибок (React Router v6.4)

        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/menu',
                element: <Menu />,
                errorElement: <Error />, // добавляем обработчик ошибок (React Router v6.4)

                loader: menuLoader, // добавляем лоадер
            },
            {
                path: '/cart',
                element: <Cart />,
            },
            {
                path: '/order/new',
                element: <CreateOrder />,
            },
            {
                path: '/order/:orderId',
                element: <Order />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
