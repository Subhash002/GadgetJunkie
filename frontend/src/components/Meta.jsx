import React from "react";
import { Helmet } from "react-helmet-async";
const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />{" "}
      <meta name="keywords" content={keywords} />{" "}
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome to Gadjet Junkie",
  description: "We sell best electronics at fair prices.",
  keywords:
    "electronics,buy electronic products,cheap elecpronics products,iphone pro at 250$ only,latest tech products",
};

export default Meta;
