import { useFetcher } from 'react-router-dom';

import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';

function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  return (
    // для обновлении данных используем fetcher.Form
    // fetcher.Form - так же, как <Form> , только не вызывает навигацию, а обновляет данные и повторно проверяет страницу
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

// создаем функцию action для обновления заказа
export async function action({ request, params }) {
  const data = { priority: true };

  // обновляем заказ с помощью функции updateOrder из apiRestaurant
  // params - втроенные параметры маршрута, которые были переданы в URL
  await updateOrder(params.orderId, data);

  return null;
}

export default UpdateOrder;
