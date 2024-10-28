import { useState } from 'react';
import { Form, redirect } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
        str
    );

const fakeCart = [
    {
        pizzaId: 12,
        name: 'Mediterranean',
        quantity: 2,
        unitPrice: 16,
        totalPrice: 32,
    },
    {
        pizzaId: 6,
        name: 'Vegetale',
        quantity: 1,
        unitPrice: 13,
        totalPrice: 13,
    },
    {
        pizzaId: 11,
        name: 'Spinach and Mushroom',
        quantity: 1,
        unitPrice: 15,
        totalPrice: 15,
    },
];

function CreateOrder() {
    // const [withPriority, setWithPriority] = useState(false);
    const cart = fakeCart;

    return (
        <div>
            <h2>Ready to order? Let's go!</h2>

            {/* компонент Form из react-router работает без обработчиков событий (onSubmit например) не нужны переменные state для импутов, не нужны даже состояние загрузки - React Router делает все сам автоматически */}
            {/* полученные данные передаются в action (ниже) где мы их обрабатываем */}

            {/* <Form method="POST" action="/order/new">
            action не обязательно */}
            <Form method="POST">
                <div>
                    <label>First Name</label>
                    <input type="text" name="customer" required />
                </div>

                <div>
                    <label>Phone number</label>
                    <div>
                        <input type="tel" name="phone" required />
                    </div>
                </div>

                <div>
                    <label>Address</label>
                    <div>
                        <input type="text" name="address" required />
                    </div>
                </div>

                <div>
                    <input
                        type="checkbox"
                        name="priority"
                        id="priority"
                        // value={withPriority}
                        // onChange={(e) => setWithPriority(e.target.checked)}
                    />
                    <label htmlFor="priority">
                        Want to yo give your order priority?
                    </label>
                </div>

                <div>
                    {/* скрытый input - трюк-способ передачи данных в action не превращая их поле формы */}
                    <input
                        type="hidden"
                        name="cart"
                        value={JSON.stringify(cart)}
                    />
                    <button>Order now</button>
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
        priority: data.priority === 'on', // true or false
    };

    // создаем заказ с помощью функции createOrder из apiRestaurant
    const newOrder = await createOrder(order);

    console.log(newOrder);

    // redirect функция предоставленная React Router
    // которая создают новый запрос или новый ответ
    // и перенаправляет на другой URL
    // так как хуки (useNavigate) можно использовать только внутри компонентов
    return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
