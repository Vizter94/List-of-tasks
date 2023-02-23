{
  const tasks = [];

  const onSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTask").value.trim();

    if (newTaskElement === "") {
      return;
    }
    pushTask(newTaskElement);
  }

  const pushTask = (newTaskElement) => {
    tasks.push({
      element: newTaskElement,
    });

    render();
  };

  const removeTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);
    render();
  }

  const doneTask = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;
    render();
  }



  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `<li class="list__items ${task.done && "list__items--done"}"> 
      <button class="js-done list__button--notdone ${task.done && "list__button--done"}"></button>
      ${task.element} 
      <button class="js-remove list__button--delete"></button></li>`;
    }
    document.querySelector(".js-tasks").innerHTML = htmlString;

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

  };


  const init = () => {
    render();
    const formElement = document.querySelector(".js-form");

    formElement.addEventListener("submit", onSubmit);

  }

  init();
}