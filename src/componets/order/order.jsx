import React from "react";
import { CgChevronLeft } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import Checkout from "./checkout";
import { Link } from "react-router-dom";

const Order = () => {
  return (
    <div className="container mx-auto">
      <div className="py-4 flex items-center gap-3">
        <div className="text-black text-base">
          <Link to="/">
            <FaHome />
          </Link>
        </div>
        <span className="text-sm text-gray-400">
          <CgChevronLeft />
        </span>
        <p className="text-gray-600 font-medium">Checkout</p>
      </div>
      <Checkout/>
    </div>
  );
};

export default Order;
