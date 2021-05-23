import { Spinner } from "react-bootstrap";

export const GenSpinner = ({ isLoading = true, variant = "secondary" }) => (
  <>{isLoading && <Spinner animation="border" variant={variant} />}</>
);
