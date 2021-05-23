import { useState } from "react";
import {
  Button,
  Col,
  FormControl,
  FormLabel,
  InputGroup,
} from "react-bootstrap";

export const TextButtonInput = ({ label, addText, buttonLabel = "Add" }) => {
  const [textData, setTextData] = useState("");

  const addHandle = () => {
    if (textData === "") return;
    addText(textData);
    setTextData("");
  };

  return (
    <>
      <Col xs={6} md={2}>
        <InputGroup>
          <FormLabel className="label-date">{label}</FormLabel>
          <FormControl
            value={textData}
            type="text"
            onChange={(e) => setTextData(e.target.value)}
          ></FormControl>
        </InputGroup>
      </Col>
      <Col xs={6} md={1}>
        <Button onClick={addHandle}>{buttonLabel} </Button>
      </Col>
    </>
  );
};
