import { Outlet, useNavigation } from 'react-router-dom';

import Header from './Header';
import CartOverview from '../features/cart/CartOverview';
import Loader from './Loader';

function AppLayout() {
    // хук useNavigation (react-router v6.4) позволяет получить информацию о текущем состоянии навигации в приложении (loading, idle, submitting и т.д.)
    const navigation = useNavigation();

    // используем состояние глобальной навигации для отображения индикатора загрузки
    const isLoading = navigation.state === 'loading';

    return (
        <div className="layout">
            {isLoading && <Loader />}

            <Header />

            <main>
                <Outlet />
            </main>

            <CartOverview />
        </div>
    );
}

export default AppLayout;
