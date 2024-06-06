import React from "react";
import { FaAmazonPay, FaHome, FaPaypal, FaTimes } from "react-icons/fa";

const SelecttedPayment = (props) => {
  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto">
        <div className="relative w-full max-w-md mx-auto bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Select Payment Method
            </h3>
            <button
              onClick={props.close}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <FaTimes size={20} />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-6 space-y-4">
            <button
              type="button"
              onClick={props.click}
              className="flex items-center justify-center w-full px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300"
            >
              <FaHome size={24} className="mr-2" />
              Payment on Delivery
            </button>
            <button
              type="button"
              onClick={props.Vnpay}
              className="flex items-center justify-center w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
            >
              <FaAmazonPay size={24} className="mr-2" />
              Payment with VNpay
            </button>
            <button
              type="button"
              onClick={props.paypal}
              className="flex items-center justify-center w-full px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300"
            >
              <FaPaypal size={24} className="mr-2" />
              Payment with PayPal
            </button>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-50"></div>
    </div>
  );
};

export default SelecttedPayment;
