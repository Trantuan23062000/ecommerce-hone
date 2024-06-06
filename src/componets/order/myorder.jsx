import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrderById } from "../../redux/oder/getorderByid";
import { selectUser } from "../../redux/auth/reducers/authReducer";
import { selectData } from "../../redux/oder/getorderByid";
import { Link } from "react-router-dom";
import { cancelOrder } from "../../api/order/order";
import toast from "react-hot-toast";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Myorder = () => {
  const user = useSelector(selectUser);
  const orderData = useSelector(selectData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchOrderById(user.id));
    }
  }, [dispatch, user]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orderData.slice(indexOfFirstItem, indexOfLastItem);
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const totalPages = Math.ceil(orderData.length / itemsPerPage);
  const [showRefundForm, setShowRefundForm] = useState(false);
  const [refundInfo, setRefundInfo] = useState({
    numberPayment: "",
    nameBank: "",
    nameAccount: "",
  });

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-4 py-2 mx-1 rounded-lg ${
            currentPage === i
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const HandleCancel = async (orderId) => {
    const response = await cancelOrder({ orderId });
    if (response && response.data && response.data.EC === 0) {
      toast.success(response.data.result.message);
      dispatch(fetchOrderById(user.id));
    } else {
      toast.error(response.data.message);
    }
  };

  const checkIfCancelable = (orderDate) => {
    const currentDate = new Date();
    const orderDateParts = orderDate.split("/");
    const orderDateTime = new Date(
      orderDateParts[2],
      orderDateParts[1] - 1,
      orderDateParts[0]
    );
    const diffTime = currentDate.getTime() - orderDateTime.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);
    return diffDays <= 1;
  };

  const handleRefundInfoChange = (e) => {
    const { name, value } = e.target;
    setRefundInfo({
      ...refundInfo,
      [name]: value,
    });
  };

  const handleRefundSubmit = async (orderId, e) => {
    e.preventDefault();
    const response = await cancelOrder({ orderId, ...refundInfo });
    if (response && response.data && response.data.EC === 0) {
      toast.success(response.data.result.message);
      dispatch(fetchOrderById(user.id));
      setShowRefundForm(false);
    } else {
      toast.error(response.data.message);
    }
  };

  const getStatusText = (status) => {
    if (status === "3") return "Order cancelled";
    if (status === "2") return "Order has been paid";
    if (status === "0") return "Unpaid order";
    return "Unknown status";
  };

  return (
    <div>
      <section className="py-24 relative mt-12">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <h2 className="font-manrope font-bold text-4xl leading-10 text-black text-center">
            Hi {user.username}
          </h2>
          <p className="mt-4 font-normal text-lg leading-8 text-gray-500 mb-11 text-center">
            Thanks for making a purchase. You can check your order summary
            below.
          </p>
          {currentOrders.length > 0 ? (
            currentOrders.map((item, index) => (
              <div
                key={index}
                className="main-box border mt-8 border-gray-300 rounded-xl pt-6 max-w-xl mx-auto lg:max-w-full bg-white shadow-md"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
                  <div className="data">
                    <p className="font-semibold text-base leading-7 text-black">
                      STT:{" "}
                      <span className="text-indigo-600 font-medium">
                        {startIndex + index}
                      </span>
                    </p>
                    <p className="font-semibold text-base leading-7 text-black">
                      Order Id:{" "}
                      <span className="text-indigo-600 font-medium">
                        {item.Order.id}
                      </span>
                    </p>
                    <p className="font-semibold text-base leading-7 text-black">
                      Order Date:{" "}
                      <span className="text-indigo-600 font-medium">
                        {item.Order.order_date}
                      </span>
                    </p>
                    <p className="font-semibold text-base leading-7 text-black mt-4">
                      Order Payment:{" "}
                      <span className="text-gray-400 font-medium">
                        {item.payment}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-3 lg:mt-3">
                    <p className="font-medium text-base whitespace-nowrap leading-7 text-emerald-500">
                      Cannot cancel after 1 day
                    </p>
                  </div>
                </div>
                {JSON.parse(item.data).map((product, productIndex) => (
                  <div key={productIndex} className="w-full px-3 sm:px-6">
                    <div className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
                      <div className="img-box w-full lg:max-w-[140px]">
                        <img
                          src={JSON.parse(product.Product.Image.URL)[0]}
                          alt="product"
                          className="w-full aspect-square"
                        />
                      </div>
                      <div className="flex flex-row items-center w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                          <div className="flex items-center">
                            <div>
                              <h2 className="font-semibold text-xl leading-8 text-black mb-3">
                                {product.Product.name}
                              </h2>
                              <div className="flex items-center">
                                <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                                  Size:{" "}
                                  <span className="text-gray-500">
                                    {product.productVariant.Size.size}
                                  </span>
                                </p>
                                <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                                  Color:{" "}
                                  <label
                                    htmlFor={`color-${product.id}`}
                                    className="border border-gray-200 rounded-lg h-6 w-6 cursor-pointer block"
                                    style={{
                                      backgroundColor: `${product.productVariant.Color.codeColor}`,
                                    }}
                                  ></label>
                                </p>
                                <p className="font-medium text-base leading-7 text-black">
                                  Qty:{" "}
                                  <span className="text-gray-500">
                                    {product.productVariant.quantity}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-5 w-full">
                            <div className="col-span-5 lg:col-span-1 flex items-center">
                              <p className="font-medium text-sm leading-7 text-black">
                                Price:{" "}
                                {(
                                  product.Product.price -
                                  (product.Product.price *
                                    product.Product.sale) /
                                    100
                                ).toLocaleString("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                })}
                              </p>
                            </div>
                            <div className="col-span-5 lg:col-span-2 flex items-center">
                              <p className="font-medium text-sm leading-7 text-black">
                                Status: {getStatusText(item.status)}
                              </p>
                            </div>
                            <div className="col-span-5 lg:col-span-2 flex items-center">
                              <p className="font-medium text-sm leading-7 text-black">
                                Version: {product.Product.status}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="w-full p-4 border-t border-gray-200 px-6 flex items-center justify-between">
                  {item.status !== "3" && (
                    <div className="flex flex-col sm:flex-row items-center">
                      {item.payment === "Delivery" && (
                        <button
                          onClick={() => HandleCancel(item.Order.id)}
                          disabled={!checkIfCancelable(item.Order.order_date)}
                          className={`py-3 px-4 text-lg text-white rounded-3xl transition-all duration-500 ${
                            checkIfCancelable(item.Order.order_date)
                              ? "bg-black hover:text-yellow-300"
                              : "bg-gray-400 cursor-not-allowed"
                          }`}
                        >
                          Cancel Order
                        </button>
                      )}
                      {checkIfCancelable(item.Order.order_date) &&
                        item.status !== "3" &&
                        item.payment !== "Delivery" && (
                          <button
                            onClick={() => setShowRefundForm(true)}
                            className="py-3 px-4 text-lg text-white bg-black rounded-3xl transition-all duration-500 hover:text-yellow-300"
                          >
                            Cancel Order
                          </button>
                        )}
                    </div>
                  )}

                  <p className="font-semibold text-lg text-black">
                    Total:{" "}
                    <span className="text-indigo-600 space-x-2">
                      {item.total}$
                    </span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-40">
              <p className="text-center text-white bg-black rounded-full hover:text-yellow-300 p-3">
                <Link to="/shop">No order back to shop</Link>
              </p>
            </div>
          )}
          <div className="flex justify-center my-4">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 mr-2 bg-black text-white rounded-lg"
            >
              Prev
            </button>
            {renderPageNumbers()}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={indexOfLastItem >= orderData.length}
              className="px-4 py-2 mr-2 bg-black text-white rounded-lg"
            >
              Next
            </button>
          </div>
        </div>
      </section>

      <Modal
        isOpen={showRefundForm}
        onRequestClose={() => setShowRefundForm(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            borderRadius: "10px",
            width: "400px",
            backgroundColor: "white",
            boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
          },
        }}
      >
        <h2 className="font-semibold text-lg mb-4">Information</h2>
        <form
          onSubmit={(e) => handleRefundSubmit(currentOrders[0].Order.id, e)}
        >
          <div className="mb-4">
            <label
              htmlFor="numberPayment"
              className="block text-sm font-medium text-gray-700"
            >
              Number Payment
            </label>
            <input
              type="number"
              name="numberPayment"
              value={refundInfo.numberPayment}
              onChange={handleRefundInfoChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="nameBank"
              className="block text-sm font-medium text-gray-700"
            >
              Bank Name
            </label>
            <input
              type="text"
              id="nameBank"
              name="nameBank"
              value={refundInfo.nameBank}
              onChange={handleRefundInfoChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="nameAccount"
              className="block text-sm font-medium text-gray-700"
            >
              Account Name
            </label>
            <input
              type="text"
              id="nameAccount"
              name="nameAccount"
              value={refundInfo.nameAccount}
              onChange={handleRefundInfoChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowRefundForm(false)}
              className="px-4 py-2 mr-2 bg-gray-500 text-white rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Myorder;
