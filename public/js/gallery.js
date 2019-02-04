class Gallery {
    constructor(data = null){
        this.data = data;
        this.currentItem = 0;
        this.mPaginator = new MiniPaginator(data = this.data, parent = this);

        this.setup();
    }

    setup(){
        this.render();
    }

    renderBigPicture(){
        // makes sure that the picture in the main module viewer is the right one

        let modulePicture = document.querySelector(".module-picture");

        let picture = modulePicture.getElementsByTagName("img")[0];

        let pictureURL = this.data[this.currentItem]["pictureURL"];

        // only change if the URL is incorrect
        if (picture.src != pictureURL){
            picture.src = pictureURL;
        } 
    }

    renderModuleText(){
        let moduleTextElement = document.querySelector(".module-text");

        moduleTextElement.innerText = this.data[this.currentItem];
    }

    changeSelection(newValue){
        if (newValue < this.data.length - 1) {
            this.currentItem = newValue;
        }
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
    constructor(target = null, data = null, parent = null){
        this.gallery = target || document.querySelector(".module-gallery");
        this.leftElem = this.gallery.querySelector(".left");
        this.rightElem = this.gallery.querySelector(".right");
        this.currentItems = this.gallery.querySelectorAll(".item");
        this.startingIndex = 0;
        this.data = data;
        this.parent = parent;

        this.currentItems.forEach((item) => {
            item.addEventListener("click",(event) => {
                this.parent.changeSelection(item.dataset.id);
            })
        });

        this.leftElem.addEventListener("click",() => {
            this.pageLeft();
        });

        this.rightElem.addEventListener("click",() => {
            this.pageRight();
        });
    }

    pageLeft(){
        if (this.startingIndex - this.currentItems.length > 0){
            this.startingIndex = startingIndex - this.currentItems.length;
        }
        this.render();
    }

    pageRight(){
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
                img.src = this.data[j].pictureURL;
                if (img.classList.contains("disabled")){
                    img.classList.toggle("disabled");
                }
                img.dataset.id = this.data[j].id;
            } else {
                if (!img.classList.contains("disabled")){
                    img.classList.toggle("disabled");
                }
            }
        })
    }
}