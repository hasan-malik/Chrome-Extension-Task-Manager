const ulEl = document.querySelector("#ul-el");
const initialTasks = [
    "Email Prof. Riley",
    "Cancel tennis.tv subscription",
    "Top up my Scotiabank bill",
    "Order a new phone case",
];
let currTasks = [];
const finishedOptions = [];
const options = document.querySelector("#options");
const hero = document.querySelector("#hero");

ulEl.innerHTML = "";

if (!localStorage.getItem("alltasks") || localStorage.getItem("alltasks") == "[]") {
    localStorage.setItem("alltasks", JSON.stringify(currTasks));
    for (i = 0; i < initialTasks.length; i++) {
        renderInitialTask(initialTasks[i]);
    }
} else {
    currTasks = JSON.parse(localStorage.getItem("alltasks"));
    renderAllTasks();
}

function renderInitialTask(task) {
    ulEl.innerHTML += `<li class="initial-task">${task}</li>`;
}

function renderAllTasks() {
    ulEl.innerHTML = "";

    for (i = 0; i < currTasks.length; i++) {
        renderTask(currTasks[i]);
    }

    if (!ulEl.innerHTML) {
        const Guideline = document.createElement("h3");
        Guideline.setAttribute("id", "no-tasks-guideline");
        Guideline.innerHTML =
            "No <span class='special'><u>tasks</u></span> added yet.";

        ulEl.append(Guideline);
    }
}

function renderTask(task) {
    ulEl.innerHTML += `<li class="task">${task}</li>`;
}

const removeTaskBtn = document.querySelector("#remove-task-btn");
const OperationalDiv = document.querySelector("#operational-div");

document.body.addEventListener("click", function () {
    renderAllTasks();
});

removeTaskBtn.addEventListener("click", function () {
    OperationalDiv.innerHTML = "";

    if (currTasks.length === 0) {
        OperationalDiv.innerHTML =
            "<h3 id='empty-guideline'>There are no <span class='special'><u>tasks</u></span> to remove.</h3>";
        return;
    }

    const removeTaskEnter = document.createElement("input");
    removeTaskEnter.setAttribute("id", "remove-task-input");
    removeTaskEnter.setAttribute("type", "number");
    removeTaskEnter.setAttribute("placeholder", "0");
    removeTaskEnter.setAttribute("min", "1");
    removeTaskEnter.setAttribute("max", `${currTasks.length}`);

    const removeTaskSubmitBtn = document.createElement("button");
    removeTaskSubmitBtn.setAttribute("id", "remove-task-submit-btn");
    removeTaskSubmitBtn.textContent = "submit";

    const Guideline = document.createElement("h3");
    Guideline.setAttribute("id", "remove-guideline");
    Guideline.innerHTML =
        "Select the <span class='special'><u>number</u></span> of the <span class='special'><u>task</u></span> you want to remove, then hit <span class='special'><u>submit</u></span>.";

    const removeAllBtn = document.createElement("button");
    removeAllBtn.textContent = "remove all";
    removeAllBtn.setAttribute("id", "remove-all-btn");

    const containerDiv = document.createElement("div");
    containerDiv.setAttribute("id", "container-div");
    containerDiv.append(removeTaskEnter);
    containerDiv.append(removeTaskSubmitBtn);
    containerDiv.append(removeAllBtn);

    OperationalDiv.append(Guideline);
    OperationalDiv.append(containerDiv);

    removeTaskSubmitBtn.addEventListener("click", function () {
        if (removeTaskEnter.value === "") {
            OperationalDiv.innerHTML = "";
            Guideline.innerHTML =
                "Please select the <span class='special'><u>task</u></span> number for removal.";
            OperationalDiv.append(Guideline);
        } else if (
            parseInt(removeTaskEnter.value) < 1 ||
            parseInt(removeTaskEnter.value) > currTasks.length
        ) {
            OperationalDiv.innerHTML = "";
            Guideline.innerHTML =
                "<span id='wrong-done-guideline'>Select a valid <span class='special'><u>task</u></span> number.</span>";
            OperationalDiv.append(Guideline);

            setTimeout(function () {
                Guideline.innerHTML = "";
            }, 4000);
            return;
        } else {
            currTasks.splice(parseInt(removeTaskEnter.value) - 1, 1);
            localStorage.setItem("alltasks", JSON.stringify(currTasks));

            renderAllTasks();

            OperationalDiv.innerHTML = "";
            Guideline.innerHTML =
                "<span id='done-guideline'><u>Removed!</u></span>";
            OperationalDiv.append(Guideline);
        }

        setTimeout(function () {
            Guideline.innerHTML = "";
        }, 4000);
    });

    removeAllBtn.addEventListener("click", function () {
        currTasks.splice(0);
        localStorage.setItem("alltasks", JSON.stringify(currTasks));
        renderAllTasks();

        OperationalDiv.innerHTML = "";
        Guideline.innerHTML =
            "<span id='done-guideline'><u>Removed!</u></span>";
        OperationalDiv.append(Guideline);

        setTimeout(function () {
            Guideline.innerHTML = "";
        }, 4000);
    });
});

