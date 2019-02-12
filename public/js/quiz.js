// function setMultiChoiceListeners(){

// }

document.addEventListener("DOMContentLoaded",() => {
    let selectable = document.querySelectorAll(".option");
    selectable.forEach((item) => {
        item.addEventListener("click",(event) => {
            console.log(`Selected ${event.target.value}`);
            item.classList.toggle("selected");
        })
    })
})