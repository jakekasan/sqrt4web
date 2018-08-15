window.onload = function(){
    console.log("window loaded!");

    let mainCardContent = document.getElementById("dataAttribute");

    
}

function loadData(data){
    // select card content
    let mainCardContent = document.getElementById("dataAttribute");

    let attrs = data["data"];

    for (let attr of attrs){
        // for each attribute,add a card with the elements

        // if attribute is a participant
        if (attr[0]["type"] == "participant"){
            // make unordered list
            let ul = document.createElement("ul");
            ul.className = "collection";

            for (let person in attr){
                // holder for list item
                let li = document.createElement("li");
                li.className = "collection-item avatar";

                // icon for list item (will be an http request)
                let i = document.createElement("i");
                i.className = "material-icons";
                i.innerText = "search";

                let span = document.createElement("span");
                span.className = "title";
                span.innerText = person["name"];

                let p = document.createElement("p");
                p.innerText = person["address"];

                li.appendChild(i).appendChild(span).appendChild(p);
                ul.appendChild(li);
            }
        } else {
            for (let thing of attr){
                // holder for list item
                let li = document.createElement("li");
                li.className = "collection-item avatar";

                // icon for list item (will be an http request)
                let i = document.createElement("i");
                i.className = "material-icons";
                i.innerText = "search";

                let span = document.createElement("span");
                span.className = "title";
                span.innerText = thing["name"];

                let p = document.createElement("p");
                p.innerText = JSON.stringify(thing);

                li.appendChild(i).appendChild(span).appendChild(p);
                ul.appendChild(li);
            }
        }


    }
}