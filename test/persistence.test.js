/**
 * @jest-environment jsdom
 */
const Model = require('../model.js');

beforeEach(() => localStorage.clear());

test('constructor carga datos previos de LocalStorage', () => {
  const seed = [
    { id: 5, title: 'A', description: 'B', completed: false },
    { id: 6, title: 'C', description: 'D', completed: true }
  ];
  localStorage.setItem('todos', JSON.stringify(seed));

  const m = new Model();

  expect(m.getTodos()).toEqual(seed);
  expect(m.addTodo('X', 'Y').id).toBe(7);   // id incremental
});
