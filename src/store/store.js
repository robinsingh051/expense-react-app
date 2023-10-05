import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import expensesReducer from "./expenses";

const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    auth: authReducer,
  },
});

export default store;
