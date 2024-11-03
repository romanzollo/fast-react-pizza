import { Outlet, useNavigation } from 'react-router-dom';

import Header from './Header';
import CartOverview from '../features/cart/CartOverview';
import Loader from './Loader';

function AppLayout() {
  // хук useNavigation (react-router v6.4) позволяет получить информацию о текущем состоянии навигации в приложении (loading, idle, submitting и т.д.) и AppLayout лучшее место для отображения индикатора загрузки так как индикатор загрузки теперь будет отображаться во всем приложении
  const navigation = useNavigation();

  // используем состояние глобальной навигации для отображения индикатора загрузки
  const isLoading = navigation.state === 'loading';

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] ">
      {isLoading && <Loader />}

      <Header />

      <div className="overflow-y-auto">
        <main className=" mx-auto max-w-3xl  ">
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
