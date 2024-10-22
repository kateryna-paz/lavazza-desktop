import PropTypes from "prop-types";
import OrderItem from "../orderItem/OrderItem";

OrdersList.propTypes = {
  orders: PropTypes.array.isRequired,
};

function OrdersList({ orders }) {
  return (
    <ul className="flex flex-col gap-2 mx-20 my-2">
      {orders.map((order) => {
        return <OrderItem key={order.id} order={order}></OrderItem>;
      })}
    </ul>
  );
}

export default OrdersList;
