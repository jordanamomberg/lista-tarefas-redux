import { ADD_TODO, DELETE_TODO, EDIT_TODO, TODO_SEARCH } from './actionTypes';
import api from '../../services/api';
import todos from '../reducers/todos';

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
    type: EDIT_TODO,
    payload: {
      todo: data,
      id: taskId
    },
  }
};

export function todoSearch(value) {
  return {
    type: TODO_SEARCH,
    payload: value
  }
}