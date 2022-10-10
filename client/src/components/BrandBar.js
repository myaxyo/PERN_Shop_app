import React from "react";
import { Card } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedBrand } from "../features/device/deviceSlice";

const BrandBar = () => {
  const { brands, selectedBrand } = useSelector((state) => state.device);
  const dispatch = useDispatch();
  return (
    <Row style={{ gap: "10px" }}>
      {brands.map((brand) => (
        <Card
          key={brand.id}
          className="p-3"
          onClick={() => dispatch(setSelectedBrand(brand))}
          border={brand.id === selectedBrand.id ? "success" : "ligth"}
          style={{ cursor: "pointer" }}
        >
          {brand.name}
        </Card>
      ))}
    </Row>
  );
};

export default BrandBar;
