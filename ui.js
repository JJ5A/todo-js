$(document).ready(function() {
    // Inicializar tareas desde localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Función para guardar tareas en localStorage
    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Función para actualizar el resumen de tareas
    function updateTaskSummary() {
      const totalTasks = tasks.length;
      const completedTasks = tasks.filter(task => task.completed).length;
      const pendingTasks = totalTasks - completedTasks;

      $('#total-tasks').text(totalTasks);
      $('#completed-tasks').text(completedTasks);
      $('#pending-tasks').text(pendingTasks);

      let message = '';
      if (totalTasks === 0) {
        message = '¡Agrega tu primera tarea para empezar!';
      } else if (completedTasks === totalTasks) {
        message = '¡Buen trabajo! Has completado todas tus tareas.';
      } else if (completedTasks > 0) {
        message = '¡Sigue así! Has completado ' + completedTasks + ' tarea' + (completedTasks > 1 ? 's' : '') + '.';
      } else {
        message = 'Tienes ' + pendingTasks + ' tarea' + (pendingTasks > 1 ? 's' : '') + ' pendientes, ¡vamos con todo!';
      }
      $('#motivation-message').text(message);
    }

    // Función para renderizar tareas desde localStorage
    function renderTasks() {
      $('#table tbody').empty();
      tasks.forEach(task => {
        const rowClass = task.completed ? 'table-success' : '';
        const newRow = `
          <tr class="${rowClass}" data-id="${task.id}">
            <td>${task.title}</td>
            <td>${task.description}</td>
            <td>
              <input type="checkbox" class="completed-checkbox" ${task.completed ? 'checked' : ''} />
            </td>
            <td>
              <button class="btn btn-warning btn-sm edit-btn" data-toggle="modal" data-target="#modal">Editar</button>
              <button class="btn btn-danger btn-sm delete-btn">Eliminar</button>
            </td>
          </tr>
        `;
        $('#table tbody').append(newRow);
      });
      updateTaskSummary();
    }

    // Renderizar tareas al cargar la página
    renderTasks();

    // Función para agregar una tarea
    $('#add').click(function() {
      const title = $('#title').val().trim();
      const description = $('#description').val().trim();

      // Validar que los campos no estén vacíos
      if (title === "" || description === "") {
        $('#alert').text('El título y la descripción no pueden estar vacíos').removeClass('d-none');
        return;
      } else {
        $('#alert').addClass('d-none');
      }

      // Crear nueva tarea
      const task = {
        id: Date.now(),
        title: title,
        description: description,
        completed: false
      };
      tasks.push(task);
      saveTasks();
      renderTasks();

      // Limpiar los campos de entrada
      $('#title').val('');
      $('#description').val('');
    });

    // Función para editar una tarea
    $(document).on('click', '.edit-btn', function() {
      const row = $(this).closest('tr');
      const taskId = parseInt(row.data('id'));
      const task = tasks.find(t => t.id === taskId);

      // Llenar el modal con los datos
      $('#modal-title').val(task.title);
      $('#modal-description').val(task.description);
      $('#modal-completed').prop('checked', task.completed);

      // Guardar los cambios
      $('#modal-btn').off('click').on('click', function() {
        const updatedTitle = $('#modal-title').val().trim();
        const updatedDescription = $('#modal-description').val().trim();
        const updatedCompleted = $('#modal-completed').prop('checked');

        // Validar que los campos no estén vacíos
        if (updatedTitle === "" || updatedDescription === "") {
          $('#modal-alert').text('El título y la descripción no pueden estar vacíos').removeClass('d-none');
          return;
        } else {
          $('#modal-alert').addClass('d-none');
        }

        // Actualizar la tarea
        tasks = tasks.map(t => {
          if (t.id === taskId) {
            return {
              id: t.id,
              title: updatedTitle,
              description: updatedDescription,
              completed: updatedCompleted
            };
          }
          return t;
        });

        saveTasks();
        renderTasks();

        // Cerrar el modal
        $('#modal').modal('hide');
      });
    });

    // Función para eliminar una tarea
    $(document).on('click', '.delete-btn', function() {
      const row = $(this).closest('tr');
      const taskId = parseInt(row.data('id'));
      tasks = tasks.filter(t => t.id !== taskId);
      saveTasks();
      renderTasks();
    });

    // Función para cambiar el estado de "completado"
    $(document).on('change', '.completed-checkbox', function() {
      const row = $(this).closest('tr');
      const taskId = parseInt(row.data('id'));
      const isChecked = $(this).prop('checked');

      tasks = tasks.map(t => {
        if (t.id === taskId) {
          return { ...t, completed: isChecked };
        }
        return t;
      });

      saveTasks();
      renderTasks();
    });
  });
  // src/ui.js  (al final del archivo)
module.exports = {};
