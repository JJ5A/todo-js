/**
 * @jest-environment jsdom
 */
const Model = require('../model.js');

beforeEach(() => localStorage.clear());

test('toggleCompleted invierte el estado', () => {
  const m = new Model(); m.removeTodo(0);
  const { id } = m.addTodo('Task', 'Desc');

  m.toggleCompleted(id);
  expect(m.getTodos()[0].completed).toBe(true);

  m.toggleCompleted(id);
  expect(m.getTodos()[0].completed).toBe(false);
});
