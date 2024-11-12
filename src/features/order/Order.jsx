// Test ID: IIDSAT

import { useFetcher, useLoaderData } from 'react-router-dom';
import { useEffect } from 'react';

import { getOrder } from '../../services/apiRestaurant';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';

import OrderItem from './OrderItem';

function Order() {
  const order = useLoaderData();

  // чтобы вызвать загрузчик вне навигации или вызвать действие (и получить данные на странице) без изменения URL-адреса.
  // fetcher - это объект, который позволяет нам получать данные которые из другого маршрута (другой страницы)
  // с помощью useFetcher можно извлекать и изменять данные не переходя на другую страницу!
  const fetcher = useFetcher();

  // сразу после монтирования компонента извлекаем данные из страницы '/menu'
  useEffect(
    function () {
      // извлекаем данные если они еще не получены
      // fetcher как и при использовании useNavigation может находиться в разных состояниях (loading, idle, submitting)
      if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu'); // получаем данные из '/menu' через fetcher.load и сохраняем в объекте fetcher
    },
    [fetcher],
  );

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">
          Order #{id} status: {status}
        </h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-b border-t">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === 'loading'}
            // передаем данные об ингредиентах полученные из страницы '/menu'(не переходя на саму страницу) при помощи fetcher (react-router ver.6)
            ingredients={
              fetcher.data?.find((el) => el.id === item.pizzaId).ingredients ??
              [] // если ингредиенты еще не загрузились, то возвращаем пустой массив чтобы не было ошибки
            }
          />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

// создаем функцию loader
// params - втроенные параметры маршрута, которые были переданы в URL
// useParams неподходит так как его можно использовать только внутри компонента
export async function loader({ params }) {
  const order = await getOrder(params.orderId);

  return order;
}

export default Order;
