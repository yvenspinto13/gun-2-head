import { FormControl, FormLabel, InputGroup } from "react-bootstrap";

export const GenInput = ({ label, type, onClick }) => (
  <InputGroup>
    <FormLabel className="label-date">{label}</FormLabel>
    <FormControl type={type} onChange={onClick}></FormControl>
  </InputGroup>
);