const addTaskBtn = document.getElementById("add-task-btn");

addTaskBtn.addEventListener("click", function () {
    OperationalDiv.innerHTML = "";

    const Guideline = document.createElement("h3");
    Guideline.setAttribute("id", "add-guideline");
    Guideline.innerHTML =
        "Add a new <span class='special'><u>task</u></span> and click submit.";

    const addTaskEnter = document.createElement("input");
    addTaskEnter.setAttribute("id", "add-task-input");
    addTaskEnter.setAttribute("type", "text");
    addTaskEnter.setAttribute("placeholder", "Add a task:");
    addTaskEnter.setAttribute("maxlength", "100");

    const addTaskSubmitBtn = document.createElement("button");
    addTaskSubmitBtn.setAttribute("id", "add-task-submit-btn");
    addTaskSubmitBtn.textContent = "submit";

    const containingDiv = document.createElement("div");
    containingDiv.setAttribute("id", "containing-div");
    containingDiv.append(Guideline);
    containingDiv.append(addTaskEnter);
    containingDiv.append(addTaskSubmitBtn);

    OperationalDiv.append(containingDiv);

    addTaskSubmitBtn.addEventListener("click", function () {
        if (addTaskEnter.value) {
            if (currTasks.includes(addTaskEnter.value)) {
                OperationalDiv.innerHTML = "";
                Guideline.innerHTML =
                    "<span id='done-guideline'>This <u>task</u> is already added.</span>";
                OperationalDiv.append(Guideline);
            } else {
                currTasks.push(addTaskEnter.value);
                localStorage.setItem("alltasks", JSON.stringify(currTasks));
                renderAllTasks();
                OperationalDiv.innerHTML = "";
                Guideline.innerHTML =
                    "<span id='done-guideline'><u>Added!</u></span>";
                OperationalDiv.append(Guideline);
            }
        } else {
            OperationalDiv.innerHTML = "";
            Guideline.innerHTML =
                "<span id='wrong-done-guideline'>Please write your <span class='special'><u>task</u></span> before clicking submit.</span>";
            OperationalDiv.append(Guideline);
        }

        setTimeout(function () {
            Guideline.innerHTML = "";
        }, 4000);
    });
});

