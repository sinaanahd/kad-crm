import React, { useState } from "react";
const Product = ({ prod }) => {
  return <span className="inside-item">{prod.product_title}</span>;
};

export default Product;
