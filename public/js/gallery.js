class Gallery {
    constructor(data = null,target = null){
        this.data = data;
        this.target = target;
        this.currentItem = 0;
        this.mPaginator = new MiniPaginator(this.data.submodules, this.target, this);
        this.courseID = (document.querySelector(".course-details")).dataset.id;

        this.setup();
    }

    setup(){
        this.render();
    }

    

    renderBigPicture(){
        // makes sure that the picture in the main module viewer is the right one

        let modulePicture = this.target.querySelector(".module-picture");

        let picture = modulePicture.getElementsByTagName("img")[0];

        let pictureURL = "/img/courses/" + this.courseID + "/" + this.data.submodules[this.currentItem]["pictureURL"];

        // only change if the URL is incorrect
        if (picture.src != pictureURL){
            picture.src = pictureURL;
        } 
    }

    renderModuleText(){
        let moduleTextElement = this.target.querySelector(".module-text");

        let textContainer = moduleTextElement.querySelector(".text");

        while(textContainer.firstChild){
            textContainer.removeChild(textContainer.firstChild);
        }

        let texts = this.data.submodules[this.currentItem].text;

        if (this.data.submodules[this.currentItem].title){
            let subtitleText = this.data.submodules[this.currentItem].title;

            let h4 = document.createElement("div");
            h4.classList.add("text-segment");
            h4.classList.add("subtitle-segment");
            h4.innerText = subtitleText;

            textContainer.appendChild(h4);
        }

        texts.map((item,i) => {
            let newElem = document.createElement("div");

            newElem.classList.toggle("text-segment");
            newElem.innerHTML = item;

            textContainer.appendChild(newElem);
        });
    }

    changeSelection(newValue){
        console.log("Gallery.changeSelection",newValue);

        console.log(this.data);

        console.log(this.data.submodules[newValue]);

        if (newValue <= this.data.submodules.length - 1) {
            this.currentItem = newValue;
        }

        this.render();
    }

    renderGallery(){
        // maybe do pagination here?
    }

    render(){
        this.renderBigPicture();
        this.renderModuleText();
    }

    
}

class MiniPaginator {
    constructor(data, target, parent){
        this.gallery = target;
        //this.leftElem = target.querySelector(".left");
        //this.rightElem = target.querySelector(".right");
        this.currentItems = target.querySelectorAll(".item");
        this.startingIndex = 0;
        this.data = data;
        this.parent = parent;
        this.courseID = (document.querySelector(".course-details")).dataset.id;

        this.currentItems.forEach((item,i) => {
            
            item.dataset.id = i;
            
            item.addEventListener("click",(event) => {
                // console.log(`ID ${event.target.dataset.id} Clicked`)
                // console.log(event.target)
                console.log(event.target.parentElement);
                this.parent.changeSelection(event.target.parentElement.dataset.id);
            })
        });

        // this.leftElem.addEventListener("click",() => {
        //     this.pageLeft();
        // });

        // this.rightElem.addEventListener("click",() => {
        //     this.pageRight();
        // });

        this.render();
    }

    pageLeft(){
        console.log("Page Left");
        if (this.startingIndex - this.currentItems.length > 0){
            this.startingIndex = startingIndex - this.currentItems.length;
        }
        this.render();
    }

    pageRight(){
        console.log("Page Right");
        if (this.startingIndex + this.currentItems.length - 1 < this.data.length){
            this.startingIndex = startingIndex + this.currentItems.length;
        }
        this.render();
    }

    render(){
        this.currentItems.forEach((item,i) => {
            let img = item.getElementsByTagName("img")[0];

            let j = i + this.startingIndex;

            if (this.data[j] && this.data[j].pictureURL) {
                img.src = "/img/courses/" + this.courseID + "/" + this.data[j].pictureURL;
                if (img.classList.contains("disabled")){
                    img.classList.toggle("disabled");
                }
                item.dataset.id = j;
            } else {
                if (!img.classList.contains("disabled")){
                    img.classList.toggle("disabled");
                }
            }
        })
    }
}