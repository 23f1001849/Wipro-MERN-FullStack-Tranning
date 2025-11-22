import { dispatch } from './dispatcher.js';

export const ActionTypes = {
  ADD_TASK: 'ADD_TASK',
  TOGGLE_TASK: 'TOGGLE_TASK',
};

export function addTask(title) {
  dispatch({ type: ActionTypes.ADD_TASK, payload: { title } });
}

export function toggleTask(id) {
  dispatch({ type: ActionTypes.TOGGLE_TASK, payload: { id } });
}
