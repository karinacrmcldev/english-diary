const homeworkInput = document.querySelector(".homework-add");
const gradesInput = document.querySelector(".grade-add");
const homeworkBtn = document.getElementById("homework-btn");
const gradesBtn = document.getElementById("grades-btn");
const homeworkContainer = document.querySelector(".homework-inner");

const dateContainer = document.querySelector(".homework-date");

const gradePerWeekContainer = document.querySelector("gengrade-perweek p");
const gradeInGenContainer = document.querySelector("gengrade-pergeneral p");

homeworkBtn.addEventListener("click", addHwTask);
gradesBtn.addEventListener("click", addGrade);

moment().format("MMMM Do YYYY, h:mm:ss a");

function addHwTask() {
  const date = moment().format("L");
  addHomeworkToLS(homeworkInput.value, date); //adds value to array in
}

function addGrade() {
  addGradeToLS(gradesInput.value);
  // generateGradeInGeneral();
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

async function addHomeworkToLS(task, date) {
  const tasks = (await getTasksFromDB()) || [];
  console.log(typeof tasks);
  const homeworkItem = {
    task,
    date,
  };
  tasks.push(homeworkItem);
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

async function addGradeToLS(grade) {
  const grades = (await getGradesFromDB()) || [];
  console.log(grades);
  grades.push(grade);
  addGradesToDB(grades);
}

const addGradesToDB = async (grades) => {
  const response = await fetch(
    "https://chatte-a619b-default-rtdb.europe-west1.firebasedatabase.app/grades.json",
    {
      method: "PUT",
      body: JSON.stringify(grades),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  console.log(typeof data);
};

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

// function generateGradePerWeek(array) {}

// async function generateGradeInGeneral() {
//   const response = await fetch(
//     "https://chatte-a619b-default-rtdb.europe-west1.firebasedatabase.app/grades.json",
//     {
//       method: "GET",

//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   const data = await response.json();
//   const result = data.reduce((prev, number) => prev + +number, 0) / data.length;
//   // return result;
//   console.log(result);
// }

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
