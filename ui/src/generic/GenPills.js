import { Badge, Button } from "react-bootstrap";

export const GenPills = ({ data, onDelete }) => (
  <>
    {data.map((e) => (
      <Badge style={{ margin: "0px 5px", fontSize: "initial" }} key={e} pill variant="light">
        {e}
        <Button variant="light" size="sm" onClick={() => onDelete(e)}>
          x
        </Button>
      </Badge>
    ))}
  </>
);
