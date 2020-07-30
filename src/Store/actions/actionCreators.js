import { ADD_TODO } from './actionTypes';

//action creator
export function addTodo(novoNumero) {
  return {
    type: "ADD_TODO",
    payload: novoNumero,
  };
}
