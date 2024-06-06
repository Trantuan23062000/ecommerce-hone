import React, { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBrand,
  fetchSize,
  fetchColor,
  setSelectedBrand,
  setSelectedCategory,
  setSelectedColor,
  setSelectedMaxPrice,
  setSelectedMinPrice,
  setSelectedSize,
} from "../../redux/slices/filterReducer";
import PriceFilter from "./PriceFilter";
import CategoryCheckbox from "./CategoryCheckbox";
import { fetchFilterData } from "../../redux/slices/ productSlice";
import BrandCheckbox from "./BrandCheckbox";

const ShowFilter = (props) => {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.filter.brands) || [];
  const sizes = useSelector((state) => state.filter.sizes) || [];
  const colors = useSelector((state) => state.filter.colors) || [];
  const originalData = useSelector((state) => state.products.data) || [];

  const [tempSelectedBrandId, setTempSelectedBrandId] = useState(null);
  const [tempSelectedSizeId, setTempSelectedSizeId] = useState(null);
  const [tempSelectedColorId, setTempSelectedColorId] = useState(null);
  const [tempSelectedCategory, setTempSelectedCategory] = useState(null);
  const [tempSelectedMinPrice, setTempSelectedMinPrice] = useState(null);
  const [tempSelectedMaxPrice, setTempSelectedMaxPrice] = useState(null);

  useEffect(() => {
    dispatch(fetchBrand());
    dispatch(fetchSize());
    dispatch(fetchColor());
  }, [dispatch]);

  useEffect(() => {
    const filterData = getFilterData();
    if (originalData.length > 0) {
      dispatch(fetchFilterData(filterData));
    }
    // eslint-disable-next-line
  }, [dispatch, originalData.length]);

  const getFilterData = () => {
    const filterData = {};

    if (tempSelectedSizeId) filterData.sizeId = tempSelectedSizeId;
    if (tempSelectedColorId) filterData.colorId = tempSelectedColorId;
    if (tempSelectedCategory) filterData.category = tempSelectedCategory;
    if (tempSelectedBrandId) filterData.brandId = tempSelectedBrandId;
    if (tempSelectedMinPrice && tempSelectedMaxPrice) {
      filterData.minPrice = tempSelectedMinPrice;
      filterData.maxPrice = tempSelectedMaxPrice;
    }

    return filterData;
  };

  const handleFilter = () => {
    const filterData = getFilterData();
    dispatch(fetchFilterData(filterData));
    if (originalData.length === 0) return;

    dispatch(setSelectedBrand(tempSelectedBrandId));
    dispatch(setSelectedSize(tempSelectedSizeId));
    dispatch(setSelectedColor(tempSelectedColorId));
    dispatch(setSelectedCategory(tempSelectedCategory));
    dispatch(setSelectedMinPrice(tempSelectedMinPrice));
    dispatch(setSelectedMaxPrice(tempSelectedMaxPrice));
    props.close();
  };

  const handleChangePrice = (minPrice, maxPrice) => {
    setTempSelectedMinPrice(minPrice);
    setTempSelectedMaxPrice(maxPrice);
  };

  const handleClear = () => {
    setTempSelectedBrandId(null);
    setTempSelectedSizeId(null);
    setTempSelectedColorId(null);
    setTempSelectedCategory(null);
    setTempSelectedMinPrice(null);
    setTempSelectedMaxPrice(null);
  };

  const handleRemoveTag = (tagContent) => {
    switch (tagContent.split(":")[0]) {
      case "Category":
        setTempSelectedCategory(null);
        break;
      case "Price":
        setTempSelectedMinPrice(null);
        setTempSelectedMaxPrice(null);
        break;
      case "Brand":
        setTempSelectedBrandId(null);
        break;
      case "Size":
        setTempSelectedSizeId(null);
        break;
      case "Color":
        setTempSelectedColorId(null);
        break;
      default:
        break;
    }
  };

  const renderSelectedTags = () => {
    if (originalData.length === 0) {
      return (
        <span className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded mr-1">
          No data filter
        </span>
      );
    }

    const tags = [];

    if (tempSelectedCategory) tags.push(`Category: ${tempSelectedCategory}`);
    if (tempSelectedMinPrice && tempSelectedMaxPrice) {
      tags.push(`Price: ${tempSelectedMinPrice} - ${tempSelectedMaxPrice}$`);
    }
    if (tempSelectedBrandId) {
      const brand = brands.find((brand) => brand.id === tempSelectedBrandId);
      tags.push(`Brand: ${brand?.name}`);
    }
    if (tempSelectedSizeId) {
      const size = sizes.find((size) => size.id === tempSelectedSizeId);
      tags.push(`Size: ${size?.size}`);
    }
    if (tempSelectedColorId) {
      const color = colors.find((color) => color.id === tempSelectedColorId);
      tags.push(`Color: ${color?.color}`);
    }

    return tags.map((tag, index) => (
      <span
        key={index}
        className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded mr-1"
      >
        {tag}
        <button
          onClick={() => handleRemoveTag(tag)}
          className="ml-1 text-red-600"
        >
          &times;
        </button>
      </span>
    ));
  };

  return (
    <div className="fixed inset-0 p-1 flex justify-center items-center z-50 bg-gray-900 bg-opacity-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">Filter</h3>
        <button
          onClick={props.close}
          className="text-gray-800 hover:text-red-500 transition duration-200"
        >
          <CgClose size={24} />
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        <div>
          <h4 className="text-lg font-medium text-gray-700 mb-3">
            Selected Tags
          </h4>
          <div className="p-6 border border-gray-300 rounded-lg bg-gray-50">
            {renderSelectedTags()}
          </div>
        </div>
        <div>
          <h4 className="text-lg font-medium text-gray-700 mb-3">Categories</h4>
          <div className="space-y-2">
            <CategoryCheckbox
              id="Male"
              label="Male"
              checked={tempSelectedCategory === "Male"}
              onChange={() => setTempSelectedCategory("Male")}
            />
            <CategoryCheckbox
              id="Female"
              label="Female"
              checked={tempSelectedCategory === "Female"}
              onChange={() => setTempSelectedCategory("Female")}
            />
            <CategoryCheckbox
              id="All"
              label="All"
              checked={tempSelectedCategory === "All"}
              onChange={() => setTempSelectedCategory("All")}
            />
          </div>
        </div>
        <div>
          <h4 className="text-lg font-medium text-gray-700 mb-3">Price</h4>
          <div className="space-y-2">
            <PriceFilter
              id="<100"
              label="0-99$"
              checked={
                tempSelectedMinPrice === "0" && tempSelectedMaxPrice === "99"
              }
              onChange={() => handleChangePrice("0", "99")}
            />
            <PriceFilter
              id="99-299"
              label="99-299$"
              checked={
                tempSelectedMinPrice === "99" &&
                tempSelectedMaxPrice === "299"
              }
              onChange={() => {
                setTempSelectedMinPrice("99");
                setTempSelectedMaxPrice("299");
              }}
            />
            <PriceFilter
              id="299-499"
              label="299-499$"
              checked={
                tempSelectedMinPrice === "299" &&
                tempSelectedMaxPrice === "499"
              }
              onChange={() => {
                setTempSelectedMinPrice("299");
                setTempSelectedMaxPrice("499");
              }}
            />
            <PriceFilter
              id="500-900"
              label="499-899$"
              checked={
                tempSelectedMinPrice === "499" &&
                tempSelectedMaxPrice === "899"
              }
              onChange={() => {
                setTempSelectedMinPrice("499");
                setTempSelectedMaxPrice("899");
              }}
            />
            <PriceFilter
              id="899-1099"
              label="899-1099$"
              checked={
                tempSelectedMinPrice === "899" &&
                tempSelectedMaxPrice === "1099"
              }
              onChange={() => {
                setTempSelectedMinPrice("899");
                setTempSelectedMaxPrice("1099");
              }}
            />
          </div>
        </div>
        <div>
          <h4 className="text-lg font-medium text-gray-700 mb-3">Brand</h4>
          <div className="space-y-2">
            {brands.map((item) => (
              <BrandCheckbox
                key={item.id}
                id={item.id}
                className="hidden"
                label={item.name}
                checked={tempSelectedBrandId === item.id}
                onChange={() => setTempSelectedBrandId(item.id)}
              />
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-lg font-medium text-gray-700 mb-3">Size</h4>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <label key={size.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`size-${size.id}`}
                  className="hidden"
                  checked={tempSelectedSizeId === size.id}
                  onChange={() => setTempSelectedSizeId(size.id)}
                />
                <label
                  htmlFor={`size-${size.id}`}
                  className={`text-xs border border-gray-200 rounded-sm flex items-center justify-center cursor-pointer shadow-sm text-gray-600 h-8 w-8 ${
                    tempSelectedSizeId === size.id ? "bg-gray-300" : ""
                  }`}
                >
                  {size.size}
                </label>
              </label>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-lg font-medium text-gray-700 mb-3">Color</h4>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <label key={color.id} className="relative">
                <input
                  type="radio"
                  name="color"
                  id={color.id}
                  className="hidden"
                  checked={tempSelectedColorId === color.id}
                  onChange={() => setTempSelectedColorId(color.id)}
                />
                <span
                  className={`block w-5 h-5 border border-gray-300 rounded-full cursor-pointer ${
                    tempSelectedColorId === color.id ? "border-black" : ""
                  }`}
                  style={{ backgroundColor: `${color.codeColor}` }}
                ></span>
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end space-x-4">
        <button
          onClick={handleClear}
          className="text-gray-700 bg-white border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100 transition duration-200"
        >
          Clear
        </button>
        <button
          onClick={handleFilter}
          className="text-white bg-black rounded-md px-4 py-2 hover:bg-gray-800 transition duration-200"
        >
          Apply Filters
        </button>
      </div>
    </div>
  </div>

  );
};

export default ShowFilter;
