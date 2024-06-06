import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchBrand } from "../../redux/slices/filterReducer";

const Category = () => {
  const brands = useSelector((state) => state.filter.brands);
  const dispatch = useDispatch();
  const [visibleBrands, setVisibleBrands] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    dispatch(fetchBrand());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setVisibleBrands(brands.slice(0, visibleCount));
    // eslint-disable-next-line
  }, [brands, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount(visibleCount + 3); // Tăng số lượng hiển thị thêm lên 3
  };

  const handleShowLess = () => {
    setVisibleCount(visibleCount - 3); // Giảm số lượng hiển thị đi 3
  };

  return (
    <div className="container mx-auto px-4">
      <div className="py-16">
        <h2 className="text-3xl font-semibold text-gray-800 uppercase mb-8">
          Shop by Brand
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {visibleBrands.map((item, index) => (
            <div
              key={index}
              className="relative rounded-sm overflow-hidden group transition duration-500 ease-in-out transform hover:scale-105"
            >
              <img
                src={item.URL}
                alt={`category ${index}`}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
        {(visibleCount < brands.length || visibleCount > 3) && (
          <div className="flex justify-center mt-4">
            {visibleCount < brands.length && (
              <button
                onClick={handleLoadMore}
                className="bg-gray-200 w-48 mt-4 font-semibold text-lg hover:bg-gray-300 px-4 py-2 rounded-xl"
              >
                See more
              </button>
            )}
            {visibleCount > 3 && (
              <button
                onClick={handleShowLess}
                className="bg-gray-200 w-48 mt-4 font-semibold text-lg hover:bg-gray-300 px-4 py-2 rounded-xl"
                disabled={visibleCount <= 3}
              >
                Hide more
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
