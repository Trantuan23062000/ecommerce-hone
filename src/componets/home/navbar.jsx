import React, { useEffect, useReducer, useState } from "react";
import {
  FaBars,
  FaShoppingCart,
  FaSearch,
  FaTrash,
  FaUser,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SearchShop from "../search/searchShop";
import { selectUser } from "../../redux/auth/reducers/authReducer";
import {
  updateCartdata,
  selectCartItems,
  removeFromCart,
} from "../../redux/slices/cartSlice";
import toast from "react-hot-toast";

const initialState = {
  isOpen: false,
  isMobile: false,
  isSearchOpen: false,
  activeDropdown: null, // State to store the currently opened dropdown
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_OPEN":
      return {
        ...state,
        isOpen: !state.isOpen,
        activeDropdown: state.activeDropdown === "main" ? null : "main", // Toggle dropdown and check if it was already opened
      };
    case "TOGGLE_CART_DROPDOWN":
      return {
        ...state,
        activeDropdown: state.activeDropdown === "cart" ? null : "cart", // Toggle cart dropdown and check if it was already opened
      };
    case "TOGGLE_MOBILE_DROPDOWN":
      return {
        ...state,
        activeDropdown: state.activeDropdown === "mobile" ? null : "mobile", // Toggle mobile dropdown and check if it was already opened
      };
    case "CHECK_MOBILE":
      return { ...state, isMobile: window.innerWidth <= 430 };
    case "HIDE_DROPDOWN":
      return { ...state, activeDropdown: null }; // Hide dropdown when not needed
    default:
      return state;
  }
};

