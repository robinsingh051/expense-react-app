import React from "react";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = (props) => {
  const expenses = props.items.map((item) => {
    return (
      <ExpenseItem
        onDelete={props.onDelete}
        onEdit={props.onEdit}
        key={item.id}
        id={item.id}
        description={item.desc}
        category={item.cat}
        amount={+item.amount}
      />
    );
  });
  return <> {expenses}</>;
};
export default ExpenseList;
