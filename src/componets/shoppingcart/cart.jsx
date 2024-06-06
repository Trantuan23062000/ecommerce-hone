import React, { useEffect, useState } from "react";
import { CgPushChevronRight, CgPushChevronLeft } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  updateCartdata,
  selectCartItems,
} from "../../redux/slices/cartSlice";
import { FaBackspace, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { fetchData, selectProductData } from "../../redux/slices/ productSlice"; // Import fetchData và selectProductData từ productSlice
import toast from "react-hot-toast";
import { selectUser } from "../../redux/auth/reducers/authReducer";

const ITEMS_PER_PAGE = 5;

const Cart = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const products = useSelector(selectProductData);
  const cartItems = useSelector(selectCartItems);
  const [initialized, setInitialized] = useState(false);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  useSelector(selectUser);
  useEffect(() => {
    // Gọi fetchData khi component được render để lấy dữ liệu sản phẩm từ Redux store
    dispatch(fetchData({ currentPage: 1, currentLimit: 6 }));
  }, [dispatch]);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = cartItems.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(cartItems.length / ITEMS_PER_PAGE); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    dispatch(updateCartdata(cartItems)); // Sử dụng dispatch để cập nhật trạng thái giỏ hàng
  }, [dispatch, cartItems]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems && !initialized) {
      dispatch(updateCartdata(JSON.parse(storedCartItems)));
      setInitialized(true);
    }
  }, [dispatch, initialized]);

  const handleIncreaseQuantity = (item) => {
    const itemId = item.id; // Lấy id của item
    const product = products.find((product) => product.id === itemId); // Tìm sản phẩm trong Redux store bằng id
    if (!product) {
      // Nếu sản phẩm không tồn tại trong Redux store
      toast.error("Product not found!");
      return;
    }
    const totalQuantity = item.productVariant.quantity;
    if (totalQuantity > product.productVariant.quantity - 1) {
      // Nếu số lượng vượt quá số lượng có sẵn từ Redux store
      toast.error("Quantity exceeds stock limit!");
      return;
    }
    dispatch(addToCart(item)); // Tăng số lượng sản phẩm trong giỏ hàng
  };

  const handleDecreaseQuantity = (item) => {
    dispatch(decreaseQuantity({ id: item.id }));
  };

  const handleDeleteAll = () => {
    dispatch(updateCartdata([])); // Xóa tất cả các mục khỏi giỏ hàng
    navigate("/all-product");
  };

  if (!cartItems) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-24">
      <div className="py-4 flex items-center justify-between gap-3">
        <div className="bg-black text-white px-8 py-2 font-medium rounded-full uppercase flex items-center gap-2 hover:bg-yellow-500 hover:text-red-500 transition duration-300 ease-in-out transform hover:scale-120">
          <Link to="/all-product">
            {" "}
            <FaBackspace></FaBackspace>
          </Link>
        </div>
        <div
          onClick={() => handleDeleteAll()}
          className="bg-black text-white px-8 py-2 font-medium rounded-full uppercase flex items-center gap-2 hover:bg-yellow-500 hover:text-red-500 transition duration-300 ease-in-out transform hover:scale-120"
        >
          Delete All
          <FaTrash />
        </div>
      </div>

      <div className="col-span-9 space-y-4">
        {currentItems.length === 0
          ? navigate("/all-product")
          : currentItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded"
              >
                <div className="w-28">
                  <img
                    src={JSON.parse(item.Product.Image.URL)[0]}
                    alt="product"
                    className="w-full"
                  />
                </div>
                <div className="w-1/3">
                  <h2 className="text-gray-800 text-xl font-medium uppercase">
                    {item.Product.name}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Availability:{" "}
                    <span className="text-red-600">{item.Product.status}</span>
                  </p>
                </div>
                <div className="text-primary text-lg font-semibold">
                  {item.Product.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </div>
                <div className="flex justify-center mx-auto">
                  <div
                    onClick={() => handleDecreaseQuantity(item)}
                    className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
                  >
                    -
                  </div>
                  <div className="h-8 w-8 text-base flex items-center justify-center">
                    {item.productVariant.quantity}
                  </div>
                  <div
                    onClick={() => handleIncreaseQuantity(item)}
                    className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
                  >
                    +
                  </div>
                </div>

                <div className="text-gray-600 cursor-pointer hover:text-primary">
                  <i className="fa-solid fa-trash"></i>
                </div>
              </div>
            ))}
        {user ? (
          <div className="bg-black text-center mx-auto text-white mt-4 px-4 py-2 font-medium rounded-full uppercase flex items-center justify-center gap-2 hover:bg-yellow-500 hover:text-red-500 transition duration-300 ease-in-out transform hover:scale-120">
            <span className="text-sm">
              {" "}
              <Link to="/checkout">Checkout</Link>
            </span>
          </div>
        ) : (
          <div className="bg-black text-center mx-auto text-white mt-4 px-4 py-2 font-medium rounded-full uppercase flex items-center justify-center gap-2 hover:bg-yellow-500 hover:text-red-500 transition duration-300 ease-in-out transform hover:scale-120">
            <span className="text-sm">
              {" "}
              <Link to="/login">Login to checkout</Link>
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center sm:justify-between mt-6">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mr-2"
          type="button"
        >
          <CgPushChevronLeft size={24} />
        </button>
        <div className="flex items-center gap-2">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`mx-1 px-3 py-1 rounded-full ${
                number === currentPage ? "bg-gray-900 text-white" : ""
              }`}
            >
              {number}
            </button>
          ))}
        </div>
        <button
          onClick={() => {
            if (indexOfLastItem < cartItems.length) {
              setCurrentPage(currentPage + 1);
            }
          }}
          disabled={indexOfLastItem >= cartItems.length}
          className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
          type="button"
        >
          <CgPushChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Cart;
