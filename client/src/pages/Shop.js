import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import Pages from "../components/Pages";
import TypeBar from "../components/TypeBar";
import {
  setBrands,
  setDevices,
  setTotalCount,
  setTypes,
} from "../features/device/deviceSlice";
import { fetchBrands, fetchDevices, fetchTypes } from "../http/deviceAPI";

const Shop = () => {
  const dispatch = useDispatch();
  const { pagesCount, selectedBrand, selectedType } = useSelector(
    (state) => state.device
  );
  useEffect(() => {
    fetchTypes().then((data) => dispatch(setTypes(data)));
    fetchBrands().then((data) => dispatch(setBrands(data)));
    fetchDevices(null, null, 1, 3).then((data) => {
      dispatch(setDevices(data.rows));
      dispatch(setTotalCount(data.count));
    });
  }, [dispatch]);
  useEffect(() => {
    fetchDevices(selectedType.id, selectedBrand.id, pagesCount, 3).then(
      (data) => {
        dispatch(setDevices(data.rows));
        dispatch(setTotalCount(data.count));
      }
    );
  }, [dispatch, selectedBrand, selectedType, pagesCount]);
  return (
    <Container>
      <Row>
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <DeviceList />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
};

export default Shop;
