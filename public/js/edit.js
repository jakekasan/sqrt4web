document.addEventListener("DOMContentLoaded",() => {

    // add Button event listener

    let addProjectButton = document.querySelector("#addProject");

    addProjectButton.addEventListener("click",(event) => {
        // ASYNC load project list into modal

        fetch("/api/projects")
            .then(data => data.json())
            .then(data => {
                openModal({
                    type:"project",
                    data: data,
                    event: event
                });
            })
            .catch(e => console.log(e))
        

        // open modal
    })
})

function doModal(params){
    let { type, data } = params;

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
    }
}

