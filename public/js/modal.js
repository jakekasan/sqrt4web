var modal = document.querySelector(".modal");
var closeButton = document.querySelector(".modal-close");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function fillModalWithImage(imageLink){
    console.log("Loading image link",imageLink);

    if (isMobile()){
        console.log("Mobile. Cancelling modal.");
        return
    }

    let modalContent = (document.querySelector(".modal")).querySelector(".modal-content");
    modalContent.innerHTML = "";

    console.log(modalContent);

    let image = document.createElement("img");
    image.classList.add("modal-image");
    image.src = imageLink;

    let closeButton = document.createElement("span");
    closeButton.classList.add("modal-close");
    closeButton.innerHTML = "&times;";
    closeButton.addEventListener("click",() => {
        toggleModal();
    });

    modalContent.appendChild(closeButton);

    modalContent.appendChild(image);

    toggleModal();
}

function fillModalWithLesson(id){

    let data = _cachedData.filter(item => item.id == id)[0];

    console.log(data);
    // console.log(_cachedData);
    // console.log(data);

    if (!data) return

    let modalContent = (document.querySelector(".modal")).querySelector(".modal-content");
    modalContent.innerHTML = "";

    let closeButton = document.createElement("span");
    closeButton.classList.add("modal-close");
    closeButton.innerHTML = "&times;";
    closeButton.addEventListener("click",() => {
        toggleModal();
    });

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
    description.innerText = data.desc;

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
        minutes.innerText = (item.minutes == 1) ? `${item.minutes} minute`: `${item.minutes} minutes`;

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
    });

    courseElement.addEventListener("submit",(event) => {
        // event.preventDefault();
        // console.log("Form submitted!");
        console.log(event);
    })

    // let button = document.createElement("div");
    // button.type = "submit";
    // button.innerText = "SPUSTIT";

    let aTag = document.createElement("a");
    aTag.innerText = "SPUSTIT";

    // button.appendChild(aTag);

    // buttonContainer.appendChild(button);
    buttonContainer.appendChild(aTag);
    buttonModuleContainer.appendChild(buttonContainer);

    let moduleChoice = document.createElement("div");
    moduleChoice.classList.add("module-choice");
    moduleChoice.appendChild(buttonModuleContainer);

    courseElement.appendChild(moduleChoice);

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
})

// trigger.addEventListener("click",toggleModal);
// closeButton.addEventListener("click",toggleModal);
// window.addEventListener("click",windowOnClick);

function isMobile(){
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)) {
        return true;
    } else {
        return false;
    }
}