const reorderBtn = document.querySelector("#reorder-btn");
reorderBtn.addEventListener("click", function () {
    OperationalDiv.innerHTML = "";

    let Guideline = document.createElement("h3");
    Guideline.setAttribute("id", "add-guideline");
    Guideline.innerHTML =
        "Which <span class='special'><u>task</u></span> do you want to move? Select by <span class='special'><u>task</u></span> number.";

    OperationalDiv.append(Guideline);

    if (currTasks.length <= 1) {
        if (currTasks.length === 0) {
            Guideline.innerHTML =
                "You don't have any <span class='special'><u>tasks</u></span> to reorder.";
        } else if (currTasks.length === 1) {
            Guideline.innerHTML =
                "You only have one current <span class='special'><u>task.</u></span> Reordering is <span class='special'><u>not</u></span> possible.";
        }

        setTimeout(function () {
            Guideline.innerHTML = "";
        }, 4000);
        return;
    }

    const reorderEnter = document.createElement("input");
    reorderEnter.setAttribute("id", "reorder-input");
    reorderEnter.setAttribute("type", "number");
    reorderEnter.setAttribute("placeholder", "0");
    reorderEnter.setAttribute("min", "1");
    reorderEnter.setAttribute("max", `${currTasks.length}`);

    const reorderUpBtn = document.createElement("button");
    reorderUpBtn.setAttribute("id", "reorder-up-btn");
    reorderUpBtn.textContent = "up";

    const reorderDownBtn = document.createElement("button");
    reorderDownBtn.setAttribute("id", "reorder-down-btn");
    reorderDownBtn.textContent = "down";

    const finishBtn = document.createElement("button");
    finishBtn.setAttribute("id", "finish-btn");
    finishBtn.textContent = "finish reordering";

    const div1 = document.createElement("div");
    div1.setAttribute("id", "div1");
    const div2 = document.createElement("div2");
    div2.setAttribute("id", "div2");

    div1.append(reorderEnter);
    div1.append(reorderUpBtn);
    div1.append(reorderDownBtn);
    div2.append(finishBtn);

    const bigDiv = document.createElement("div");
    bigDiv.setAttribute("id", "big-div");
    bigDiv.append(div1);
    bigDiv.append(div2);

    OperationalDiv.append(bigDiv);

    console.log(OperationalDiv.innerHTML);

    reorderUpBtn.addEventListener("click", function () {
        let taskIndex = parseInt(reorderEnter.value) - 1;

        if (taskIndex === 0) {
            OperationalDiv.innerHTML = "";
            Guideline.innerHTML =
                "<span id='wrong-done-guideline'>The selected <span class='special'><u>task</u></span> is already at the <span class='special'><u>first</u></span> priority.</span>";
            OperationalDiv.append(Guideline);

            setTimeout(function () {
                bigDiv.innerHTML = "";
            }, 4000);
            return;
        }

        if (taskIndex < 0 || taskIndex > currTasks.length - 1) {
            OperationalDiv.innerHTML = "";
            Guideline.innerHTML =
                "<span id='wrong-done-guideline'>Select a valid <span class='special'><u>task</u></span> number.</span>";
            OperationalDiv.append(Guideline);

            setTimeout(function () {
                bigDiv.innerHTML = "";
            }, 4000);
            return;
        }

        pushUp(taskIndex);
        localStorage.setItem("alltasks", JSON.stringify(currTasks));
        reorderEnter.value = taskIndex--;
        renderAllTasks();
    });

    reorderDownBtn.addEventListener("click", function () {
        let taskIndex = parseInt(reorderEnter.value) - 1;

        if (taskIndex === currTasks.length - 1) {
            OperationalDiv.innerHTML = "";
            Guideline.innerHTML =
                "<span id='wrong-done-guideline'>The selected <span class='special'><u>task</u></span> is already at the <span class='special'><u>last</u></span> priority.</span>";
            OperationalDiv.append(Guideline);

            setTimeout(function () {
                bigDiv.innerHTML = "";
            }, 4000);
            return;
        }

        if (taskIndex < 0 || taskIndex > currTasks.length - 1) {
            OperationalDiv.innerHTML = "";
            Guideline.innerHTML =
                "<span id='wrong-done-guideline'>Select a valid <span class='special'><u>task</u></span> number.</span>";
            OperationalDiv.append(Guideline);

            setTimeout(function () {
                bigDiv.innerHTML = "";
            }, 4000);
            return;
        }

        pushDown(taskIndex);
        localStorage.setItem("alltasks", JSON.stringify(currTasks));
        reorderEnter.value = taskIndex + 2;
        renderAllTasks();
    });

    finishBtn.addEventListener("click", function () {
        OperationalDiv.innerHTML = "";
        Guideline.innerHTML =
            "Reordering <span class='special'><u>completed.</u></span>";
        OperationalDiv.append(Guideline);

        setTimeout(function () {
            OperationalDiv.innerHTML = "";
        }, 4000);
    });
});

function pushUp(i) {
    const temp = currTasks[i];
    currTasks[i] = currTasks[i - 1];
    currTasks[i - 1] = temp;
}

function pushDown(i) {
    const temp = currTasks[i];
    currTasks[i] = currTasks[i + 1];
    currTasks[i + 1] = temp;
}
