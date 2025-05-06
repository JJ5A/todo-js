/**
 * @jest-environment jsdom
 */
// import Model from '../model.js';
const Model = require('../model.js');
beforeEach(() => localStorage.clear());

test('addTodo agrega una tarea y devuelve una copia', () => {
  const model = new Model();               // arranca con tarea por defecto
  model.removeTodo(0);                     // lista vacía

  const todo = model.addTodo('Learn Jest', 'Watch video');

  expect(todo).toMatchObject({
    id: 1,
    title: 'Learn Jest',
    description: 'Watch video',
    completed: false,
  });
  expect(model.getTodos()).toHaveLength(1);

  // persiste en localStorage
  const stored = JSON.parse(localStorage.getItem('todos'));
  expect(stored[0].title).toBe('Learn Jest');
});
