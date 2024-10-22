import { useDispatch, useSelector } from "react-redux";
import OrdersList from "../../components/orderHistory/ordersList/OrdersList";
import styles from "./OrderHistory.module.css";
import { useEffect } from "react";
import { fetchOrders } from "../../store/features/orderHistorySlice";
import Loader from "../../components/UI/loader/Loader";

function OrderHistory() {
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector(
    (state) => state.orderHistory
  );

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleOrderClick = () => {
    console.log("Order clicked");
  };
  return (
    <div className={styles.orders}>
      <h1>Order History</h1>

      {isLoading && <Loader />}

      {error && (
        <h3>
          An error occurred during fetching orders, please try again.
          <br />
          {error}
        </h3>
      )}

      {!isLoading && !error && Array.isArray(orders) && orders.length === 0 && (
        <h3>No orders available.</h3>
      )}

      {!isLoading && !error && Array.isArray(orders) && orders.length > 0 && (
        <OrdersList orders={orders} onOrderClick={handleOrderClick} />
      )}
    </div>
  );
}

export default OrderHistory;
