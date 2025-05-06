/**
 * @jest-environment jsdom
 *
 * Prueba: resumen de tareas + mensaje motivacional
 */
const fs   = require('fs');
const path = require('path');
const jquery = require('jquery');        // ① importa jQuery

beforeEach(() => {
  // 1. Inyecta el HTML de la página
  const html = fs.readFileSync(
    path.resolve(__dirname, '../index.html'),
    'utf8'
  );
  document.documentElement.innerHTML = html;

  // 2. Enlaza jQuery al window de JSDOM  ←  CLAVE
  const $ = jquery(global.window);
  global.$       = $;   // para código de producción
  global.jQuery  = $;   // por si usa el alias completo

  // 3. Limpia storage y ejecuta tu script de interfaz
  localStorage.clear();
  require('../ui.js');
});

/* ---------- utilidades ---------- */
const addTask = (title='T',desc='D')=>{
  $('#title').val(title);
  $('#description').val(desc);
  $('#add').click();
};
const markFirstComplete = ()=>document.querySelector('.completed-checkbox').click();

/* ---------- prueba única ---------- */
test('Mensaje y conteo cambian adecuadamente', () => {
  /* estado inicial */
  expect($('#total-tasks').text()).toBe('0');
  expect($('#motivation-message').text()).toMatch(/primera tarea/i);

  /* agrega 1 pendiente */
  addTask('Estudiar','JS');
  expect($('#total-tasks').text()).toBe('1');
  expect($('#pending-tasks').text()).toBe('1');
  expect($('#motivation-message').text()).toMatch(/pendiente/i);

  /* la completa */
  markFirstComplete();
  expect($('#completed-tasks').text()).toBe('1');
  expect($('#pending-tasks').text()).toBe('0');
  expect($('#motivation-message').text()).toMatch(/Buen trabajo/i);
});
