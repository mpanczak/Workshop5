const apikey = '5d066461-3cdb-4eaa-a460-793656e750c9';
const apihost = 'https://todo-api.coderslab.pl';


document.addEventListener('DOMContentLoaded', function () {
    apiListTasks().then(
        function (response) {

            // "response" zawiera obiekt z kluczami "error" i "data" (zob. wyżej)
            // "data" to tablica obiektów-zadań
            // uruchamiamy funkcję renderTask dla każdego zadania jakie dał nam backend
            response.data.forEach(
                function (task) {
                    renderTask(task.id, task.title, task.description, task.status);
                });
        });
    document.querySelector('form.js-task-adding-form').addEventListener('submit', function (event){
        event.preventDefault();
        const formElements = event.currentTarget.elements;
        apiCreateTask(formElements.title.value, formElements.description.value );
    });
});


//List task
function apiListTasks() {
    return fetch(
        apihost + '/api/tasks',
        {
            headers: {Authorization: apikey}
        }).then(
        function (resp) {
            if (!resp.ok) {
                alert('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny');
            }
            return resp.json();
        });
}

//RenderTask
function renderTask(taskId, title, description, status) {
    const section = document.createElement('section');
    section.className = 'card mt-5 shadow-sm';
    document.querySelector('main').appendChild(section);

    const headerDiv = document.createElement('div');
    headerDiv.className = 'card-header d-flex justify-content-between align-items-center';
    section.appendChild(headerDiv);

    const headerLeftDiv = document.createElement('div');
    headerDiv.appendChild(headerLeftDiv);

    const h5 = document.createElement('h5');
    h5.innerText = title;
    headerLeftDiv.appendChild(h5);

    const h6 = document.createElement('h6');
    h6.className = 'card-subtitle text-muted';
    h6.innerText = description;
    headerLeftDiv.appendChild(h6);

    const headerRightDiv = document.createElement('div');
    headerDiv.appendChild(headerRightDiv);

    if (status == 'open') {
        const finishButton = document.createElement('button');
        finishButton.className = 'btn btn-dark btn-sm js-task-open-only';
        finishButton.innerText = 'Finish';
        headerRightDiv.appendChild(finishButton);
    }

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-outline-danger btn-sm ml-2';
    deleteButton.innerText = 'Delete';
    headerRightDiv.appendChild(deleteButton);

    const list = document.createElement('ul');
    section.appendChild(list);

// "taskId" i "status" - bo tak nazywają się argumenty w funkcji "renderTask"
    apiListOperationsForTask(taskId).then(
        function (response) {
            response.data.forEach(
                function (operation) {
                    renderOperation(list, operation.id, status, operation.description, operation.timeSpent);
                });
        });

    const formDiv = document.createElement('div');
    formDiv.className = 'cart-body';
    section.appendChild(formDiv);

    const form = document.createElement('form');
    formDiv.appendChild(form)

    const inputDiv = document.createElement('div');
    inputDiv.className = 'input-group';
    form.appendChild(inputDiv);

    const inputElement = document.createElement('input');
    inputElement.className = 'form-control';
    inputElement.setAttribute('type', 'text');
    inputElement.setAttribute('placeholder', 'Operation description');
    inputElement.setAttribute('minlength', '5');
    inputDiv.appendChild(inputElement);

    const buttonDiv = document.createElement('div');
    buttonDiv.className = 'input-group-append';
    inputDiv.appendChild(buttonDiv);

    const formButton = document.createElement('button');
    formButton.classList.add('btn');
    formButton.classList.add('btn-info');
    formButton.innerText = 'Add';
    buttonDiv.appendChild(formButton);


}

// List operations
function apiListOperationsForTask(taskId) {
    return fetch(
        apihost + `/api/tasks/${taskId}/operations`,
        {
            headers: {Authorization: apikey}
        }
    ).then(
        function (resp) {
            if (!resp.ok) {
                alert('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny');
            }
            return resp.json();
        });
}


//Render Operations
function renderOperation(operationsList, operationId, status, operationDescription, timeSpent) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    // operationsList to lista <ul>
    operationsList.appendChild(li);

    const descriptionDiv = document.createElement('div');
    descriptionDiv.innerText = operationDescription;
    li.appendChild(descriptionDiv);

    const time = document.createElement('span');
    time.className = 'badge badge-success badge-pill ml-2';
    time.innerText = timeSpent + 'm';
    descriptionDiv.appendChild(time);

    const buttonsDiv = document.createElement('div');
    li.appendChild(buttonsDiv);

    if (status == 'open') {
        const button15m = document.createElement('button');
        button15m.className = 'btn btn-outline-success btn-sm mr-2';
        button15m.innerText = '+15m';
        buttonsDiv.appendChild(button15m);

        const button1h = document.createElement('button');
        button1h.className = 'btn btn-outline-success btn-sm mr-2';
        button1h.innerText = '+1h';
        buttonsDiv.appendChild(button1h);
    }
    const deleteOperation = document.createElement('button');
    deleteOperation.className = 'btn btn-outline-danger btn-sm';
    deleteOperation.innerText = 'Delete';
    buttonsDiv.appendChild(deleteOperation);
}

function convertTime (number){
    const hours = parseInt(number/60);
    const minutes = number%60;
    return `${hours}h ${minutes}m`;
}

//Create

function apiCreateTask(title, description) {
  return fetch(
    apihost + '/api/tasks',
    {
      method: 'POST',
      headers: {'Authorization': apikey, 'Content-Type': 'application/json'},
      body: JSON.stringify({ title: title, description: description, status: 'open' })
    }).then(
    function(resp) {
      if(!resp.ok) {
        alert('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny');
      }
      return resp.json();
    });
}