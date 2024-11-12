import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import store from '../../store';
import { formatCurrency } from '../../utils/helpers';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  // хук useNavigation (react-router v6.4) позволяет получить информацию о текущем состоянии навигации в приложении (loading, idle, submitting и т.д.)
  const navigation = useNavigation();

  // используем состояние глобальной навигации
  const isSubmitting = navigation.state === 'submitting';

  // извлекаем данные из action
  const formErrors = useActionData();

  // извлекаем данные глобального состояния из стора
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === 'loading';

  const dispatch = useDispatch();

  const cart = useSelector(getCart);

  // вычисляем общую стоимость корзины
  const totalCartPrice = useSelector(getTotalCartPrice);
  // вычисляем общую стоимость корзины + стоимость приоритета
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* компонент Form из react-router работает без обработчиков событий (onSubmit например) не нужны переменные state для импутов, не нужны даже состояние загрузки - React Router делает все сам автоматически */}
      {/* полученные данные передаются в action (ниже) где мы их обрабатываем */}

      {/* <Form method="POST" action="/order/new">
            action не обязательно */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            defaultValue={username}
            className="input grow"
            type="text"
            name="customer"
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-500">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {addressStatus === 'error' && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-500">
                {errorAddress}
              </p>
            )}
          </div>

          {/* убираем кнопку после получения координат */}
          {!position.latitude && !position.longitude && (
            <span className="absolute  right-[5px] top-[35px] z-40 sm:top-[3px] md:top-[5px]">
              <Button
                type="small"
                disabled={isLoadingAddress}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          {/* скрытый input - трюк-способ передачи данных в action не превращая их поле формы */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            // если есть координаты, то передаем их
            value={
              position.latitude && position.longitude
                ? `${position.latitude},${position.longitude}`
                : ''
            }
          />

          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting || isLoadingAddress
              ? 'Placing order...'
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// создаем функцию action (по аналогии с loader)
export async function action({ request }) {
  const formData = await request.formData();

  // преобразуем formData в обычный объект
  const data = Object.fromEntries(formData);

  // преобразуем данные в тот вид который нужен нам для создания заказа
  const order = {
    ...data,
    cart: JSON.parse(data.cart), // преобразуем строку в объект
    priority: data.priority === 'true', // true or false
  };

  // валидация данных
  const errors = {};

  // валидация телефона
  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give us your correct phone number. We need it to contact you';

  // проверка на наличие ошибок
  if (Object.keys(errors).length > 0) return errors;

  // если все в порядке, то создаем новый заказ и перенаправляем на страницу с новым заказом
  // создаем заказ с помощью функции createOrder из apiRestaurant
  const newOrder = await createOrder(order);

  // 'ХАК' НЕ ЗЛОУПОТРЕБЛЯТЬ ЭТИМ СПОСОБОМ
  // т.к. понижается производительность
  store.dispatch(clearCart());

  // redirect функция предоставленная React Router
  // которая создают новый запрос или новый ответ
  // и перенаправляет на другой URL
  // в данном случае  нельзя использовать useNavigate, так как хуки (useNavigate) можно использовать только внутри компонентов
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
