import { ADD_TODO, DELETE_TODO } from './actionTypes';

//action creator
export function addTodo(novoNumero) {
  return {
    type: ADD_TODO,
    payload: novoNumero,
  };
}

export function deleteTodo(taskId) {
  return {
    type: DELETE_TODO,
    payload: taskId,
  };
}

export function editTodo(data, taskId) {
  return {
    type: DELETE_TODO,
    payload: {
      todo: data,
      id: taskId
    },
  };
}

