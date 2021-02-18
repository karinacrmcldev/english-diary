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
  addHomeworkToDocument(); //function to add text as element in page
}

function addGrade() {
  addGradeToLS(gradesInput.value);
}

function addHomeworkToLS(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
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
