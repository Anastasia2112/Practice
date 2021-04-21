const addTaskBtn = document.getElementById('add_task_btn');
const addTaskInput = document.getElementById('add_task_text');
const taskList = document.querySelector('.task_list');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks')); // если в LocalStorage есть записи -поместить их в tasks, если нет, то объявить tasks пустым массивом

let todoItemText = [];

function Task(text) {   //конструктор задачи
    this.taskText = text;
    this.completed = false;
}

const createTemplate = (task, index) => {   // шаблон для задачи
    return `
        <li class="task_item">
            <div>
                <input onclick="completeTask(${index})" type="checkbox" ${task.completed ? 'checked' : ''}>
                <span class="item_text ${task.completed ? 'completed_task' : ''}">${task.taskText}</span>
            </div>
            <button onclick="deleteTask(${index})" class="btn" id="item_delete_btn">Удалить</button>
        </li>
    `
}

const tasksSorting = () => {    // сортировка выполненных задач
    const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
    const completedTasks = tasks.length && tasks.filter(item => item.completed == true);
    tasks = [...activeTasks, ...completedTasks];
}

const fillTaskList = () => {    // вывести задачи
    taskList.innerHTML = "";
    if (tasks.length > 0) {
        tasksSorting();
        tasks.forEach((item, index) => {
            taskList.innerHTML += createTemplate(item, index);
        });
        todoItemText = document.querySelectorAll('.item_text');
        todoItemElems = document.querySelectorAll('.task_item');
    }
}

fillTaskList();

const updateLocalStorage = () => {  // обновить LocalStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = index => { 
    tasks[index].completed = !tasks[index].completed;   // изменить статус задачи на противоположный
    if (tasks[index].completed) {
        todoItemText[index].classList.add('completed_task');
    } else {
        todoItemText[index].classList.remove('completed_task');
    }
    updateLocalStorage();
    fillTaskList();
}

addTaskBtn.addEventListener('click', () => {    // добавить задачу при нажатии на кнопку
    tasks.push(new Task(addTaskInput.value));
    updateLocalStorage();
    fillTaskList();
    addTaskInput.value = '';
})

const deleteTask = index => {   // удаление задачи
    todoItemElems[index].classList.add('deletion');
    setTimeout(() => {  // задержка для ожидания анимации
        tasks.splice(index, 1);
        updateLocalStorage();
        fillTaskList();
    }, 500)
}