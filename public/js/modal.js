var modal = document.querySelector(".modal");
var closeButton = document.querySelector(".modal-close");

function toggleModal() {
    modal.classList.toggle("show-modal");
}


function fillModalWithImage(imageLink){
    let modalContent = (document.querySelector(".modal")).querySelector(".modal-content");
    modalContent.innerHTML = "";

    let image = document.createElement("img");
    image.classList.add("modal-image");
    image.src = imageLink;

    modalContent.appendChild(image);
}

function fillModalWithLesson(id){

    let data = _cachedData.filter(item => item.id == id)[0];
    // console.log(_cachedData);
    // console.log(data);

    if (!data) return

    let modalContent = (document.querySelector(".modal")).querySelector(".modal-content");
    modalContent.innerHTML = "";

    let closeButton = document.createElement("span");
    closeButton.classList.add("modal-close");
    closeButton.innerHTML = "&times;";

    //let courseElement = modal.querySelector(".course");
    let courseElement = document.createElement("form");
    courseElement.classList.add("course");
    courseElement.method = "POST";
    courseElement.name = "moduleSelectionForm";

    courseElement.innerHTML = "";

    let title = document.createElement("div");
    title.classList.add("title");
    title.innerText = data.title;

    courseElement.appendChild(title);

    let description = document.createElement("div");
    description.classList.add("description");
    description.innerText = data.fullDesc;

    courseElement.appendChild(description);

    // value for course ID
    let courseID = document.createElement("input");
    courseID.type = "hidden";
    courseID.name = "id";
    courseID.value = data.id;

    courseElement.appendChild(courseID);

    data.modules.forEach((item) => {
        
        let iconLabel = document.createElement("label");
        iconLabel.classList.add("icon-label");
        let iconInput = document.createElement("input");
        iconInput.type = "checkbox";
        iconInput.name = "modules";
        iconInput.value = item.id;
        iconInput.checked = true;

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
    // buttonContainer.addEventListener("click",() => {
    //     console.log("Button pressed!")
    //     courseElement.submit();
    // });

    courseElement.addEventListener("submit",(event) => {
        // event.preventDefault();
        // console.log("Form submitted!");
        console.log(event);
    })

    let button = document.createElement("button");
    button.type = "submit";
    button.innerText = "SPUSTIT";

    buttonContainer.appendChild(button);
    buttonModuleContainer.appendChild(buttonContainer);

    courseElement.appendChild(buttonModuleContainer);

    modalContent.appendChild(closeButton);
    modalContent.appendChild(courseElement);
}

window.addEventListener("load",() => {
    console.log("Page loaded");

    modal = document.querySelector(".modal");
    closeButton = document.querySelector(".modal-close");


    function windowOnClick(event) {
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
        let modal = document.querySelector(".modal");
        if (modal.classList.contains("show-modal") && event.target === modal) {
            modal.classList.toggle("show-modal");
        }
    });
    
    // modal.addEventListener("click",(event) => {
    //     console.log("modal clicked!");
    //     console.log(event.target);

    //     let modalContent = document.querySelector(".modal-content");

    //     if (!modalContent.contains(event.target) && event.target !== modalContent){
    //         let modal = document.querySelector(".modal");
    //         if (modal.classList.contains("show-modal")){
    //             modal.classList.toggle("show-modal");
    //         }
    //     }
    // })
})

// trigger.addEventListener("click",toggleModal);
// closeButton.addEventListener("click",toggleModal);
// window.addEventListener("click",windowOnClick);

