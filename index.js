document.addEventListener("DOMContentLoaded", () => {
    //new tasklist
    const taskList = new Tasklist();

    const form = document.querySelector("#create-task-form");
    const description = document.querySelector("#new-task-description");
    const priority = document.querySelector("#new-task-priority");

    //ul for new tasks in the DOM
    const taskUl = document.querySelector("#tasks");
    const renderApp = () => (taskUl.innerHTML = taskList.renderTasks());

    //Event Listeners
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        taskList.createNewTask(description.value);

        //reset the form
        event.target.reset();
        renderApp();
    })

    taskUl.addEventListener("click", (event) => {
        if(event.target.nodeName === "BUTTON") {
            taskList.deleteTask(event.target.dataset.description);
            renderApp();
        }
    })

})

//Task Class
class Task {
    constructor(description) {
      this.description = description;
    }
  
    render() {
      return `
        <li>
          ${this.description}
          <button data-description="${this.description}">X</button>
        </li>
        `;
    }
  }

  //Tasklist Class
  class TaskList {
    constructor() {
      this.tasks = [];
    }
  
    createNewTask(description) {
      const newTask = new Task(description);
      this.tasks.push(newTask);
    }
  
    renderTasks() {
      return this.tasks.map((task) => task.render()).join("");
    }
  
    deleteTask(description) {
      this.tasks = this.tasks.filter((task) => task.description !== description);
    }
  }

