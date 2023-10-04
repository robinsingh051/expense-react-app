import React, { useContext } from "react";
import axios from "axios";
import ErrorContext from "../store/error-context";
import SuccessContext from "../store/success-context";
import { Card, Button } from "react-bootstrap";

const ExpenseItem = (props) => {
  const errorCtx = useContext(ErrorContext);
  const successCtx = useContext(SuccessContext);
  const deleteData = async () => {
    try {
      await axios.delete(
        `https://react-practice-9b982-default-rtdb.firebaseio.com/expenses/${props.id}.json`
      );
    } catch (err) {
      console.log(err);
      errorCtx.showError("something went wrong");
    }
  };
  const onEdit = () => {
    deleteData();
    props.onEdit(props.id);
  };
  const onDelete = () => {
    deleteData();
    successCtx.showText("Expense deleted");
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
