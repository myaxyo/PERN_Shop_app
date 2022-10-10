import React from "react";
import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import DeviceItem from "./DeviceItem";

const DeviceList = () => {
  const { devices } = useSelector((state) => state.device);
  return (
    <Row className="d-flex mt-3">
      {devices.map((device) => (
        <DeviceItem key={device.id} device={device} />
      ))}
    </Row>
  );
};

export default DeviceList;
