import React, { useEffect, useState } from "react";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  selectSelectedProduct,
  setSelectedProduct, // Import action từ slice của bạn
} from "../../redux/slices/ productSlice";
import { useSelector, useDispatch } from "react-redux";
import { getByName } from "../../redux/slices/relatedProduct";
import { addToCart, updateCart,selectCartItems } from "../../redux/slices/cartSlice";
import toast from "react-hot-toast";

const Description = (props) => {
  const [initialized, setInitialized] = useState(false);
  const cartItems = useSelector(selectCartItems);
  const data = useSelector(selectSelectedProduct);
  const dispatch = useDispatch(); // Lấy hàm dispatch từ Redux store
  const dataProductName = useSelector(
    (state) => state.dataRelated.dataProductName
  ); // Lấy trạng thái từ store

  const handleAddToCart = (data) => {
    // Kiểm tra xem số lượng sản phẩm đã có trong giỏ hàng
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === data.id
    );

    // Nếu sản phẩm đã có trong giỏ hàng
    if (existingItemIndex !== -1) {
      // Tạo một bản sao của sản phẩm đã có trong giỏ hàng
      const existingItem = { ...cartItems[existingItemIndex] };
      // Tính tổng số lượng sản phẩm sau khi thêm vào giỏ hàng
      const totalQuantity =
        existingItem.productVariant.quantity + 1;
      // Kiểm tra số lượng sản phẩm mới và số lượng hiện có
      if (totalQuantity > data.productVariant.quantity) {
        // Nếu số lượng mới vượt quá số lượng hiện có, thông báo và không thêm vào giỏ hàng
        toast.error(
          `The quantity has exceeded the limit product ${data.Product.name}: ${data.productVariant.quantity}`
        );
        return;
      }
      // Tạo một bản sao của đối tượng sản phẩm
      const updatedProductVariant = { ...existingItem.productVariant };
      // Tăng số lượng sản phẩm lên 1
      updatedProductVariant.quantity += 1;
      // Cập nhật lại đối tượng sản phẩm trong sản phẩm đã có trong giỏ hàng
      const updatedItem = { ...existingItem, productVariant: updatedProductVariant };
      // Cập nhật sản phẩm trong giỏ hàng với sản phẩm đã được cập nhật số lượng
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex] = updatedItem;
      // Cập nhật giỏ hàng trong Redux
      dispatch(updateCart(updatedCartItems));
      toast.success(`Product ${data.Product.name} added cart`);
    } else {
      // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới vào giỏ hàng với số lượng là 1
      const newItem = { ...data, productVariant: { ...data.productVariant, quantity: 1 } };
      dispatch(addToCart(newItem));
      toast.success(`Product ${data.Product.name} added cart`);
    }
  };

  // Khôi phục dữ liệu từ localStorage khi component được render lại sau khi reload trang
  useEffect(() => {
    if (!initialized) {
      const storedProduct = localStorage.getItem("selectedProductDrawer");
      const related = localStorage.getItem("selectedProductDrawer");
      if (related) {
        dispatch(getByName(JSON.parse(related)));
      }
      if (storedProduct) {
        dispatch(setSelectedProduct(JSON.parse(storedProduct)));
      }
      setInitialized(true);
    }
    // eslint-disable-next-line
  }, [initialized]);


  useEffect(() => {
    JSON.parse(localStorage.getItem("selectedProductDrawer"));
    dispatch(getByName(props.detailId));

    // eslint-disable-next-line
  }, [dispatch, props.detailId]);

  const handleProductSelect = (item) => {
    localStorage.setItem("selectedProductDrawer", JSON.stringify(item));
    window.location.reload();
  };

  if (!data || !getByName) {
    return <div>Loading...</div>;
  }

  let message;
