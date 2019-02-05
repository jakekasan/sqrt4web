const _cachedData = [];

// select grid container
var gridContainer = document.querySelector(".grid-container");

function addGridCard(record){
    
    // check in case data is incomplete
    let title = (record.title) ? record.title : "No title given"

    let desc = (record.desc) ? record.desc : "No description has been given for this data"

    let time = (record.modules) ? record.modules.reduce((acc,ele) => { return acc+ele.minutes },0) : 0;

    // parent card element
    let card = document.createElement("div");
    card.className = "item";

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

    card.dataset.id = record.id;

    card.addEventListener("click",(event) => {
        console.log("Card clicked!");
        console.log(record.id);
        fillModal(record.id);
        toggleModal();
    })

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

class Paginator {
    constructor(){
        this.itemsPerPage = 8;
        this.pages = {};
        this.data = [];
        this.currentPage = 1;
        this.pageNumberStart = 0;
        this.filter = new Filter(this);

        fetch("/api/data/courses")
            .then(data => data.json())
            .then(data => {
                this.data = data;
                data.forEach(item => _cachedData.push(item));
                this.setup();
            })
            .catch(err => {
                console.log(err);
            });
    }

    setup(){
        // set the data into pages
        this.setPages();

        // this.pageNumbersRender();

        let leftArrow = document.querySelector(".pagination-arrow.left");
        let rightArrow = document.querySelector(".pagination-arrow.right");

        leftArrow.addEventListener("click",()=> {
            console.log("leftArrow click");
            this.gridPageLeft();
        });

        rightArrow.addEventListener("click",()=> {
            console.log("rightArrow click");
            this.gridPageRight();
        });

        // set page number listeners
        let pageNumbers = document.querySelectorAll(".page-number");

        pageNumbers.forEach((item) => {
            item.addEventListener("click",(event) => {
                let newPageNumber = event.target.innerText;
                this.changeCurrentPageNumber(newPageNumber);
                console.log("Change page number",newPageNumber);
            });
        });

        // set page number arrow listeners
        let leftPageNumber = document.querySelector(".page-numbers-left");
        let rightPageNumber = document.querySelector(".page-numbers-right");
        
        leftPageNumber.addEventListener("click",() => {
            console.log("pageNumbersLeft");
            this.pageNumbersLeft();
        });

        rightPageNumber.addEventListener("click",() => {
            console.log("pageNumbersRight");
            this.pageNumbersRight();
        });

        console.log("Paginator setup complete.")
        console.log(this);

        this.update();
    }

    setPages(){
        // first get data from filter

        let data = this.filter.filterData(this.data);
        var pageCount = 1;

        this.pages = {};

        for (let i = 0; i < data.length; i++) {
            if (!this.pages[pageCount]){
                this.pages[pageCount] = [data[i]];
            } else {
                (this.pages[pageCount]).push(data[i]);
            }
            if (((i+1) % this.itemsPerPage == 0)) {
                pageCount++;
            }
        }
    }

    pageNumbersLeft(){
        if (this.pageNumberStart < 1){
            return
        } else {
            this.pageNumberStart = this.pageNumberStart - 1;
            return this.pageNumbersRender();
        }
    }

    pageNumbersRight(){
        if (this.pageNumberStart > 99){
            return
        } else {
            this.pageNumberStart = this.pageNumberStart + 1;
            return this.pageNumbersRender();
        }
    }

    calculateCurrentStartPage(){
             
        // generate array of 0's
        let tens = Array(100).fill(0);

        // change to 10s
        tens = tens.map((x,i) => { return (i+1)*10 });

        // get the first start value that's just below the current Page
        let start = tens.find(item => item >= this.currentPage) - 9;

    }

    pageNumbersRender(){
        let pageNumbers = document.querySelectorAll(".page-number");

        // clear pageNumber selection
        pageNumbers.forEach((element) => {
            if (element.classList.contains("selected")){
                element.classList.toggle("selected");
            }
            if (element.classList.contains("invalid")){
                element.classList.toggle("invalid");
            }
        });
   
        var start = (this.pageNumberStart*10)+1;

        for (let i = 0; i < 10; i++){
            pageNumbers[i].innerText = start + i;
            if (start + i == this.currentPage){
                pageNumbers[i].classList.toggle("selected");
            }

            if (!(Object.keys(this.pages).includes((start + i).toString()))){
                if (!pageNumbers[i].classList.contains("invalid")) {
                    pageNumbers[i].classList.toggle("invalid");
                }
            }
        };
    }

    changeCurrentPageNumber(pageNumber){
        if (Object.keys(this.pages).includes(pageNumber)) {
            this.currentPage = pageNumber;
            this.gridRender();
        }
    }

    gridRender(){
        // first render page numbers
        this.pageNumbersRender();

        // select the necessary elements

        let pagination = document.querySelector(".pagination");
        let leftArrow = document.querySelector(".left");
        let rightArrow = document.querySelector(".right");

        // check if we're on the last or first page

        if (this.currentPage == 1){
            if (!leftArrow.classList.contains("disabled")){
                leftArrow.classList.toggle("disabled");
            }
        } else {
            if (leftArrow.classList.contains("disabled")){
                leftArrow.classList.toggle("disabled");
            }
        }

        if (this.currentPage == 100){
            if (!rightArrow.classList.contains("disabled")){
                rightArrow.classList.toggle("disabled");
            }
        } else {
            if (rightArrow.classList.contains("disabled")){
                rightArrow.classList.toggle("disabled");
            }
        }


        // get and clear the grid
        let grid = document.querySelector(".grid-container");
        grid.innerHTML = "";
        
        let validPages = Object.keys(this.pages);

        // render content if we're on a page that should have data
        // if (!validPages.includes(this.currentPage)){
        //     return
        // }

        if(this.pages[this.currentPage]){
            this.pages[this.currentPage].map(item => addGridCard(item));
        }
    }

    gridPageLeft(){
        if (!(Object.keys(this.pages).includes((this.currentPage-1).toString()))){
            return
        } else {
            this.currentPage--;
            this.gridRender();
        }
    }

    gridPageRight(){
        if (!(Object.keys(this.pages).includes((this.currentPage+1).toString()))){
            return
        } else {
            this.currentPage++;
            this.gridRender();
        }
    }

    update(){
        this.setPages();
        this.gridRender();
    }
}


document.addEventListener("DOMContentLoaded",() => {
    const paginator = new Paginator();
})