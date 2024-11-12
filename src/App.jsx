import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './ui/Home';
import Menu, { loader as menuLoader } from './features/menu/Menu'; // добавляем лоадер через импорт
import Cart from './features/cart/Cart';
import CreateOrder, {
  action as createOrderAction,
} from './features/order/CreateOrder'; // добавляем action через импорт
import Order, { loader as orderLoader } from './features/order/Order'; // добавляем лоадер через импорт
import { action as updateOrderAction } from './features/order/UpdateOrder';
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
        action: createOrderAction, // добавляем action
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        errorElement: <Error />, // добавляем обработчик ошибок (React Router v6.4)

        loader: orderLoader, // добавляем лоадер
        action: updateOrderAction, // добавляем action для добавления приоритета заказа к существующему заказу
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
