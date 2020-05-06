import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: [],
    loading: false,
    error: null,
    query: "",
  },
  reducers: {},
});

// export const { addTodo, toggleTodo } = searchSlice.actions;

export const searchReducer = searchSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit'

// const todosSlice = createSlice({
//   name: 'todos',
//   initialState: [],
//   reducers: {
//     addTodo(state, action) {
//       const { id, text } = action.payload
//       state.push({ id, text, completed: false })
//     },
//     toggleTodo(state, action) {
//       const todo = state.find(todo => todo.id === action.payload)
//       if (todo) {
//         todo.completed = !todo.completed
//       }
//     }
//   }
// })

// export const { addTodo, toggleTodo } = todosSlice.actions

// export default todosSlice.reducer
