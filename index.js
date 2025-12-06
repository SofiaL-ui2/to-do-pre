let items = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];

const listElement = document.querySelector(".to-do_list");
const formElement = document.querySelector(".to-do_form");
const inputElement = document.querySelector(".to-do_input");

function loadTasks() {
  const savedTasks = localStorage.getItem("todoTasks");
  if (savedTasks) {
    items = JSON.parse(savedTasks);
  }

  listElement.innerHTML = ""; 
  items.forEach((itemText) => {
    const itemElement = createItem(itemText);
    listElement.append(itemElement);
  });
}

function createItem(itemText) {
  const template = document.getElementById("to-do_item-template");
  const clone = template.content.querySelector(".to-do_item").cloneNode(true);
  const textElement = clone.querySelector(".to-do_item-text");
  const deleteButton = clone.querySelector(".to-do_item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do_item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do_item-button_type_edit");

  textElement.textContent = itemText;

  deleteButton.addEventListener("click", () => {
    clone.remove();
    saveTasks(getTasksFromDOM());
  });

  duplicateButton.addEventListener("click", () => {
    const duplicatedItem = createItem(itemText);
    listElement.append(duplicatedItem);
    saveTasks(getTasksFromDOM());
  });

  editButton.addEventListener("click", () => {
    const newText = prompt("Редактировать задачу:", itemText);
    if (newText !== null && newText.trim() !== "") {
      textElement.textContent = newText;
      saveTasks(getTasksFromDOM());
    }
  });

  return clone;
}

function getTasksFromDOM() {
  const taskElements = listElement.querySelectorAll(".to-do_item-text");
  return Array.from(taskElements).map((el) => el.textContent);
}

function saveTasks(tasks) {
  localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTask = inputElement.value.trim();
  if (newTask) {
    const newItem = createItem(newTask);
    listElement.append(newItem);
    saveTasks(getTasksFromDOM());
    inputElement.value = "";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
});
