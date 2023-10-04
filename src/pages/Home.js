import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpenseList from "../components/ExpenseList";
import axios from "axios";

const Home = (props) => {
  const [expense, setExpense] = useState(null);
  const [items, setItem] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const getExpenses = async () => {
      try {
        const res = await axios.get(
          `https://react-practice-9b982-default-rtdb.firebaseio.com/expenses.json`
        );
        const loadedExpenses = [];
        for (const key in res.data) {
          loadedExpenses.push({
            id: key,
            amount: res.data[key].amount,
            cat: res.data[key].cat,
            desc: res.data[key].desc,
          });
        }
        setItem(loadedExpenses);
      } catch (err) {
        console.log(err);
      }
    };
    getExpenses();
  }, []);

  const showFormHandler = () => {
    setShowForm(true);
    setExpense(null);
  };

  const hideFormHandler = () => {
    setShowForm(false);
    setExpense(null);
  };

  const submitHandler = (expense) => {
    // console.log(expense);
    setItem((prevState) => {
      return [...prevState, expense];
    });
  };

  const editHandler = (id) => {
    const editedExpense = items.find((item) => item.id === id);
    if (editedExpense) {
      setExpense(editedExpense);
      setShowForm(true);
    }
    setItem((prevState) => {
      const updatedItems = prevState.filter((item) => item.id !== id);
      return updatedItems;
    });
  };

  const deleteHandler = (id) => {
    setItem((prevState) => {
      const updatedItems = prevState.filter((item) => item.id !== id);
      return updatedItems;
    });
  };

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center mt-5">
        {!showForm && (
          <Button
            className="mb-4"
            variant="outline-info"
            onClick={showFormHandler}
          >
            Add Expense
          </Button>
        )}
        {showForm && (
          <AddExpenseForm
            expense={expense}
            onSubmit={submitHandler}
            onClose={hideFormHandler}
          />
        )}
      </Container>
      <ExpenseList
        onDelete={deleteHandler}
        onEdit={editHandler}
        items={items}
      />
    </>
  );
};

export default Home;
