const apikey = '5d066461-3cdb-4eaa-a460-793656e750c9';
const apihost = 'https://todo-api.coderslab.pl';



document.addEventListener('DOMContentLoaded', function() {
  apiListTasks().then(
    function(response) {

      // "response" zawiera obiekt z kluczami "error" i "data" (zob. wyżej)
      // "data" to tablica obiektów-zadań
      // uruchamiamy funkcję renderTask dla każdego zadania jakie dał nam backend
      response.data.forEach(
        function(task) { renderTask(task.id, task.title, task.description, task.status); }
      );

    }
  );  
});



//List
function apiListTasks() {
  return fetch(
    apihost + '/api/tasks',
    {
      headers: { Authorization: apikey }
    }
  ).then(
    function(resp) {
      if(!resp.ok) {
        alert('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny');
      }
      return resp.json();
    }
  )
}

// apiListTasks().then(
//   function(response) {
//     console.log('Serwer zwrócił', response.data.length, 'zadań');
//     console.log('Tytuł pierwszego to', response.data[0].title);
//   }
// );

//Render


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

  if(status == 'open') {
    const finishButton = document.createElement('button');
    finishButton.className = 'btn btn-dark btn-sm js-task-open-only';
    finishButton.innerText = 'Finish';
    headerRightDiv.appendChild(finishButton);
  }

  const deleteButton = document.createElement('button');
  deleteButton.className = 'btn btn-outline-danger btn-sm ml-2';
  deleteButton.innerText = 'Delete';
  headerRightDiv.appendChild(deleteButton);
}


//Create

// function apiCreateTask(title, description) {
//   return fetch(
//     apihost + '/api/tasks',
//     {
//       method: 'POST',
//       headers: {
//         'Authorization': apikey,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ title: title, description: description, status: 'open' })
//     }
//   ).then(
//     function(resp) {
//       if(!resp.ok) {
//         alert('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny');
//       }
//       return resp.json();
//     }
//   )
// }

// apiCreateTask('Przykładowy tytuł', 'Przykładowy opis').then(
//   function(response) {
//     console.log('Odpowiedź z serwera to:', response);
//   }
// );
