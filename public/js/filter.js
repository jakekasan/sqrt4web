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
        let courseText = (this.getDataText(course)).toString().toLowerCase();
        console.log("Course Text");
        console.log(courseText);

        // courseText = courseText.split(" ");

        let filterTags = this.getFilterTags();

        if (filterTags.length < 1) return true

        for (let tag of filterTags){
            tag = tag.toLowerCase();
            if (courseText.includes(tag)){
                return true
            }
        }
        return false
    }

    getFilterTags(){
        let tags = Array.from(this.tagContainer.querySelectorAll(".tag"));

        console.log("Begin getFilterTags");
        console.log("Tags:")
        console.log(tags);
        

        if (tags == null) return []

        let tagText = tags.map(element => {
            let raw = element.dataset.text;
            return raw.toString();
        });

        console.log("Tag text");
        console.log(tagText);

        // tagText = tagText
        //             .reduce((acc,elem) => {
        //                 return acc.concat(elem)
        //             },[])

        return tagText
    }

    getDataText(data){
        if (typeof data == "object"){
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

        if (typeof data == "string" || typeof data == "number"){
            return data
        }

        return [""]
    }
}

