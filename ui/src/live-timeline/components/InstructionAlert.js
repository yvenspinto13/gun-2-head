import { Alert } from "react-bootstrap";

export const InstructionAlert = ({ onClose }) => (
  <Alert variant="warning" onClose={onClose} dismissible>
    You have to install an application to use this section. Refer{" "}
    <Alert.Link href="https://github.com/yvenspinto13/gun-2-head/tree/main/scripts/executables">
      here
    </Alert.Link>{" "}
    for instructions.
  </Alert>
);
