const homeworkInput = document.querySelector(".homework-add");
const gradesInput = document.querySelector(".grade-add");
const homeworkBtn = document.getElementById("homework-btn");
const gradesBtn = document.getElementById("grades-btn");
const homeworkContainer = document.querySelector(".homework-inner");
const gradesContainer = document.querySelector(".grades-slider");

homeworkBtn.addEventListener("click", addHwTask);
gradesBtn.addEventListener("click", addGrade);

function addHwTask() {
  addHomeworkToLS(homeworkInput.value); //adds value to array in local storage
}

function addGrade() {
  addGradeToLS(gradesInput.value);
}

const addHomeworkToDB = async (tasks) => {
  const response = await fetch(
    "https://chatte-a619b-default-rtdb.europe-west1.firebasedatabase.app/chatte.json",
    {
      method: "PUT",
      body: JSON.stringify(tasks),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  console.log(data);
};

async function addHomeworkToLS(task) {
  const tasks = (await getTasksFromDB()) || [];
  console.log(tasks);
  tasks.push(task);
  addHomeworkToDB(tasks);
}

async function getTasksFromDB() {
  const response = await fetch(
    "https://chatte-a619b-default-rtdb.europe-west1.firebasedatabase.app/chatte.json",
    {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
}

function addGradeToLS(grade) {
  const grades = JSON.parse(localStorage.getItem("grades")) || [];
  grades.push(grade);
  localStorage.setItem("grades", JSON.stringify(grades));
}

//function which display elements in the main page(useless code right here)

// function addHomeworkToDocument() {
//   let tasksToCreate = JSON.parse(localStorage.getItem("tasks"));
//   textOfTasks = tasksToCreate.map(function createHwTemplate(item) {
//     return `
//     <div class="homework-item">
//     <div class="homework-title">Д.з</div>
//     <div class="homework-text">
//      ${item}
//     </div>
//     <div class="homework-date">2020.02.16</div>
//   </div>
//     `;
//   });
//   let createdTemplates = textOfTasks.map((item) => generateHwTask(item));
//   console.log(createdTemplates);
// }

// function generateHwTask(tasktemplate) {
//   homeworkContainer.insertAdjacentHTML("afterbegin", tasktemplate);
// }
// function addHwTask() {
//   let task = createHwTemplate(homeworkInput.value);
//   generateHwTask(task);
// }
// function addGrade() {}

// function createGrade(grade) {
//   return `
//     <div class="grades-slider-item">
//     <span>${grade}</span>
//   </div>
//     `;
// }
