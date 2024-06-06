import React, { useEffect, useState } from "react";
import {
  setCurrentPage,
  setSelectedProduct,
  fetchData,
  setTotalPages,
} from "../../redux/slices/ productSlice";
import { useDispatch, useSelector } from "react-redux";
import { CgHeart, CgSearch, CgShoppingCart } from "react-icons/cg";
import {
  addToCart,
  updateCart,
  updateCartdata,
  selectCartItems,
} from "../../redux/slices/cartSlice";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Arrival = () => {
  const dispatch = useDispatch();
  const originalData = useSelector((state) => state.products.data) || [];
  const totalPages = useSelector((state) => state.products.totalPages);
  const currentPage = useSelector((state) => state.products.currentPage);
  const currentLimit = useSelector((state) => state.products.currentLimit);
  const cartItems = useSelector(selectCartItems);
  const [initialized, setInitialized] = useState(false);
  const [visibleItemCount, setVisibleItemCount] = useState(6);

  const handleAddToCart = (item) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      const existingItem = { ...cartItems[existingItemIndex] };
      const totalQuantity = existingItem.productVariant.quantity + 1;
      if (totalQuantity > item.productVariant.quantity) {
        toast.error(
          `The quantity has exceeded the limit product ${item.Product.name}: ${item.productVariant.quantity}`
        );
        return;
      }
      const updatedProductVariant = { ...existingItem.productVariant };
      updatedProductVariant.quantity += 1;
      const updatedItem = {
        ...existingItem,
        productVariant: updatedProductVariant,
      };
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex] = updatedItem;
      dispatch(updateCart(updatedCartItems));
      toast.success(`Product ${item.Product.name} added to cart`);
    } else {
      const newItem = {
        ...item,
        productVariant: { ...item.productVariant, quantity: 1 },
      };
      dispatch(addToCart(newItem));
      toast.success(`Product ${item.Product.name} added to cart`);
    }
  };

  const handleProductSelect = (item) => {
    dispatch(setSelectedProduct(item));
    localStorage.setItem("selectedProductDrawer", JSON.stringify(item));
  };

  useEffect(() => {
    dispatch(setTotalPages(totalPages));
    dispatch(setCurrentPage(currentPage));
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [totalPages, currentPage, cartItems, dispatch]);

  useEffect(() => {
    if (!initialized) {
      const storedCartItems = localStorage.getItem("cartItems");
      if (storedCartItems) {
        dispatch(updateCartdata(JSON.parse(storedCartItems)));
      }
      setInitialized(true);
    }
  }, [initialized, dispatch]);

  useEffect(() => {
    if (originalData.length === 0) {
      dispatch(fetchData({ currentPage, currentLimit }));
    }
  }, [currentPage, currentLimit, originalData.length, dispatch]);

  const paginatedData = originalData.slice(0, visibleItemCount);

  const handleLoadMore = () => {
    if (visibleItemCount >= originalData.length) {
      setVisibleItemCount(6); // Reset lại số lượng sản phẩm hiển thị ban đầu
    } else {
      setVisibleItemCount(visibleItemCount + 6); // Tăng số lượng sản phẩm hiển thị
    }
  };

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="flex justify-between">
          <h2 className="text-2xl text-gray-800 uppercase mb-6 font-semibold">
            Product By Shop
          </h2>
          <button className="bg-gray-200 font-semibold text-lg w-32 hover:bg-gray-300 px-4 py-2 rounded-xl">
            <Link to="/all-product">See All</Link>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-6 pt-4 pb-6">
          <div className="col-span-3 sm:grid-cols-2 gap-6 ">
            <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
              {paginatedData.map((item) => (
                <div
                  key={item.id}
                  className="bg-white shadow rounded-lg overflow-hidden group"
                >
                  <div className="relative">
                    {item.Product &&
                    item.Product.Image &&
                    item.Product.Image.URL ? (
                      <img
                        src={JSON.parse(item.Product.Image.URL)[0]}
                        alt="product 1"
                        className="w-full h-64 object-cover"
                      />
                    ) : null}

                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                      <div
                        onClick={() => handleAddToCart(item)}
                        className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0"
                      >
                        <CgShoppingCart />
                      </div>
                      <div className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0">
                        <CgHeart />
                      </div>
                      <div
                        onClick={() => handleProductSelect(item)}
                        className="text-white bg-black hover:text-red-600 text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-yellow-300 transition transform translate-y-2 group-hover:translate-y-0"
                      >
                        <Link to={{ pathname: `/product/${item.id}` }}>
                          <CgSearch />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 pb-3 px-4">
                    <div className="flex space-x-2">
                      <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                        {item.Product?.name}
                      </h4>
                      {item.productVariant?.Color?.codeColor && (
                        <label
                          htmlFor={`color-${item.id}`}
                          className="border border-gray-200 rounded-lg h-6 w-6 cursor-pointer shadow-sm block"
                          style={{
                            backgroundColor: `${item.productVariant.Color.codeColor}`,
                          }}
                        ></label>
                      )}
                    </div>
                    <div className="flex items-baseline mb-1 space-x-2">
                      {item.Product.sale ? (
                        <>
                          <p className="text-xl text-gray-500  font-semibold">
                            {(
                              item.Product.price -
                              (item.Product.price * item.Product.sale) / 100
                            ).toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })}
                          </p>
                          <p className="text-sm text-gray-400 line-through">
                            {item.Product.price.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })}
                          </p>
                          <p className="text-sm bg-red-500 text-white rounded p-1">
                            {item.Product.sale}%
                          </p>
                          <p className="text-sm font-bold text-red-500">
                            Quantity: {item.productVariant.quantity}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-xl text-gray-500 font-semibold">
                            {item.Product.price.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })}
                          </p>
                          <p className="text-sm font-bold text-red-500">
                            Quantity: {item.productVariant.quantity}
                          </p>
                        </>
                      )}
                    </div>
                    <div className="flex items-center">
                      <div className="flex gap-1 text-sm text-yellow-400">
                        <span>
                          <FaStar />
                        </span>
                        <span>
                          <FaStar />
                        </span>
                        <span>
                          <FaStar />
                        </span>
                        <span>
                          <FaStar />
                        </span>
                        <span>
                          <FaStar />
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 ml-3">(150)</div>
                    </div>
                  </div>
                  <div
                    onClick={() => handleAddToCart(item)}
                    className="block w-full py-1 rounded-b-lg text-center text-yellow-300 hover:text-red-500 font-bold bg-black border transition"
                  >
                    Add to cart
                  </div>
                </div>
              ))}
            </div>
            {originalData.length > 6 && (
              <div className="flex justify-center mt-4">
                <button
                  className="bg-gray-200 w-48 font-semibold text-lg hover:bg-gray-300 px-4 py-2 rounded-xl"
                  onClick={handleLoadMore}
                >
                  {visibleItemCount >= originalData.length
                    ? "Hide"
                    : "See more"}
                </button>
              </div>
            )}
          </div>
         
        </div>
      
      </div>
    </>
  );
};

export default Arrival;
