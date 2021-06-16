//Grabbing the DOM elements
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#tasks');
const taskList = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');


//A single function to load all the event listeners
//Calling the function
loadEventListeners();

// IMPORTANT NOTE
// The localstorage does not actually store the task list items, i.e. actual <li> tags but it only stores the textContent of those <li> items which are passed on through the taskInput input tag.

//The textContent that comes from the taskInput input tag are stored in the LocalStorage and when it's time to render the DOM, we use those textContents to create and render our list items

//Declaring the function
function loadEventListeners(){
    //EventListener for loading the data (tasklist items) from the Local storage
    document.addEventListener('DOMContentLoaded', loadTasks)  //DOMContentLoaded is an eventType that gets called as soon as the dom is loaded

    //EventListener for the add task input field inside the form
    form.addEventListener('submit', addTask);

    //EventListener for deleting li items from the ul
    //Event deletagion: We put the eventListener on the whole TaskList ul instead of the individual list items
    taskList.addEventListener('click', removeTask);

    //EventListener for clearing tasks, for the clearBtn which is an <a> tag
    clearBtn.addEventListener('click', clearTasks);

    //EventListener for filtering tasks in the taskList
    filter.addEventListener('keyup', filterTasks);

}


//Function to add new tasks/items into the TaskList ul
//Function for the 'submit' event of the form
function addTask(e){
    //If the input field is empty
    if(!taskInput.value) {
        alert('The field is empty!');
    }
    else{
        //Creating li to be appended to the ul 
        const li = document.createElement('li');
        li.className = 'collection-item'; //This is a className for materialize css

        //Create a textNode and append it to the the li
        li.appendChild(document.createTextNode(taskInput.value));
        
        //Create a link and append it to the li
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content' //the secondary-content class pushes the item towards the right side of a li in materialize
        link.innerHTML = '<i class = "fas fa-remove"></i>'; //Adding a remove icon into the link
        li.appendChild(link);
        console.log(li);

        //Finally append the li into the ul
        taskList.appendChild(li);

        //function to store the new taskList item into the Localstorage, it is only the textcontent for the li, that is stored in the LocalStorage
        storeTasksInLocalStorage(taskInput.value);

        e.preventDefault();
    }
}


//Function to delete items from the ul
function removeTask(e){
    //if the target's parent is the <a> tag (link tag), this happens if the target is the icon <i> tag
    if (e.target.parentElement.classList.contains('delete-item')) {
        //confirm is like alert but it asks yes or no
        if (confirm("Are you sure?")) {
            e.target.parentElement.parentElement.remove(); //removes the li item in the DOM

            //Remove from the LocalStorage
            //first get the tasks array from localStorage
            tasks = JSON.parse(localStorage.getItem('tasks'));
            //get the index of the li to be deleted from the tasks array and store it in delIndex
            delIndex = tasks.indexOf(e.target.parentElement.parentElement.textContent);
            //delete the item from the tasks array
            tasks.splice(delIndex, 1);

            //set the new tasks as the tasks array in LocalStorage
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    } 
    e.preventDefault();
}


//Function to clear all the tasks from the tasklist ul
function clearTasks(e){
    //If there are items in the TaskList, i.e. if the task list is not empty
    if (localStorage.getItem('tasks') !=null){
        //confirmation alert
        if (confirm('Are you sure?')){
            //first remove from the dom then from local storage
            //There are 2 ways to do this
            //First way
            // if (confirm('Are you sure?')){
            //     taskList.innerHTML = '';
            // }

            //Second way (This is way much faster)
            //while there is still a firstChild in the taskList ul
            
            while(taskList.firstChild){
                taskList.firstChild.remove();
            }

            //clear the localstorage
            localStorage.clear();
        }
    }
    else {
        alert("No tasks to clear!")
    }
}


//Function to filter/search tasks in the TaskList ul
function filterTasks(e){
    //e.target.value gives us whatever is being typed in the real time (dynamically) because the eventType is 'keyup' in our eventListener
    //so filterText is the realtime text being typed by the user
    filterText = e.target.value.toLowerCase(); //Convert the filter text as well as the list items to lowercase for proper filtering

    //Loop through the childNodes of the TaskList ul to see if they contain the given filter Text or not
    taskList.childNodes.forEach(function(task){
        //indexof() finds the index of the filterText in the textcontent of the list items
        //if the filtertext is not in the list items' text content, then it returns -1

        //if the listitem does not contain the filterText, set it's display property to 'none'
        if (task.textContent.toLowerCase().indexOf(filterText) == -1){
            task.style.display = 'none';
        }
        //else leave it as 'block'
        else {
            task.style.display = 'block';
        }
    })
}


//Load tasks from the localstorage to be rendered in the DOM
function loadTasks(){
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    //Now using the task items in the 'tasks' array from the LocalStorage, we will create the taskList list items which will be rendered in the DOM 
    tasks.forEach(function(task){
        //Same as the addTask() function        
        const li = document.createElement('li');
        li.className = 'collection-item'; 
        //Create a textNode and append it to the the li
        li.appendChild(document.createTextNode(task));
        //Create a link and append it to the li
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content' 
        link.innerHTML = '<i class = "fas fa-remove"></i>'; 
        li.appendChild(link);
        //Finally append the li into the ul
        taskList.appendChild(li);
    })
}


//function to Store tasks into the localStorage so that they will persist even after the page refresh/reload
function storeTasksInLocalStorage(newTask){
    //get a parsed version of the tasks array from the localstorage
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    //tasks is an array so we can push new task into it
    tasks.push(newTask);
    //finally replace the tasks array in the localstorage by the new version of that we have created
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
