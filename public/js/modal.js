var modal = document.querySelector(".modal");
var closeButton = document.querySelector(".modal-close");

function toggleModal() {
    modal.classList.toggle("show-modal");
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
        
        let iconLabel = document.createElement("label");
        iconLabel.classList.add("icon-label");
        let iconInput = document.createElement("input");
        iconInput.type = "checkbox";
        let iconSpan = document.createElement("span");
        iconSpan.classList.add("icon-checkmark");

        iconLabel.appendChild(iconInput);
        iconLabel.appendChild(iconSpan);

        let icon = document.createElement("div");
        icon.classList.add("module-icon");

        icon.appendChild(iconLabel);

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

    // button
    let buttonModuleContainer = document.createElement("div");
    buttonModuleContainer.classList.add("module-button-container");


    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button");
    buttonContainer.addEventListener("click",() => {
        console.log("Button pressed!")
        courseElement.submit();
    })

    // let button = document.createElement("button");
    // button.type = "submit";
    // button.innerText = "SPUSTIT";

    let button = document.createElement("a");
    // button.href = `/courses?id=${data.id}`;
    button.innerText = "SPUSTIT";

    buttonContainer.appendChild(button);
    buttonModuleContainer.appendChild(buttonContainer);

    courseElement.appendChild(buttonModuleContainer);
}

window.addEventListener("load",() => {
    console.log("Page loaded");

    let form = document.querySelector(".course");

    form.addEventListener("submit",(event) => {
        console.log("Form submitted!");
        event.preventDefault();
        console.log(event.value);
    })

    modal = document.querySelector(".modal");
    closeButton = document.querySelector(".modal-close");


    function windowOnClick(event) {
        console.log("windowOnClick");
        console.log(event);

        if (event.target === modal) {
            toggleModal();
        }
    }

    function toggleModal() {
        modal.classList.toggle("show-modal");
    }

    closeButton.addEventListener("click",() => {
        console.log("Close button clicked!")
        let modal = document.querySelector(".modal");
        if (modal.classList.contains("show-modal")){
            modal.classList.toggle("show-modal");
        }
    });

    window.addEventListener("click",(event) => {
        console.log("Window clicked!");
    });
    
    modal.addEventListener("click",(event) => {
        console.log("modal clicked!");
        console.log(event.target);

        let modalContent = document.querySelector(".modal-content");

        if (!modalContent.contains(event.target) && event.target !== modalContent){
            let modal = document.querySelector(".modal");
            if (modal.classList.contains("show-modal")){
                modal.classList.toggle("show-modal");
            }
        }
    })
})

// trigger.addEventListener("click",toggleModal);
// closeButton.addEventListener("click",toggleModal);
// window.addEventListener("click",windowOnClick);

