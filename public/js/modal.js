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

trigger.addEventListener("click",toggleModal);
closeButton.addEventListener("click",toggleModal);
window.addEventListener("click",windowOnClick);