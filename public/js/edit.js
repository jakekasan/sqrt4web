document.addEventListener("DOMContentLoaded",() => {

    // add Button event listener

    let addProjectButton = document.querySelector("#addProjectButton");

    let addLessonButton = document.querySelector("#addLessonButton");


    // add listeners for existing list item

    let lessonsList = document.querySelector("#lessons");
    let projectsList = document.querySelector("#projects");

    console.log("items");
    let lessons = Array.from(lessonsList.children);
    lessons.map(item => {
        let buttons = item.querySelector(".item-buttons");
        let editButton = buttons.children[0];
        let deleteButton = buttons.children[1];
        
        editButton.addEventListener("click",(event) => {
            editButtonClickEvent({
                event:event,
                listItem:item
            });
        })

        deleteButton.addEventListener("click", (event) => {
            deleteButtonClickEvent({
                event: event,
                listItem:item
            })
        })

    })
    // lessonsList.children.forEach(child => {
    //     let editButton = child.querySelectorAll(".container-buttons");
    // })

    // console.log(lessonsList.children);
    // console.log(projectsList.children);

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

            let containerListItem = createLessonItem({
                title: dataItem.title,
                id: dataItem.id,
                type: type,
                list: list
            })

            list.appendChild(containerListItem);

            modal.classList.remove("show-modal");
        })

        modalList.appendChild(listItem);
    }

    modalContent.appendChild(modalList);

    modal.classList.add("show-modal");
}

function createLessonItem(params){
    let { title, id, type, list } = params;

    // create parent list item
    let containerListItem = document.createElement("div");
    containerListItem.classList.add("container-list-item");

    // title element
    let listItemTitle = document.createElement("div");
    listItemTitle.classList.add("item-title")
    listItemTitle.innerText = title;

    let buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("item-buttons");

    // EDIT BUTTON
    let editButton = document.createElement("div");
    editButton.classList.add("button");
    editButton.innerText = "Edit";
    editButton.addEventListener("click",(event) => {
        editButtonClickEvent({
            event: event,
            listItem: containerListItem
        });
    })

    // DELETE BUTTON
    let deleteButton = document.createElement("div");
    deleteButton.classList.add("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click",(event) => {
        deleteButtonClickEvent({
            event: event,
            listItem: containerListItem
        });
    })

    // HIDDEN INPUT
    let hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = `${type}s[]`
    hiddenInput.value = id;

    buttonsContainer.appendChild(editButton);
    buttonsContainer.appendChild(deleteButton);

    containerListItem.appendChild(listItemTitle);
    containerListItem.appendChild(buttonsContainer);

    return containerListItem
}

function editButtonClickEvent(params){
    let { event, listItem } = params;
    let target = event.target;
    while (!target.classList.contains("container-list-item")){
        target = target.parentNode;
    }
    console.log("Clicked edit button for",target);
}

function deleteButtonClickEvent(params){
    let { event, listItem } = params;
    let target = event.target;
    console.log(target.classList);
    console.log("Checking",target);
    while (!(target.classList.contains("container-list-item"))){
        target = target.parentNode;
        console.log("Checking",target);
    }

    (listItem.parentNode).removeChild(listItem);
}