import React from "react";

const FilterTags = ({
  selectedBrand,
  selectedSize,
  selectedColor,
  selectedCategory,
  selectedMinPrice,
  selectedMaxPrice,
  onClearTag,
}) => {
  const tags = [];

  if (selectedBrand) tags.push({ label: `Brand: ${selectedBrand.name}`, type: 'brand' });
  if (selectedSize) tags.push({ label: `Size: ${selectedSize.size}`, type: 'size' });
  if (selectedColor) tags.push({ label: `Color`, type: 'color', colorCode: selectedColor.codeColor });
  if (selectedCategory) tags.push({ label: `Category: ${selectedCategory}`, type: 'category' });
  if (selectedMinPrice && selectedMaxPrice) tags.push({ label: `Price: $${selectedMinPrice} - $${selectedMaxPrice}`, type: 'price' });

  return (
    <div className="filter-tags">
      {tags.map((tag, index) => (
        <span key={index} className="tag">
          {tag.type === 'color' ? (
            <span style={{ backgroundColor: tag.colorCode }} className="color-tag"></span>
          ) : (
            tag.label
          )}
          <button onClick={() => onClearTag(tag.type)}>x</button>
        </span>
      ))}
    </div>
  );
};

export default FilterTags;
