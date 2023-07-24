let i = localStorage.length ?? 0;

const getListofTodos = () => {
  let overdueItem = document.querySelector(".OverDue");
  let overdueCount = document.querySelector(".count-OD");
  let dueTodayItem = document.querySelector(".DueToday");
  let duetodayCount = document.querySelector(".count-DT");
  let dueLaterItem = document.querySelector(".DueLater");
  let duelaterCount = document.querySelector(".count-DL");
  let completedItem = document.querySelector(".Completed");
  let completedCount = document.querySelector(".count-COMP");
  let TODOList;
  // console.log(localStorage);
  // console.log(localStorage.length);
  if (localStorage.length != undefined) {
    for (let todo in localStorage) {
      let item = JSON.parse(localStorage.getItem(todo));
      if (localStorage.getItem(todo)) {
        let date = new Date(item?.dueDate).getTime();
        let today = new Date(new Date().toISOString().split("T")[0]).getTime();
        console.log(date + "\n" + today);
        let li = document.createElement("li");
        if (date < today && !item?.isCompleted) {
          li.setAttribute("class", "OVERDUE");
          li.innerHTML =
            `<input type='checkbox' ${
              item?.isCompleted ? "checked" : ""
            } onClick='updateTodo(${item?.id})'>` +
            item?.todo +
            " | " +
            item?.dueDate +
            `<button class="del" style='margin-left:10px;' onclick='deleteTodo(${item?.id})'>Delete</button>`;
          overdueItem.appendChild(li);
          overdueCount.innerHTML = document.querySelectorAll(".OVERDUE").length;
        } else if (date > today && !item?.isCompleted) {
          li.setAttribute("class", "DUELATER");
          // console.log(j);
          li.innerHTML =
            `<input type='checkbox' ${
              item?.isCompleted ? "checked" : ""
            }onClick='updateTodo(${item?.id})'>` +
            item?.todo +
            " | " +
            item?.dueDate +
            `<button class="del" style='margin-left:10px;' onclick='deleteTodo(${item?.id})'>Delete</button>`;
          dueLaterItem.appendChild(li);
          duelaterCount.innerHTML =
            document.querySelectorAll(".DUELATER").length;
        } else if (item?.isCompleted) {
          li.setAttribute("class", "COMPLETED");
          li.innerHTML =
            `<input type='checkbox' ${
              item?.isCompleted ? "checked" : ""
            } onClick='updateTodo(${item?.id})'>` +
            item?.todo +
            " | " +
            item?.dueDate +
            `<button class="del" style='margin-left:10px;' onclick='deleteTodo(${item?.id})'>Delete</button>`;
          completedItem.appendChild(li);
          completedCount.innerHTML =
            document.querySelectorAll(".COMPLETED").length;
        } else {
          li.setAttribute("class", "DUETODAY");
          // console.log(j);
          li.innerHTML =
            `<input type='checkbox' ${
              item?.isCompleted ? "checked" : ""
            }onClick='updateTodo(${item?.id})'>` +
            item?.todo +
            " | " +
            item?.dueDate +
            `<button class="del" style='margin-left:10px;' onclick='deleteTodo(${item?.id})'>Delete</button>`;
          dueTodayItem.appendChild(li);
          duetodayCount.innerHTML =
            document.querySelectorAll(".DUETODAY").length;
        }
      }
    }
  }
};

const submit = () => {
  let todoTitle = document.getElementById("todo");
  let dueDate = document.getElementById("dueDate");
  if (todoTitle.value.length != 0 && dueDate.value.length != 0) {
    let todoObj = {
      id: i,
      todo: todoTitle.value,
      dueDate: dueDate.value,
      isCompleted: false,
    };
    localStorage.setItem(`detail-${i}`, JSON.stringify(todoObj));
  }
  i += 1;
  // getListofTodos()
  window.location.reload();
};
onload = () => {
  getListofTodos();
};

function deleteTodo(item) {
  localStorage.removeItem(`detail-${item}`);
  // getListofTodos();
  window.location.reload();
}
const updateTodo = (id) => {
  let todo = JSON.parse(localStorage.getItem(`detail-${id}`));
  todo.isCompleted = !todo.isCompleted;
  localStorage.removeItem(`detail-${id}`);
  localStorage.setItem(`detail-${id}`, JSON.stringify(todo));
  window.location.reload();
};
