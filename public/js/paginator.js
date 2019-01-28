var _cachedData = [];

// select grid container
var gridContainer = document.querySelector(".grid-container");

function addGridCard(record){
    
    // check in case data is incomplete
    let title = (record.title) ? record.title : "No title given"

    let desc = (record.desc) ? record.desc : "No description has been given for this data"

    let time = (record.time) ? record.time : 0;

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
    cardDescription = desc;

    // time element
    let cardTime = document.createElement("div");
    cardTime.className = "time";
    cardTime.innetText = time;

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
                _cachedData.append(element);
                addGridCard(element);
            });
        })
        .catch(err => {
            console.log(err);
        })
}