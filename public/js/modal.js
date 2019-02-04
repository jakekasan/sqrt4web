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

function fillModal(target){
    let data = _cachedData.filter(item => item.id == target.dataset.id)[0];

    let courseElement = modal.querySelector(".course");

    courseElement.innerHTML = "";

    let title = document.createElement("div");
    title.classList.add("title");

    let description = document.createElement("div");
    title.classList.add("description");

    data.modules.forEach(item => {
        let icon = document.createElement("div");
        icon.classList.add("module-icon");

        let text = document.createElement("div");
        text.classList.add("module-text");

        let minutes = document.createElement("div");
        minutes.classList.add("module-minutes");

        let moduleChoice = document.createElement("div");
        moduleChoice.classList.add("module-choice");

        moduleChoice.appendChild(icon);
        moduleChoice.appendChild(text);
        moduleChoice.appendChild(minutes);

        courseElement.appendChild


    });
}

trigger.addEventListener("click",toggleModal);
closeButton.addEventListener("click",toggleModal);
window.addEventListener("click",windowOnClick);