import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import CreateDevice from "../components/modals/CreateDevice";
import CreateBrand from "../components/modals/CreateBrand";
import CreateType from "../components/modals/CreateType";

const Admin = () => {
  const [show, setShow] = useState({
    brandShow: false,
    typeShow: false,
    deviceShow: false,
  });
  return (
    <Container className="d-flex flex-column">
      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => setShow({ typeShow: true })}
      >
        Add Type
      </Button>
      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => setShow({ brandShow: true })}
      >
        Add Brand
      </Button>
      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => setShow({ deviceShow: true })}
      >
        Add Device
      </Button>
      <CreateType
        show={show.typeShow}
        onHide={() => setShow({ typeShow: false })}
      />
      <CreateBrand
        show={show.brandShow}
        onHide={() => setShow({ brandShow: false })}
      />
      <CreateDevice
        show={show.deviceShow}
        onHide={() => setShow({ deviceShow: false })}
      />
    </Container>
  );
};

export default Admin;
