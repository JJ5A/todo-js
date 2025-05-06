/**
 * @jest-environment jsdom
 */
const Model = require('../model.js');

beforeEach(() => localStorage.clear());

test('removeTodo elimina la tarea y la persiste', () => {
  const m = new Model(); m.removeTodo(0);
  const { id } = m.addTodo('T', 'D');

  m.removeTodo(id);

  expect(m.getTodos()).toHaveLength(0);
  expect(JSON.parse(localStorage.getItem('todos'))).toHaveLength(0);
});
