const homeworkInput = document.querySelector(".homework-add");
const gradesInput = document.querySelector(".grade-add");
const homeworkBtn = document.getElementById("homework-btn");
const gradesBtn = document.getElementById("grades-btn");
const homeworkContainer = document.querySelector(".homework-inner");
const gradesContainer = document.querySelector(".grades-slider");

const gradePerWeekContainer = document.querySelector(".gengrade-perweek p");
const gradeInGenContainer = document.querySelector(".gengrade-pergeneral p");

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

async function getGradesFromDB() {
  const response = await fetch(
    "https://chatte-a619b-default-rtdb.europe-west1.firebasedatabase.app/grades.json",
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

async function generateGradeInGeneral() {
  const response = await fetch(
    "https://chatte-a619b-default-rtdb.europe-west1.firebasedatabase.app/grades.json",
    {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  const result = data.reduce((prev, number) => prev + +number, 0) / data.length;
  console.log(result);
  return result;
}

//----------
async function addHomeworkToDocument() {
  let tasksToCreate = (await getTasksFromDB()) || [];
  textOfTasks = tasksToCreate.map(function createHwTemplate(item) {
    return `
      <div class="homework-item">
      <div class="homework-title">Д.з</div>
      <div class="homework-text">
       ${item.task}
      </div>
      <div class="homework-date">${item.date}</div>
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
//----------

//----------
async function addGradeToDocument() {
  let tasksToCreate = (await getGradesFromDB()) || [];
  textOfTasks = tasksToCreate.map(function createGradeTemplate(item) {
    return `
    <div class="grades-slider-item">
  <span>${item}</span>
</div>
      `;
  });
  textOfTasks.map((item) => generateGradeTask(item));
}

async function generateGradeTask(gradetemplate) {
  await gradesContainer.insertAdjacentHTML("afterbegin", gradetemplate);
}

addGradeToDocument();
//----------

//----------
async function addGeneralGradeToDocument() {
  gradeInGenContainer.innerText = await generateGradeInGeneral();
  console.log(generateGradeInGeneral());
}

addGeneralGradeToDocument();
//----------
