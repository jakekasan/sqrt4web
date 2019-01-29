var _cachedData = [];

// select grid container
var gridContainer = document.querySelector(".grid-container");

function addGridCard(record){
    
    // check in case data is incomplete
    let title = (record.title) ? record.title : "No title given"

    let desc = (record.desc) ? record.desc : "No description has been given for this data"

    let time = (record.modules) ? record.modules.reduce((acc,ele) => { return acc+ele.minutes },0) : 0;

    // parent card element
    let card = document.createElement("div");
    card.className = "item card";

    // card content element
    let cardContent = document.createElement("div");
    cardContent.className = "card-content";

    // title element
    let cardTitle = document.createElement("div");
    cardTitle.className = "title";
    cardTitle.innerText = title;

    // description element
    let cardDescription = document.createElement("div");
    cardDescription.className = "description";
    cardDescription.innerText = desc;

    // time element
    let cardTime = document.createElement("div");
    cardTime.className = "time";
    cardTime.innerText = time + " mins";

    // append EVERYTHING!!!!
    cardContent.appendChild(cardTitle);
    cardContent.appendChild(cardDescription);
    cardContent.appendChild(cardTime);

    card.appendChild(cardContent);

    gridContainer.appendChild(card);
}

function fetchData(){
    fetch("/api/data/courses")
        .then(data => data.json())
        .then(data => {
            data.forEach(element => {
                _cachedData.push(element);
                addGridCard(element);
            });
        })
        .catch(err => {
            console.log(err);
        })
}

document.addEventListener("DOMContentLoaded",() => {
    fetchData();
})

class Paginator {
    constructor(){
        this.itemsPerPage = 12;
        this.pages = {};
        this.data = [];
        this.currentPage = 1;
        this.renderedPageNumbers;
    }

    setPages(){
        var pageCount = 1;
        for (let i = 0; i < this.data.length; i++) {
            if (!this.pages[pageCount]){
                this.pages[pageCount] = this.data[i];
            } else {
                this.pages[pageCount].push(this.data[i]);
            }
            if (this.itemsPerPage % i == 0) {
                pageCount++;
            }
        }
    }

    renderPagination(){
        // select the necessary elements

        let pagination = document.querySelector(".pagination");
        let leftArrow = document.querySelector(".left");
        let rightArrow = document.querySelector(".right");

        let validPages = Object.keys(this.pages);

    }




}