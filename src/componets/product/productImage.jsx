import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectSelectedProduct,
} from "../../redux/slices/ productSlice";

const ProductImage = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const selectedProduct = useSelector(selectSelectedProduct);

  const handleImageSelect = (index) => {
    setSelectedImageIndex(index);
  };

  if (!selectedProduct || !selectedProduct.Product) {
    return <div>Loading...</div>;
  }

  const imageUrls = JSON.parse(selectedProduct.Product.Image.URL);
  const mainImageUrl = imageUrls[selectedImageIndex];
  const secondToFourthImageURLs = imageUrls.slice(1, 4);

  return (
    <div>
      <img
        src={mainImageUrl}
        alt="product"
        style={{ width: "800px", height: "600px" }}
        className="w-full duration-300 ease-in-out transform hover:scale-105"
      />
      <div className="grid grid-cols-1 sm:grid-cols-3">
        {secondToFourthImageURLs.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`product${index + 2}`}
            className="w-full cursor-pointer border border-primary duration-300 ease-in-out transform hover:scale-105"
            onClick={() => handleImageSelect(index + 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImage;
