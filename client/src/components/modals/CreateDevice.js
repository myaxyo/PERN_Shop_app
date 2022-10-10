import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setBrands,
  setSelectedBrand,
  setSelectedType,
  setTypes,
} from "../../features/device/deviceSlice";
import { createDevice, fetchBrands, fetchTypes } from "../../http/deviceAPI";
const CreateDevice = ({ show, onHide }) => {
  const { selectedBrand, selectedType, brands, types } = useSelector(
    (state) => state.device
  );
  const dispatch = useDispatch();
  useEffect(() => {
    fetchTypes().then((data) => dispatch(setTypes(data)));
    fetchBrands().then((data) => dispatch(setBrands(data)));
  }, [dispatch]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const changeInfo = (key, value, number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };
  const addDevice = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", `${price}`);
    formData.append("img", file);
    formData.append("brandId", selectedBrand.id);
    formData.append("typeId", selectedType.id);
    formData.append("info", JSON.stringify(info));
    console.log(formData);
    createDevice(formData).then(() => onHide());
  };
  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };
  return (
    <Modal size="lg" show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Device</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle id="dropdown-basic">
              {selectedType.name || "Select Type"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {types.map((type) => (
                <Dropdown.Item
                  onClick={() => dispatch(setSelectedType(type))}
                  key={type.id}
                  eventKey="X"
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle id="dropdown-basic">
              {selectedBrand.name || "Select Brand"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {brands.map((brand) => (
                <Dropdown.Item
                  onClick={() => dispatch(setSelectedBrand(brand))}
                  key={brand.id}
                  eventKey="X"
                >
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            placeholder="Enter device name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-3"
          />
          <Form.Control
            placeholder="Enter device price"
            value={price}
            onChange={(e) => {
              setPrice(Number(e.target.value));
            }}
            type="number"
            className="mt-3"
          />
          <Form.Control type="file" onChange={selectFile} className="mt-3" />
          <hr />
          <Button variant={"outline-dark"} onClick={addInfo}>
            Add New Information
          </Button>
          {info.map((i) => (
            <Row className="mt-4" key={i.number}>
              <Col md={4}>
                <Form.Control
                  placeholder="Enter information name"
                  value={i.name}
                  onChange={(e) =>
                    changeInfo("title", e.target.value, i.number)
                  }
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  placeholder="Enter information text"
                  value={i.description}
                  onChange={(e) =>
                    changeInfo("description", e.target.value, i.number)
                  }
                />
              </Col>
              <Col md={4}>
                <Button
                  variant={"outline-danger"}
                  onClick={() => removeInfo(i.number)}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-danger"} onClick={onHide}>
          Close
        </Button>
        <Button variant={"outline-success"} onClick={addDevice}>
          Add Device
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateDevice;
