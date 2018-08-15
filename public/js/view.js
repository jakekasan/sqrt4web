window.onload = function(){
    console.log("window loaded!");

    let mainCardContent = document.getElementById("dataAttribute");

    let url = new URL("http://localhost:8080/api/data");
    url.search = new URLSearchParams({
        id:0
    });

    fetch(url)
        .then(data => data.json())
        .then(data => loadData(data));
}


// data is the json of the record one wishes to view

function loadData(data){
    // select card content
    let mainCardContent = document.getElementById("dataAttribute");

    let essentials = ["id","name","description"]

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const element = data[key];
            if (key == "id"){
                console.log(`id is ${data[key]}`);
            } else if (key == "description"){
                console.log(`description is ${data[key]}`)
            } else {
                console.log(`${key} : ${element}`);
            }
            
        }
    }
    
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