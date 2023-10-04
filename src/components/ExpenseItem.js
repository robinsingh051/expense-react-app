import React from "react";
import { Card, Button } from "react-bootstrap";

const ExpenseItem = (props) => {
  const onEdit = () => {
    props.onEdit(props.id);
  };
  const onDelete = () => {
    props.onDelete(props.id);
  };
  return (
    <Card className="mb-2">
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div>
          <Card.Title>{props.description}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Category: {props.category}
          </Card.Subtitle>
          <Card.Text>Amount: ₹{props.amount.toFixed(2)}</Card.Text>
        </div>
        <div>
          <Button variant="outline-primary" className="mx-1" onClick={onEdit}>
            Edit
          </Button>
          <Button variant="outline-danger" className="mx-1" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ExpenseItem;
