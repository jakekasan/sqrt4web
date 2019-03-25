document.addEventListener("DOMContentLoaded",() => {
    let uls = document.querySelectorAll("ul.icons");
    [...uls].forEach(ul => {
        [...(ul.querySelectorAll("li"))].forEach(item => {
            item.addEventListener("click",(event) => {
                [...item.parentNode.children].forEach(sibling => {
                    sibling.classList.remove("selected");
                })
                item.classList.add("selected");
            })
        })
    });
    
})