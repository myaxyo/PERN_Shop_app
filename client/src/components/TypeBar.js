import React from "react";
import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedType } from "../features/device/deviceSlice";

const TypeBar = () => {
  const { types, selectedType } = useSelector((state) => state.device);
  const dispatch = useDispatch();

  return (
    <ListGroup>
      {types &&
        types.map((type) => (
          <ListGroup.Item
            style={{ cursor: "pointer" }}
            active={type.id === selectedType.id}
            onClick={() => dispatch(setSelectedType(type))}
            key={type.id}
          >
            {type.name}
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
};

export default TypeBar;
