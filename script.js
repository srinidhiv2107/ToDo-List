var count = 0;
var tasks = document.getElementById("tasks");

function addNewTask() {
    var input = document.getElementById("new_task");

    if(input.value === "") {
        --count; return;
    }

    if(isPresent(input.value.trim())) {
        --count;
        Toastify({
            text: "The task is already added!!", duration: 3000,
        }).showToast();
        return;
    }

    var task = document.createElement("li");

    const priority = document.createElement("input");
    priority.setAttribute("type", "text");
    priority.setAttribute("readonly", "true")
    priority.setAttribute("value", count.toString());
    var initial_value = priority.value;
    task.appendChild(priority);

    priority.classList.add("Priority");

    priority.addEventListener("click", function() {
        priority.readOnly = false;
    });

    priority.addEventListener("keypress", function(event) {
        if(event.key === "Enter") {
            priority.readOnly = true;
            if(priority.value !== initial_value) {
                changePriorities(task, parseInt(priority.value));
                initial_value = priority.value;
            }
        }
    });

    const task_text = document.createElement("p");
    task_text.textContent = input.value.trim();
    task.appendChild(task_text);

    task_text.classList.add("TaskText");

    const del_button = document.createElement("button");
    del_button.textContent = "X";
    task.appendChild(del_button);

    del_button.classList.add("Delete");

    del_button.addEventListener("click", function () {
        --count;
        const priority_number = parseInt(priority.value);
        tasks.removeChild(task);
        reduceByOne(priority_number);
    });

    tasks.appendChild(task);
    input.value = "";
}

document.getElementById("add_task").addEventListener("click", function() {
    ++count;
    addNewTask();
});
document.getElementById("new_task").addEventListener("keypress", function(event) {
    if(event.key === "Enter") {
        ++count;
        addNewTask();
    }
});

function reduceByOne(priority_number) {
    const list_items = tasks.getElementsByTagName("li");

    for(let i = priority_number - 1; i < list_items.length; ++i) {
        const list_item = list_items[i];
        const i_priority = list_item.querySelector(".Priority");

        const new_priority_num = i_priority.value - 1;
        i_priority.readOnly = false;
        i_priority.value = new_priority_num;
        i_priority.readOnly = true;
    }
}

function isPresent(task_text) {
    const list_items = tasks.getElementsByTagName("li");

    for(let i = 0; i < list_items.length; ++i) {
        const list_item = list_items[i];
        const list_item_text = list_item.querySelector(".TaskText").textContent;
        if(list_item_text.toLowerCase() === task_text.toLowerCase())
            return true;
    }
    return false;
}

function changePriorities(list_item, new_priority_num) {
    tasks.removeChild(list_item);
    if(new_priority_num <= 0) {
        const priority = list_item.querySelector(".Priority");
        priority.readOnly = false;
        priority.value = 1;
        priority.readOnly = true;
        tasks.insertBefore(list_item, tasks.children[0]);
    }
    else if(new_priority_num >= tasks.children.length)
        tasks.appendChild(list_item);
    else
        tasks.insertBefore(list_item, tasks.children[new_priority_num - 1]);
    reset();
}

function reset() {
    const list_items = tasks.getElementsByTagName("li");
    for(var i = 0; i < list_items.length; ++i) {
        const list_item = list_items[i];
        console.log(list_item.querySelector(".TaskText").textContent);
        const i_priority = list_item.querySelector(".Priority");
        i_priority.readOnly = false;
        i_priority.value = i + 1;
        console.log(i_priority.value);
        i_priority.readOnly = true;
    }
}
