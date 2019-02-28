document.addEventListener("DOMContentLoaded",() => {

    // add Button event listener

    let addProjectButton = document.querySelector("#addProjectButton");

    let addLessonButton = document.querySelector("#addLessonButton");

    addProjectButton.addEventListener("click",(event) => {
        // ASYNC load project list into modal
        console.log("addProjectClicked");
        fetch("/api/projects")
            .then(data => data.json())
            .then(data => {
                doModal({
                    type:"project",
                    data: data,
                    event: event
                });
            })
            .catch(e => console.log(e))
        

        // open modal
    })

    addLessonButton.addEventListener("click",(event) => {
        // ASYNC load project list into modal
        console.log("addProjectClicked");
        fetch("/api/lessons")
            .then(data => data.json())
            .then(data => {
                doModal({
                    type:"lesson",
                    data: data,
                    event: event
                });
            })
            .catch(e => console.log(e))
        

        // open modal
    })
})

function doModal(params){
    let { type, data, event } = params;

    let modal = document.querySelector(".modal");
    let modalContent = modal.querySelector(".modal-content");

    // clear inside the modal
    modalContent.innerHTML = "";

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
            let list = ((event.target.parent).parent).querySelector(".container-list");

            let containerListItem = document.createElement("div");
            containerListItem.classList.add("container-list-item");

            let listItemTitle = document.createElement("div");
            listItemTitle.classList.add("item-title")

            let buttonsContainer = document.createElement("div");
            buttonsContainer.classList.add("item-buttons");

            // EDIT BUTTON
            let editButton = document.createElement("div");
            editButton.classList.add("button");

            // DELETE BUTTON
            let deleteButton = document.createElement("div");
            deleteButton.classList.add("button");

            // HIDDEN INPUT
            let hiddenInput = document.createElement("input");
            hiddenInput.type = "hidden";
            hiddenInput.name = `${type}s[]`
            hiddenInput.value = dataItem.id;

            buttonsContainer.appendChild(editButton);
            buttonsContainer.appendChild(deleteButton);

            containerListItem.appendChild(listItemTitle);
            containerListItem.appendChild(buttonsContainer);

            modal.classList.remove("show-modal");
        })

        modalList.appendChild(listItem);
    }

    modalContent.appendChild(modalList);
    
    modal.classList.add("show-modal");
}

