import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrand, fetchColor, fetchSize ,setSelectedBrand,setSelectedCategory,setSelectedColor,setSelectedMaxPrice,setSelectedMinPrice,setSelectedSize } from '../../redux/slices/filterReducer';
import { fetchFilterData, setKeyFilter, resetClearFiltersFlag } from '../../redux/slices/ productSlice';
import CategoryCheckbox from './CategoryCheckbox';
import BrandCheckbox from './BrandCheckbox';
import PriceFilter from './PriceFilter';

const Filter = () => {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.filter.brands) || [];
  const sizes = useSelector((state) => state.filter.sizes) || [];
  const colors = useSelector((state) => state.filter.colors) || [];
  const clearFilters = useSelector((state) => state.products.clearFilters); // Get the clearFilters flag from the state
  const selectedBrand = useSelector((state) => state.filter.selectedBrand);
  const selectedSize = useSelector((state) => state.filter.selectedSize);
  const selectedColor = useSelector((state) => state.filter.selectedColor);
  const selectedCategory = useSelector((state) => state.filter.selectedCategory);
  const selectedMinPrice = useSelector((state) => state.filter.selectedMinPrice);
  const selectedMaxPrice = useSelector((state) => state.filter.selectedMaxPrice);

  useEffect(() => {
    dispatch(fetchBrand());
    dispatch(fetchColor());
    dispatch(fetchSize());
  }, [dispatch]);

  useEffect(() => {
    handleFilter();
    // eslint-disable-next-line 
  }, [
    selectedBrand, selectedSize, selectedColor, selectedCategory, selectedMinPrice, selectedMaxPrice
  ]);

  useEffect(() => {
    if (clearFilters) {
      handleClear();
      dispatch(resetClearFiltersFlag());  // Reset the clearFilters flag
    }
    // eslint-disable-next-line 
  }, [clearFilters, dispatch]);

  const handleFilter = () => {
    const filterData = {
      brandId: selectedBrand?.id,
      sizeId: selectedSize?.id,
      colorId: selectedColor?.id,
      category: selectedCategory,
      minPrice: selectedMinPrice,
      maxPrice: selectedMaxPrice,
    };

    dispatch(setKeyFilter(filterData));
    dispatch(fetchFilterData(filterData));
  };

  const handleChangeBrand = (brand) => {
    dispatch(setSelectedBrand(brand));
  };
  

  const handleChangeSize = (size) => {
    dispatch(setSelectedSize(size));
  };

  const handleChangeColor = (color) => {
    dispatch(setSelectedColor(color));
  };

  const handleChangeCategory = (category) => {
   dispatch(setSelectedCategory(category));
  };

  const handleChangePrice = (minPrice, maxPrice) => {
    dispatch(setSelectedMinPrice(minPrice))
    dispatch(setSelectedMaxPrice(maxPrice));
  };

  const handleClear = () => {
    dispatch(setSelectedBrand(null))
    dispatch(setSelectedSize(null))
    dispatch(setSelectedColor(null))
    dispatch(setSelectedCategory(null))
    dispatch(setSelectedMinPrice(null))
    dispatch(setSelectedMaxPrice(null))
  };

  return (
    <div className="filter-container">
      <div className="text-center">
        <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hiddenb hidden md:block">
          <div className="divide-y divide-gray-200 space-y-10">
            <div>
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Categories
              </h3>
              <div className="space-y-2">
                <CategoryCheckbox
                  id="Male"
                  label="Male"
                  checked={selectedCategory === "Male"}
                  onChange={() => handleChangeCategory("Male")}
                />
                <CategoryCheckbox
                  id="Female"
                  label="Female"
                  checked={selectedCategory === "Female"}
                  onChange={() => handleChangeCategory("Female")}
                />
                <CategoryCheckbox
                  id="All"
                  label="Both men and women"
                  checked={selectedCategory === "All"}
                  onChange={() => handleChangeCategory("All")}
                />
              </div>
            </div>
            <div>
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Price
              </h3>
              <div className="space-y-2">
                <PriceFilter
                  id="<100"
                  label="0-99$"
                  checked={selectedMinPrice === "0" && selectedMaxPrice === "99"}
                  onChange={() => handleChangePrice("0", "99")}
                />
                <PriceFilter
                  id="99-299"
                  label="99-299$"
                  checked={selectedMinPrice === "99" && selectedMaxPrice === "299"}
                  onChange={() => handleChangePrice("99", "299")}
                />
                <PriceFilter
                  id="299-499"
                  label="299-499$"
                  checked={selectedMinPrice === "299" && selectedMaxPrice === "499"}
                  onChange={() => handleChangePrice("299", "499")}
                />
                <PriceFilter
                  id="500-900"
                  label="499-899$"
                  checked={selectedMinPrice === "499" && selectedMaxPrice === "899"}
                  onChange={() => handleChangePrice("499", "899")}
                />
                <PriceFilter
                  id="899-1099"
                  label="899-1099$"
                  checked={selectedMinPrice === "899" && selectedMaxPrice === "1099"}
                  onChange={() => handleChangePrice("899", "1099")}
                />
              </div>
            </div>
            <div className="pt-4">
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Brands
              </h3>
              <div className="space-y-2">
                {brands.map((item) => (
                  <BrandCheckbox
                    key={item.id}
                    id={item.id}
                    label={item.name}
                    checked={selectedBrand?.id === item.id || false}
                    onChange={() => handleChangeBrand(item)}
                  />
                ))}
              </div>
            </div>
            <div className="pt-4">
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Sizes
              </h3>
              <div className="grid grid-cols-5 md:grid-cols-5 gap-2 justify-center items-center">
                {sizes.map((item) => (
                  <div key={item.id} className="size-selector">
                    <input
                      type="checkbox"
                      id={`size-${item.id}`}
                      className="text-primary focus:ring-0 rounded-sm cursor-pointer sr-only"
                      checked={selectedSize?.id === item.id || false}
                      onChange={() => handleChangeSize(item)}
                    />
                    <label
                      htmlFor={`size-${item.id}`}
                      className="text-sm border border-gray-200 rounded-sm flex items-center justify-center cursor-pointer shadow-sm text-gray-600 h-10 w-10"
                    >
                      {item.size}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-4">
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Colors
              </h3>
              <div className="grid grid-cols-5 md:grid-cols-5 gap-2 justify-center items-center">
                {colors.map((item) => (
                  <div key={item.id} className="color-selector">
                    <input
                      type="checkbox"
                      id={`color-${item.id}`}
                      className="text-blue-500 focus:ring-0 rounded-sm cursor-pointer sr-only"
                      checked={selectedColor?.id === item.id || false}
                      onChange={() => handleChangeColor(item)}
                    />
                    <label
                      htmlFor={`color-${item.id}`}
                      className="border border-gray-200 rounded-full flex items-center justify-center cursor-pointer shadow-sm h-10 w-10"
                      style={{ backgroundColor: item.codeColor }}
                    ></label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
