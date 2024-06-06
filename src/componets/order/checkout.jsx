import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  calculateTotalPrice,
} from "../../redux/slices/cartSlice";
import { selectUser } from "../../redux/auth/reducers/authReducer";
import toast from "react-hot-toast";
import { Oders, OrderVNpay } from "../../api/order/order";
import { useNavigate } from "react-router-dom";
import { removeAllItems } from "../../redux/slices/cartSlice";
import SelecttedPayment from "./selecttedPayment";
import { openPayPal } from "../../api/paypal/paypal";
import { format } from 'date-fns'
const Checkout = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const cart = useSelector(selectCartItems);
  const totalPrice = calculateTotalPrice(cart);
  const shippingCost = 5;
  const totalPriceWithShipping = totalPrice + shippingCost;
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [selectOrder, setSelectOrder] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const newTotalQuantity = cart.reduce(
      (total, item) => total + item.productVariant.quantity,
      0
    );
    setTotalQuantity(newTotalQuantity);
    const paymentData = JSON.parse(localStorage.getItem("paymentData"));
    if (paymentData) {
      localStorage.removeItem("paymentData");
    }
  }, [cart]);

  useEffect(() => {
    if (!user || cart.length === 0) {
      navigate("/shop");
    }
    // eslint-disable-next-line
  }, []);
  const handleInputChange = (e) => {
    // Xử lý thay đổi giá trị của input tại đây (nếu cần)
  };
  const cartJSON = JSON.stringify(cart);
  const formatDate = (date) => {
    return format(new Date(date), 'dd/MM/yyyy');
  };
  
  const SubmitDelivery = async () => {
    const orderData = {
      order_date: formatDate(new Date()), // Lấy ngày hiện tại
      userId: user ? user.id : null, // Lấy userId từ user nếu user tồn tại
    };
    const orderDetailData = {
      details: cart.map((item) => item.id),
      quantity: totalQuantity,
      status: 0,
      total: totalPriceWithShipping,
      cart,
      payment: "Delivery",
      data: cartJSON,
    };
    console.log(orderData,orderDetailData);
    try {
      const response = await Oders({ orderData, orderDetailData });
      if (response.data.EC === 0) {
        // Chuyển hướng về trang shop nếu đặt hàng thành công
        dispatch(removeAllItems());
        navigate("/oder-success");
      } else {
        toast.error("Your order has been placed fail");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create order");
    }
  };
  const SubmitVnPay = async () => {
    const orderData = {
      order_date: formatDate(new Date()), // Lấy ngày hiện tại
      userId: user ? user.id : null, // Lấy userId từ user nếu user tồn tại
    };
    const orderDetailData = {
      details: cart.map((item) => item.id),
      quantity: totalQuantity,
      status: 2,
      total: totalPriceWithShipping,
      cart,
      payment: "VNpay",
      data: cartJSON,
    };
    // console.log(orderData,orderDetailData);
    try {
      const response = await OrderVNpay({ orderData, orderDetailData });
      if (response && response.data && response.data.EC === 0) {
        window.location.href = response.data.paymentUrl;
      } else {
        toast.error("Failed to open PayPal for payment");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create order");
    }
  };

  const submitPaypal = async () => {
    const orderData = {
      order_date: formatDate(new Date()),
      userId: user ? user.id : null,
    };

    const orderDetailData = {
      details: cart.map((item) => item.id),
      quantity: totalQuantity,
      status: 2,
      total: totalPriceWithShipping,
      payment: "Paypal",
      cart,
      data: cartJSON,
    };
    try {
      const response = await openPayPal(orderDetailData);
      if (response.data.EC === 0) {
        localStorage.setItem(
          "paymentData",
          JSON.stringify({ orderData, orderDetailData })
        );
        // Nếu thanh toán PayPal thành công, chuyển hướng đến trang thanh toán
        window.location.href = response.data.approval_url;
      } else {
        // Xử lý trường hợp không thành công (ví dụ: hiển thị thông báo)
        toast.error("Failed to open PayPal for payment");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create order");
    }
  };

  const show = () => {
    setSelectOrder(true);
  };

  const close = () => {
    setSelectOrder(false);
  };

  return (
    <>
      {selectOrder ? (
        <SelecttedPayment
          click={SubmitDelivery}
          Vnpay={SubmitVnPay}
          close={close}
          paypal={submitPaypal}
        />
      ) : null}

      <div className="mx-auto max-w-4xl mt-24 p-4 border bg-white border-black rounded mb-12">
        <h3 className="text-xl font-medium capitalize mb-4 border-b border-gray-200">
          Checkout
        </h3>
        <div className="space-y-4">
          <div>
            <div className="grid gap-6 mb-6 md:grid-cols-1">
              <div>
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full name
                </label>
                <input
                  type="text"
                  value={user ? user.username : ""}
                  onChange={handleInputChange}
                  placeholder="What your first name ?"
                  className=" w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone number
                </label>
                <input
                  type="text"
                  placeholder="What your my phonenumber ?"
                  value={user ? user.phone : ""}
                  onChange={handleInputChange}
                  className=" w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                />
              </div>
              <div>
                <label
                  htmlFor="website"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Adress
                </label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  placeholder="You should update your address information to receive the goods "
                  className=" w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="visitors"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Ship code
                </label>
                <input
                  type="text"
                  placeholder="Ship code"
                  className=" w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email address
              </label>
              <input
                type="email"
                placeholder="Email ?"
                value={user ? user.email : ""}
                onChange={handleInputChange}
                className=" w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
              />
            </div>
            <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase border-b border-gray-200">
              order summary
            </h4>

            <div className="space-y-2">
              {React.Children.toArray(
                cart.map((item) => (
                  <div className="border-b border-gray-200 py-4">
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <h5 className="text-gray-800 font-medium">
                          {item.Product.name}
                        </h5>
                        <div className="flex space-x-2 mt-1">
                          <span className="text-sm text-gray-600">
                            Size: {item.productVariant.Size.size}
                          </span>
                          <span className="text-sm text-gray-600">
                            Color: {item.productVariant.Color.color}
                          </span>
                        </div>
                      </div>
                      <div className="text-gray-600">
                        X {item.productVariant.quantity}
                      </div>
                      <div className="text-gray-800 font-medium">
                        {(
                          item.productVariant.quantity * item.Product.price
                        ).toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
                <div>shipping</div>
                <div>
                  {shippingCost.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </div>
              </div>
            )}

            <div className="flex justify-between text-gray-800 font-medium py-3 uppercas">
              <div className="font-semibold">Total</div>
              <div>
                {cart.length > 0 ? (
                  <>
                    {totalPriceWithShipping.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </>
                ) : (
                  <div>0.00$</div>
                )}
              </div>
            </div>

            <div className="flex items-center mb-4 mt-2">
              <input
                type="checkbox"
                name="aggrement"
                id="aggrement"
                className="text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3"
              />
              <label
                htmlFor="aggrement"
                className="text-gray-600 ml-3 cursor-pointer text-sm"
              >
                I agree to the terms & conditions
              </label>
            </div>

            <div
              onClick={show}
              className="block w-xl py-3 px-4 text-center text-white bg-black border rounded-xl transition font-medium hover:text-yellow-500 transform hover:scale-110"
            >
              Select a payment method
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Checkout;
