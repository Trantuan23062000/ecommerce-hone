import React, { useEffect, useState, useRef } from "react";
import { CgHeart, CgSearch, CgShoppingCart } from "react-icons/cg";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchRelated } from "../../redux/slices/relatedProduct";
import toast from "react-hot-toast";
import { addToCart, updateCart, selectCartItems } from "../../redux/slices/cartSlice";

const RelatedProduct = () => {
  const [initialized, setInitialized] = useState(false);
  const dispatch = useDispatch();
  const { dataRelated } = useSelector((state) => state.dataRelated);
  const cartItems = useSelector(selectCartItems);
  const scrollRef = useRef(null);

  const handleAddToCart = (item) => {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);
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
      const updatedItem = { ...existingItem, productVariant: updatedProductVariant };
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex] = updatedItem;
      dispatch(updateCart(updatedCartItems));
      toast.success(`Product ${item.Product.name} added cart`);
    } else {
      const newItem = { ...item, productVariant: { ...item.productVariant, quantity: 1 } };
      dispatch(addToCart(newItem));
      toast.success(`Product ${item.Product.name} added cart`);
    }
  };

  const handleProductSelect = (item) => {
    localStorage.setItem("selectedProductDrawer", JSON.stringify(item));
    window.location.reload();
  };

  const handleScrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -250, // Điều chỉnh giá trị này để thay đổi khoảng cách cuộn
      behavior: "smooth",
    });
  };

  const handleScrollRight = () => {
    scrollRef.current.scrollBy({
      left: 250, // Điều chỉnh giá trị này để thay đổi khoảng cách cuộn
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const selectedProductDrawer = JSON.parse(localStorage.getItem("selectedProductDrawer"));
    const detailId = selectedProductDrawer?.id;
    dispatch(fetchRelated(detailId));
  }, [dispatch]);

  useEffect(() => {
    if (!initialized) {
      const related = localStorage.getItem("selectedProductDrawer");
      if (related) {
        dispatch(fetchRelated(JSON.parse(related)));
      }
      setInitialized(true);
    }
  }, [initialized, dispatch]);

  if (!dataRelated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container pb-16 relative">
      <h2 className="text-2xl font-bold text-gray-800 uppercase mb-6">
        Related products
      </h2>
      <div className="flex items-center">
        <button
          onClick={handleScrollLeft}
          className="absolute left-0 z-10 p-2 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-700"
        >
          &lt;
        </button>
        <div ref={scrollRef} className="overflow-x-auto whitespace-nowrap flex-1">
          <div className="inline-flex space-x-6">
            {dataRelated.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow rounded-lg overflow-hidden group min-w-[250px]"
              >
                <div className="relative">
                  {item.Product && item.Product.Image && item.Product.Image.URL ? (
                    <Link to={{ pathname: `/product/${item.id}` }}>
                      <img
                        src={JSON.parse(item.Product.Image.URL)[0]}
                        alt="product"
                        className="w-full h-64 object-cover"
                      />
                    </Link>
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
                        <p className="text-xl text-gray-500 font-semibold">
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
        </div>
        <button
          onClick={handleScrollRight}
          className="absolute right-0 z-10 p-2 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-700"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default RelatedProduct;
