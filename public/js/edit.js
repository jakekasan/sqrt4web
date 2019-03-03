document.addEventListener("DOMContentLoaded",() => {

    // add Button event listener

    let addProjectButton = document.querySelector("#addProjectButton");

    let addLessonButton = document.querySelector("#addLessonButton");

    addProjectButton.addEventListener("click",(event) => {
        // ASYNC load project list into modal
        console.log("addProject Clicked");

        // load the projects list and add it to doModal params
        let projectsList = document.querySelector("#projects")
        fetch("/api/projects")
            .then(data => data.json())
            .then(data => {

                // filter existing items from potential items
                let existingData = Array.from(projectsList.querySelectorAll(".container-list-item"));
                existingData = existingData.map(item => {
                    return parseInt((item.querySelector("input")).value)
                });
                data = data.filter(item => {
                    console.log(item.id);
                    return !existingData.includes(item.id);
                })

                doModal({
                    type:"project",
                    data: data,
                    event: event,
                    list: projectsList
                });
            })
            .catch(e => console.log(e))
        

        // open modal
    })

    let modal = document.querySelector(".modal");
    modal.addEventListener("click",(event) => {
        if (event.target != document.querySelector(".modal-content")){
            modal.classList.remove("show-modal");
        }
    })

    addLessonButton.addEventListener("click",(event) => {
        // ASYNC load project list into modal
        console.log("addLesson Clicked");

        // load the lessons list and add it to doModal params
        let lessonsList = document.querySelector("#lessons");

        fetch("/api/lessons")
            .then(data => data.json())
            .then(data => {
                // filter existing items from potential items
                let existingData = Array.from(lessonsList.querySelectorAll(".container-list-item"));
                existingData = existingData.map(item => {
                    return parseInt((item.querySelector("input")).value)
                });
                data = data.filter(item => {
                    console.log(item.id);
                    return !existingData.includes(item.id);
                })
                doModal({
                    type:"lesson",
                    data: data,
                    event: event,
                    list: lessonsList
                });
            })
            .catch(e => console.log(e))
    })
})

function doModal(params){
    let { type, data, event, list } = params;

    // log the event
    console.log(event);

    // filter data 

    let modal = document.querySelector(".modal");
    let modalContent = modal.querySelector(".modal-content");

    // clear inside the modal
    modalContent.innerHTML = "";

    // if data is nothing, add a message
    if (data.length < 1){
        let modalMessage = document.createElement("div");
        modalMessage.classList.add("modal-message");
        modalMessage.innerText = "No items to display";
        modalContent.appendChild(modalMessage);
        // skip out of function
        modal.classList.add("show-modal");
        return
    }
    

    let modalList = document.createElement("div");
    modalList.classList.add("modal-list");


    for (let dataItem of data){
        let listItem = document.createElement("div");
        listItem.classList.add("modal-list-item");
        listItem.innerText = dataItem.title;
        listItem.dataset.id = dataItem.id;
        listItem.dataset.title = dataItem.title;
        listItem.dataset.type = type;

        listItem.addEventListener("click",(e) => {
            // let list = ((event.target.parentElement).parentElement).querySelector(".container-list");

            // console.log(list);

            let containerListItem = document.createElement("div");
            containerListItem.classList.add("container-list-item");

            let listItemTitle = document.createElement("div");
            listItemTitle.classList.add("item-title")
            listItemTitle.innerText = dataItem.title;

            let buttonsContainer = document.createElement("div");
            buttonsContainer.classList.add("item-buttons");

            // EDIT BUTTON
            let editButton = document.createElement("div");
            editButton.classList.add("button");
            editButton.innerText = "Edit";

            // DELETE BUTTON
            let deleteButton = document.createElement("div");
            deleteButton.classList.add("button");
            deleteButton.innerText = "Delete";

            // HIDDEN INPUT
            let hiddenInput = document.createElement("input");
            hiddenInput.type = "hidden";
            hiddenInput.name = `${type}s[]`
            hiddenInput.value = dataItem.id;

            buttonsContainer.appendChild(editButton);
            buttonsContainer.appendChild(deleteButton);

            containerListItem.appendChild(listItemTitle);
            containerListItem.appendChild(buttonsContainer);

            list.appendChild(containerListItem);

            modal.classList.remove("show-modal");
        })

        modalList.appendChild(listItem);
    }

    modalContent.appendChild(modalList);

    modal.classList.add("show-modal");
}