switch (data.Product.category) {
  case "Male":
    message = "Nam";
    break;
  case "Female":
    message = "Nữ";
    break;
  case "All":
    message = "Nam và nữ";
    break;
  default:
    message = "Danh mục không xác định";
}

  return (
    <div>
      <div className="border-b sm:mx-auto border-gray-200 pb-2 pt-12 ">
        <div className="mx-auto text-center items-center justify-center">
          <h2 className="text-3xl font-medium uppercase mb-2 items-center justify-center">
            {data.Product.name}
          </h2>
          <div className="">
            <div className="flex justify-center text-yellow-400">
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
              <div className="text-xs text-gray-500 ml-3">(150 Reviews)</div>
            </div>
          </div>
          <div className="space-y-2 mt-4">
            <p className="text-gray-800 font-semibold space-x-2">
              <span>Availability: </span>
              <span className="text-green-600">{data.Product.status}</span>
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">
                Brand:{data.Product.Brand.name}{" "}
              </span>
              <span className="text-gray-600"></span>
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">Dành cho: </span>
              <span className="text-gray-600">{message}</span>
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">Dành cho đối tượng: </span>
              <span className="text-gray-600">
                {data.productVariant.Size.description}
              </span>
            </p>
          </div>
          <div className="flex justify-center mb-1 space-x-2 font-roboto mt-4">
            <p className="text-xl text-primary font-semibold">
              ${data.Product.price}
            </p>
            <p className="text-base text-gray-400 line-through">$55.00</p>
          </div>

          <div className="flex justify-center text-center items-center gap-2 mt-4">
            <h3 className="text-sm text-gray-800 uppercase mb-1">Size:</h3>
            {dataProductName.length ===0 ?(
              <div>Product only Size</div>
            ):(
              React.Children.toArray(
                dataProductName.map((item) => (
                  <div
                    onClick={() => handleProductSelect(item)}
                    className="flex justify-center text-center items-center gap-2"
                  >
                    <div className="size-selector">
                      <Link to={{ pathname: `/product/${item.id}` }}>
                        <input
                          type="radio"
                          name="size"
                          id="size-xs"
                          className="hidden"
                        />
                        <label
                          htmlFor="size-xs"
                          className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                        >
                          {item.productVariant.Size.size}
                        </label>
                      </Link>
                    </div>
                  </div>
              ))
            )
          )}
          </div>
          <div className="mt-4">
            <h3 className="text-sm text-gray-800 uppercase mb-1">
              Quantity: {data.productVariant.quantity}
            </h3>
          </div>
        </div>

        <div className="flex border-b sm:mx-auto border-gray-200 pb-2 pt-2">
          <h3 className="border-gray-200 font-roboto text-gray-800 pb-3 font-medium">
            Chi tiết:
          </h3>
          <div className="w-3/4 pt-6">
            <div className="text-gray-600">
              <p>{data.Product.description}</p>
            </div>

            <table className="table-auto border-collapse w-full text-left text-gray-600 text-sm mt-6">
              <tbody>
                <tr>
                  <th className="py-2 px-4 border border-gray-300 w-40 font-medium">
                    Color
                  </th>
                  <th className="py-2 px-4 border border-gray-300">
                    {data.productVariant.Color.color}
                  </th>
                </tr>
                <tr>
                  <th className="py-2 px-4 border border-gray-300 w-40 font-medium">
                    Brand
                  </th>
                  <th className="py-2 px-4 border border-gray-300">
                    {data.Product.Brand.name}
                  </th>
                </tr>
                <tr>
                  <th className="py-2 px-4 border border-gray-300 w-40 font-medium">
                    Size
                  </th>
                  <th className="py-2 px-4 border border-gray-300">
                    {data.productVariant.Size.size}
                  </th>
                </tr>
                <tr>
                  <th className="py-2 px-4 border border-gray-300 w-40 font-medium">
                    Size details
                  </th>
                  <th className="py-2 px-4 border border-gray-300">
                    {data.productVariant.Size.description}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-3 sm:mx-auto pb-5 pt-5">
          <div onClick={() => handleAddToCart(data)} className="bg-black text-white px-8 py-2 font-medium rounded-full uppercase flex items-center gap-2 hover:bg-yellow-500 hover:text-red-500 transition duration-300 ease-in-out transform hover:scale-120">
            <FaShoppingCart /> Add to cart
          </div>
          <div className="bg-black text-white px-8 py-2 font-medium rounded-full uppercase flex items-center gap-2 hover:bg-yellow-500 hover:text-red-500 transition duration-300 ease-in-out transform hover:scale-120">
            <FaHeart /> Wishlist
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
