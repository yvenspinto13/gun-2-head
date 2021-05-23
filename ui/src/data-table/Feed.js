import { Card } from "react-bootstrap";

const BoostrapCard = ({ username, content, media }) => (
  <Card style={{ margin: "10px 10px 10px 0" }}>
    {media.length > 0 && media[0].previewUrl && (
      <Card.Img variant="top" src={media[0].previewUrl} />
    )}
    <Card.Body>
      <Card.Text>
        {content} <br /> -{username}
      </Card.Text>
      {/* <Button variant="primary">Go somewhere</Button> */}
    </Card.Body>
  </Card>
);

export const Feed = ({ data = [] }) => (
  <>
    {data.length > 0 &&
      data.map((x) => (
        <BoostrapCard
          key={x.id}
          username={x.username}
          media={x.media}
          content={x.content}
        />
      ))}
  </>
);
