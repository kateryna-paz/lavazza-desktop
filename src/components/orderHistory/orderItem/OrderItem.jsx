import PropTypes from "prop-types";
import { useState } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";

OrderItem.propTypes = {
  order: PropTypes.object.isRequired,
};

function OrderItem({ order }) {
  const { id, date, sum, cartItems, email } = order;
  const [openedDetails, setOpenedDetails] = useState(false);
  return (
    <div className="p-4 w-full bg-white text-midnight rounded-md shadow-md border border-grey-blue transition-shadow duration-300 ease-in-out">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Order № {id}</h3>
        <button
          className="flex items-center text-midnight focus:outline-none"
          onClick={() => setOpenedDetails(!openedDetails)}
        >
          <IoIosArrowDropdownCircle
            size={28}
            className={`transform transition-transform duration-200 ${
              openedDetails ? "rotate-90" : ""
            }`}
          />
          <span className="ml-1">Details</span>
        </button>
      </div>

      <div className="flex justify-between text-sm text-grey-blue">
        <p>
          Date: {date.split("T")[0]} Time: {date.split("T")[1].split(".")[0]}
        </p>
        <p>Email: {email ? email : "-"}</p>
      </div>
      <div className="mt-2 border-t border-grey-blue pt-2">
        <p className="text-lg font-bold">Total: {sum}₴</p>
      </div>

      {openedDetails && (
        <div className="mt-4 p-4 bg-grey-blue text-white rounded-md border border-white">
          <p className="font-semibold text-lg mb-2">Cart items:</p>
          <ul className="list-none">
            {Array.isArray(cartItems) &&
              cartItems.length > 0 &&
              cartItems.map((item) => (
                <li
                  key={item.name}
                  className="text-sm flex justify-between border-b border-dashed border-white pb-2 mb-2 last:mb-0 last:border-none"
                >
                  <span>
                    {item.name} {item.amount}{" "}
                    {typeof item.amount === "string" &&
                    item.amount.includes("ml")
                      ? ""
                      : "ml"}{" "}
                    x {item.quantity}
                  </span>
                  <span>{item.price * item.quantity}₴</span>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default OrderItem;