const Navbar = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const reduxDispatch = useDispatch();
  const location = useLocation();
  const cartItems = useSelector(selectCartItems);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [showSearchModal, setShowSearchModal] = useState(false); // State to control search modal visibility
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const isOrderSuccessPage = location.pathname === "/order-success";
  const isOrderPage = user && location.pathname === `/myorder/${user.id}`;

  const handleRemoveFromCart = (item) => {
    reduxDispatch(removeFromCart({ id: item.id }));
    toast.success(`Product removed from cart`);
  };

  useEffect(() => {
    const newTotalQuantity = cartItems.reduce(
      (total, item) => total + item.productVariant.quantity,
      0
    );
    setTotalQuantity(newTotalQuantity);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      reduxDispatch(updateCartdata(JSON.parse(storedCartItems)));
    }
  }, [reduxDispatch]);

  useEffect(() => {
    const checkWindowSize = () => {
      dispatch({ type: "CHECK_MOBILE" });
    };

    checkWindowSize();

    window.addEventListener("resize", checkWindowSize);

    return () => {
      window.removeEventListener("resize", checkWindowSize);
    };
  }, []);

  const { isOpen, isMobile, activeDropdown } = state;

  const handleDropdownOpen = () => {
    dispatch({ type: "TOGGLE_OPEN" });
  };

  const showModal = () => {
    setShowSearchModal(true);
  };

  const hideModal = () => {
    setShowSearchModal(false);
  };

  const toggleCartDropdown = () => {
    dispatch({ type: "TOGGLE_CART_DROPDOWN" });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const handleDropdownItemClick = () => {
    dispatch({ type: "HIDE_DROPDOWN" });
  };

  return (
    <div>
      <nav className="bg-black p-3 px-4 py-6 z-50 fixed top-0 left-0 w-full shadow-md ">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/tuantran2306/image/upload/v1717172037/logo_peurlm.png"
                alt="logo"
                className="w-20 h-10 rounded-lg"
              />
            </Link>
          </div>
          {!isMobile && (
            <div className="hidden md:flex justify-center w-full space-x-6">
              <Link
                to="/all-product"
                className="text-white hover:text-yellow-300 text-lg font-semibold"
              >
                ALL PRODUCT
              </Link>
              <Link
                to="/about"
                className="text-white hover:text-yellow-300 text-lg font-semibold"
              >
                ABOUT
              </Link>
              <Link
                to="/contact"
                className="text-white hover:text-yellow-300 text-lg font-semibold"
              >
                CONTACT
              </Link>
              {user && (
                <Link
                  to={`/myorder/${user.id}`}
                  className="text-white hover:text-yellow-300 text-lg font-semibold"
                >
                  MY ORDER
                </Link>
              )}
            </div>
          )}
          <div
            className={`flex items-center ${isMobile ? "md:hidden" : "hidden"}`}
          >
            <button
              onClick={showModal}
              className="text-white hover:text-yellow-300 focus:outline-none"
            >
              <FaSearch size={24} />
            </button>
            <div className="text-white ml-4 relative">
              <Link to="/cart">
                <FaShoppingCart size={24} onClick={toggleCartDropdown} />
                {totalQuantity > 0 && (
                  <span className="bg-yellow-300 text-red-500 rounded-full h-5 w-5 flex items-center justify-center absolute -top-3 -right-2 font-bold">
                    {totalQuantity}
                  </span>
                )}
              </Link>
            </div>
            <button
              onClick={handleDropdownOpen}
              className="text-white ml-3 focus:outline-none"
            >
              <FaBars size={24} />
            </button>
            {isOpen && activeDropdown === "main" && (
              <div className="origin-top-right absolute right-0 mt-56 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <Link
                    to="/"
                    className="block px-4 py-2 text-sm text-black hover:bg-black hover:text-white"
                  >
                    HOME
                  </Link>
                  <Link
                    to="/about"
                    className="block px-4 py-2 text-sm text-black hover:bg-black hover:text-white"
                  >
                    ABOUT
                  </Link>
                  <Link
                    to="/contact"
                    className="block px-4 py-2 text-sm text-black hover:bg-black hover:text-white"
                  >
                    CONTACT
                  </Link>

                  {user ? (
                    <>
                      <Link
                        to={`/myorder/${user.id}`}
                        className="block px-4 py-2 text-sm text-black hover:bg-black hover:text-white"
                      >
                        MY ORDER
                      </Link>
                      <Link
                        onClick={() => handleLogout()}
                        className="block px-4 py-2 text-sm text-black hover:bg-black hover:text-white"
                      >
                        LOGOUT
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-black hover:bg-black hover:text-white"
                      >
                        LOGIN
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
          <div
            className={`flex items-center ${isMobile ? "hidden" : "md:flex"}`}
          >
            <button
              onClick={showModal}
              className="text-white hover:text-yellow-300 focus:outline-none"
            >
              <FaSearch size={24} />
            </button>
            <div className="text-white ml-4 relative">
              <FaShoppingCart size={24} onClick={toggleCartDropdown} />
              {totalQuantity > 0 && (
                <span className="bg-yellow-300 text-red-500 rounded-full h-5 w-5 flex items-center justify-center absolute -top-3 -right-2 font-bold">
                  {totalQuantity}
                </span>
              )}
              {activeDropdown === "cart" && cartItems.length > 0 && (
                <div className="origin-top-right absolute right-0 mt-2 w-96 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-4 px-4 font-semibold text-gray-800">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between mb-4"
                      >
                        <div>
                          {item.Product.name} x {item.productVariant.quantity}
                        </div>
                        <img
                          src={JSON.parse(item.Product.Image.URL)[0]}
                          alt="product"
                          className="w-8 h-8 rounded"
                        />
                        <button
                          onClick={() => handleRemoveFromCart(item)}
                          className="text-red-500 hover:text-red-900"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between px-4 pb-4">
                    <Link
                      to="/cart"
                      onClick={handleDropdownItemClick}
                      className="bg-black text-white px-4 py-2 rounded-lg hover:bg-yellow-500 hover:text-red-500 transition duration-300"
                    >
                      Go to Cart
                    </Link>
                    {user ? (
                      <Link
                        to="/checkout"
                        onClick={handleDropdownItemClick}
                        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-yellow-500 hover:text-red-500 transition duration-300"
                      >
                        Checkout
                      </Link>
                    ) : (
                      <Link
                        to="/login"
                        onClick={handleDropdownItemClick}
                        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-yellow-500 hover:text-red-500 transition duration-300"
                      >
                        Login to checkout
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="ml-3 relative">
              <button
                onClick={() => dispatch({ type: "TOGGLE_MOBILE_DROPDOWN" })}
                className="text-white flex space-x-2 hover:text-yellow-300 focus:outline-none"
              >
                <FaUser size={24} />{" "}
                {user && !isOrderSuccessPage && !isOrderPage && (
                  <p>{user.username.slice(0, 4)}</p>
                )}
              </button>
              {activeDropdown === "mobile" && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1  ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    {user ? (
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-black hover:bg-black hover:text-white"
                      >
                        Logout
                      </button>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          onClick={handleDropdownItemClick}
                          className="block px-4 py-2 text-sm text-black hover:bg-black hover:text-white"
                        >
                          Login
                        </Link>
                        <Link
                          to="/register"
                          onClick={handleDropdownItemClick}
                          className="block px-4 py-2 text-sm text-black hover:bg-black hover:text-white"
                        >
                          Register
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      {showSearchModal && (
        <SearchShop
          close={hideModal}
          className="transition-opacity duration-300"
        />
      )}
    </div>
  );
};

export default Navbar;
