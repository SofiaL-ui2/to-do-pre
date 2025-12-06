let items = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];

const STORAGE_KEY = "to-do_tasks";

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  return savedData ? JSON.parse(savedData) : items;
}

function createItem(itemText) {
  const templateNode = document.getElementById("to-do__item-template");
  const itemClone = templateNode.content.querySelector(".to-do__item").cloneNode(true);
  const taskTextElement = itemClone.querySelector(".to-do__item-text");
  const deleteBtn = itemClone.querySelector(".to-do__item-button_type_delete");
  const duplicateBtn = itemClone.querySelector(".to-do__item-button_type_duplicate");
  const editBtn = itemClone.querySelector(".to-do__item-button_type_edit");

  taskTextElement.textContent = itemText;

  deleteBtn.addEventListener("click", () => {
    itemClone.remove();
    const currentItems = getTasksFromDOM();
    saveTasks(currentItems);
  });

  duplicateBtn.addEventListener("click", () => {
    const originalText = taskTextElement.textContent;
    const newClone = createItem(originalText);
    listElement.prepend(newClone);
    const currentItems = getTasksFromDOM();
    saveTasks(currentItems);
  });

  editBtn.addEventListener("click", () => {
    taskTextElement.setAttribute("contenteditable", "true");
    taskTextElement.focus();
  });

  taskTextElement.addEventListener("blur", () => {
    taskTextElement.setAttribute("contenteditable", "false");
    const currentItems = getTasksFromDOM();
    saveTasks(currentItems);
  });

  return itemClone;
}

function getTasksFromDOM() {
  const allTaskTexts = document.querySelectorAll(".to-do__item-text");
  const extractedItems = [];
  allTaskTexts.forEach((element) => extractedItems.push(element.textContent));
  return extractedItems;
}

function saveTasks(tasksArray) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasksArray));
}

items = loadTasks();
items.forEach((task) => listElement.append(createItem(task)));

formElement.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = inputElement.value.trim();
  if (!inputValue) return;

  const newItem = createItem(inputValue);
  listElement.prepend(newItem);

  items = getTasksFromDOM();
  saveTasks(items);

  inputElement.value = "";
});
