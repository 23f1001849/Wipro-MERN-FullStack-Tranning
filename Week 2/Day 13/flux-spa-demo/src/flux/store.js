import { register } from './dispatcher.js';
import { ActionTypes } from './actions.js';

let tasks = [
  { id: 1, title: 'Discuss SPA shell', done: false },
  { id: 2, title: 'Design dependency graph', done: true },
];

const subscribers = new Set();

register((action) => {
  switch (action.type) {
    case ActionTypes.ADD_TASK:
      tasks = [...tasks, { id: Date.now(), title: action.payload.title, done: false }];
      break;
    case ActionTypes.TOGGLE_TASK:
      tasks = tasks.map((task) => (task.id === action.payload.id ? { ...task, done: !task.done } : task));
      break;
    default:
      break;
  }
  subscribers.forEach((listener) => listener());
});

export function subscribe(listener) {
  subscribers.add(listener);
  return () => subscribers.delete(listener);
}

export function getSnapshot() {
  return tasks;
}
