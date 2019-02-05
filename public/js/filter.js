class Filter {
    constructor(parent){
        this.parent = parent;
        this.tagContainer = document.querySelector(".tag-list")
        this.tagInput = document.querySelector("#tagInput");
        this.tagElements = []

        this.setup();
    }

    setup(){
        // clear whatever tags may be

        this.tagContainer.innerHTML = "";

        this.tagInput.addEventListener("keyup",(event) => {
            if (event.keyCode === 13 && event.target.value != "") {
                this.addNewTag(event.target);
                event.target.value = "";
                this.parent.update();
            }
        })
    }

    addNewTag(target){
        let text = target.value;
        console.log(text);

        let tag = document.createElement("div");
        let tagContent = document.createElement("div");

        tag.dataset.text = text;
        tagContent.innerText = this.processText(text);
        tagContent.classList.add("content");

        tag.classList.add("tag");

        tag.appendChild(tagContent);

        tag.addEventListener("click",(event) => {
            this.tagContainer.removeChild(tag);
            this.parent.update();
        })

        this.tagContainer.appendChild(tag);
    }

    processText(text){
        if (text.length > 15){
            return text.slice(0,13) + "..."
        } else {
            return text
        }
    }

    filterData(data){
        return data.filter(item => this.filterCourse(item))
    }

    filterCourse(course){
        let courseText = this.getDataText(course);

        courseText = courseText.split(" ")

        let filterTags = this.getFilterTags();

        if (filterTags.length < 1) return true

        return filterTags
            .map(tag => {
                courseText.contains(tag);
            })
            .contains(true);
    }

    getFilterTags(){
        let tags = this.tagContainer.querySelector(".tag");

        if (tags == null) return []

        return tags
                .map(element => {
                    let raw = element.dataset.text;
                    return raw.split(" ")
                })
    }

    getDataText(data){
        if (data instanceof Object){
            let texts = Object.keys(data)
                .map(item => this.getDataText(data[item]))
                .reduce((acc,ele) => {
                    return acc + " " + ele
                },"")

            return texts
        }
        if (data instanceof Array){
            let texts = data.map(item => this.getDataText(item));
            return texts.reduce((acc,ele) => {
                return acc + " " + ele
            },"")
        }
        if (data instanceof String){
            return data
        }
    }
}

