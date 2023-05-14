{
  let tasks = [];
  let hideDoneTasks = false;

  const onSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTask").value.trim();

    if (newTaskElement === "") {
      return;
    }
    focusInput();
    pushTask(newTaskElement);
    clear();

  };

  const focusInput = () => {
    document.getElementById("focusButton").addEventListener("click", () => {
      document.getElementById("textField").focus();
    })
  };

  const pushTask = (newTaskElement) => {
    tasks = [...tasks, { element: newTaskElement }];

    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      ...tasks.slice(taskIndex + 1),
    ]
    render();
  };

  const doneTask = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      {
        ...tasks[taskIndex],
        done: !tasks[taskIndex].done,
      },
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const toggleHideDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;

    render();
  };

  const clear = () => {
    const inputElement = document.querySelector(".js-newTask")
    inputElement.value = "";

    render();
  };

  const makeAllTasksDone = () => {
    tasks = tasks.map((task) => {
      if (task.done) {
        return task;
      }

      return {
        ...task,
        done: true,
      };
    });

    render();
  };

  const renderTasks = () => {
    const taskHTML = task =>
      `<li class="js-task list__items ${task.done && hideDoneTasks ? "list__items--hidden" : ""} ${task.done && "list__items--done"} "> 
      <button class="js-done list__button--notdone ${task.done && "list__button--done"}"></button>
      <p class="list__text">${task.element}</p> 
      <button class="js-remove list__button--delete"></button></li>`;


    const tasksElement = document.querySelector(".js-tasks");
    tasksElement.innerHTML = tasks.map(taskHTML).join("");
  };

  const renderButtons = () => {
    const buttonsElement = document.querySelector(".js-buttons");

    (!tasks.length) ? buttonsElement.classList.add("buttons__button--hide") : buttonsElement.classList.remove("buttons__button--hide");

    buttonsElement.innerHTML = `
    <button class= "buttons__button js-hideDoneTasks">
      ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
    </button>
    <button class="buttons__button js-makeAllDone"
      ${tasks.every(({ done }) => done) ? "disabled" : ""}> Ukończ wszystkie
    </button>
    `;

  };

  const bindButtonEvents = () => {
    const makeAllDoneButton = document.querySelector(".js-makeAllDone");
    makeAllDoneButton.addEventListener("click", makeAllTasksDone);


    const toggleHideDoneButton = document.querySelector(".js-hideDoneTasks");
    toggleHideDoneButton.addEventListener("click", toggleHideDoneTasks);

  };

  const render = () => {

    renderTasks();
    renderButtons();


    const removeButtons = document.querySelectorAll(".js-remove");
    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });

    const doneButtons = document.querySelectorAll(".js-done");

    doneButtons.forEach((doneButton, index) => {
      doneButton.addEventListener("click", () => {
        doneTask(index);

      });
    });

    bindButtonEvents();

  };


  const init = () => {
    render();
    const formElement = document.querySelector(".js-form");

    formElement.addEventListener("submit", onSubmit);

  };

  init();
}