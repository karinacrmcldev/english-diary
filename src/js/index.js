const homeworkInput = document.querySelector(".homework-add");
const gradesInput = document.querySelector(".grade-add");
const homeworkBtn = document.getElementById("homework-btn");
const gradesBtn = document.getElementById("grades-btn");
const homeworkContainer = document.querySelector(".homework-inner");
const gradesContainer = document.querySelector(".grades-slider");

function addHomeworkToDocument() {
  let tasksToCreate = JSON.parse(localStorage.getItem("tasks")) || [];
  textOfTasks = tasksToCreate.map(function createHwTemplate(item) {
    return `
      <div class="homework-item">
      <div class="homework-title">Д.з</div>
      <div class="homework-text">
       ${item}
      </div>
      <div class="homework-date">2020.02.16</div>
    </div>
      `;
  });
  let createdTemplates = textOfTasks.map((item) => generateHwTask(item));
  console.log(createdTemplates);
}

function generateHwTask(tasktemplate) {
  homeworkContainer.insertAdjacentHTML("afterbegin", tasktemplate);
}

addHomeworkToDocument();
