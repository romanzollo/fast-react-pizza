import { formatCurrency } from '../../utils/helpers';

function CartItem({ item }) {
    const { coffeeId, name, quantity, totalPrice } = item;

    return (
        <li>
            <p>
                {quantity}&times; {name}
            </p>
            <div>
                <p>{formatCurrency(totalPrice)}</p>
            </div>
        </li>
    );
}

export default CartItem;
