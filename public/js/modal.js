var modal = document.querySelector(".modal");
var trigger = document.querySelector(".modal-trigger");
var closeButton = document.querySelector(".modal-close");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

function fillModal(id){
    let data = _cachedData.filter(item => item.id == id)[0];
    console.log(_cachedData);
    console.log(data);

    if (!data) return

    let courseElement = modal.querySelector(".course");

    courseElement.innerHTML = "";

    let title = document.createElement("div");
    title.classList.add("title");
    title.innerText = data.title;

    courseElement.appendChild(title);

    let description = document.createElement("div");
    description.classList.add("description");
    description.innerText = data.fullDesc;

    courseElement.appendChild(description);

    data.modules.forEach((item) => {
        console.log(item);
        let icon = document.createElement("div");
        icon.classList.add("module-icon");

        let text = document.createElement("div");
        text.classList.add("module-text");
        text.innerText = item.title;

        let minutes = document.createElement("div");
        minutes.classList.add("module-minutes");
        minutes.innerText = item.minutes;

        let moduleChoice = document.createElement("div");
        moduleChoice.classList.add("module-choice");

        moduleChoice.appendChild(icon);
        moduleChoice.appendChild(text);
        moduleChoice.appendChild(minutes);

        courseElement.appendChild(moduleChoice);
    });

    let buttonModuleContainer = document.createElement("div");
    buttonModuleContainer.classList.add("module-button-container");

    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button");

    let button = document.createElement("button");
    button.type = "submit";
    button.innerText = "SPUSTIT";

    buttonContainer.appendChild(button);
    buttonModuleContainer.appendChild(buttonContainer);

    courseElement.appendChild(buttonModuleContainer);
}

trigger.addEventListener("click",toggleModal);
closeButton.addEventListener("click",toggleModal);
window.addEventListener("click",windowOnClick);