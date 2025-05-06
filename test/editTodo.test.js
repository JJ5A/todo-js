/**
 * @jest-environment jsdom
 */
const Model = require('../model.js');

beforeEach(() => localStorage.clear());

test('editTodo actualiza los campos indicados', () => {
  const m = new Model(); m.removeTodo(0);
  const { id } = m.addTodo('Old', 'Desc');

  m.editTodo(id, { title: 'New', description: 'Text', completed: true });

  const todo = m.getTodos()[0];
  expect(todo).toMatchObject({
    title: 'New',
    description: 'Text',
    completed: true,
  });

  const stored = JSON.parse(localStorage.getItem('todos'))[0];
  expect(stored.completed).toBe(true);
});
