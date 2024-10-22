import styles from "./Cart.module.css";
import Input from "../../UI/input/Input";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  setEmail,
  clearCart,
  saveOrder,
} from "../../../store/features/cartSlice";
import Button from "../../UI/button/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../UI/loader/Loader";

function Cart() {
  const dispatch = useDispatch();
  const { cartItems, sum, email, isLoading } = useSelector(
    (state) => state.cart
  );
  const handleInputChange = (_, value) => {
    dispatch(setEmail(value));
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const resultAction = await dispatch(saveOrder({ email, cartItems, sum }));
    if (saveOrder.rejected.match(resultAction)) {
      const errorMessage = resultAction.payload || "Failed to save order";
      toast.error(errorMessage);
      return;
    }

    if (resultAction.payload) {
      toast.success("Order saved successfully");
      dispatch(clearCart());
    }
  };

  const handleRemoveFromCart = (index) => {
    dispatch(removeFromCart(index));
  };

  const handleUpdateQuantity = (index, newQuantity) => {
    dispatch(updateQuantity({ index, newQuantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.cart}>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.cart}>
        <ToastContainer />
        <h2>Your Order</h2>
        {Array.isArray(cartItems) && cartItems.length === 0 && (
          <p>No items in the cart.</p>
        )}
        {Array.isArray(cartItems) && (
          <div>
            {cartItems.map((item, index) => (
              <div className={styles.cartItem} key={index}>
                <div className={styles.itemDetails}>
                  <strong>{item.name}</strong> {item.size && `(${item.size})`}{" "}
                  <br /> ${item.price}
                </div>

                <div className={styles.quantityControl}>
                  <button
                    className={styles.quantityButton}
                    onClick={() =>
                      handleUpdateQuantity(index, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className={styles.quantityButton}
                    onClick={() =>
                      handleUpdateQuantity(index, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>

                <div className={styles.actions}>
                  <span>
                    <strong>${item.price * item.quantity}</strong>
                  </span>
                  <button
                    className={styles.removeButton}
                    onClick={() => handleRemoveFromCart(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className={styles.emailInput}>
          <Input
            type="email"
            label={"Email"}
            required={true}
            name="email"
            value={email}
            onChange={handleInputChange}
          />
        </div>
        {sum ? (
          <h3>
            Total sum: <strong>${sum.toFixed(2)}</strong>
          </h3>
        ) : (
          <h3>
            Total sum: <strong>$0.00</strong>
          </h3>
        )}
      </div>
      <div className={styles.actionButtons}>
        <Button width={"47%"} className="darkButton" onClick={handleClearCart}>
          Clear cart
        </Button>
        <Button width={"47%"} onClick={handleCheckout}>
          Checkout
        </Button>
      </div>
    </div>
  );
}

export default Cart;
