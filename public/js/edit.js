document.addEventListener("DOMContentLoaded",() => {

    // add Button event listener

    let addProjectButton = document.querySelector("#addProject");

    addProjectButton.addEventListener("click",() => {
        // ASYNC load project list into modal

        fetch("/api/projects")
            .then(data => data.json())
            .then(data => {
                openModal({
                    type:"project",
                    data: data
                });
            })
            .catch(e => console.log(e))
        

        // open modal
    })
})

function openModal(params){
    let { type, data } = params;

    let modal = document.querySelector(".modal");
    let modalContent = modal.querySelector(".modal-content");

    // clear inside the modal
    modalContent.innerHTML = "";

    let modalList = document.createElement("div");
    modalList.classList.add("modal-list");

    
}

