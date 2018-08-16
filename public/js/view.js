function loadData(data){
    // select card content
    let mainCardData = document.getElementById("dataAttribute");

    let mainCardContent = document.getElementById("card-content");

    mainCardContent.innerHTML = "";

    let title = document.createElement("div");
    title.className = "card-title";
    let titleString = data["name"].charAt(0).toUpperCase() + data["name"].slice(1);
    title.innerText = titleString;

    let p = document.createElement("p");
    p.innerText = data["description"];

    mainCardContent.appendChild(title).appendChild(p);

    let essentials = ["id","name","description","type"];

    for (const key in data) {
        if (essentials.includes(key)) {
            // elements which we don't want to enumerate
            continue
        }
        if (data.hasOwnProperty(key)) {
            
            let element = data[key];

            if (element == []){
                continue
            }

            let promises = [];

            // generate promises for each data object ID
            for (let elem of element) {
                let url = new URL("http://localhost:8080/api/data");
                url.search = new URLSearchParams({
                    id:elem
                });
                promises.push(fetch(url).then(data => data.json()));
            }

            Promise.all(promises).then(data => {

                let mainCardContent = document.getElementById("card-content");

                if (data.length < 1){
                    return
                }
                
                let cardText = document.createElement("div");
                cardText.className = "collection";

                

                for (let obj of data){

                    console.log(obj);
                    // list item element
                    // let li = document.createElement("li");
                    // li.className = "collection-item avatar";

                    let a = document.createElement("a");
                    a.className = "collection-item";
                    a.href = "#!";
                    a.innerText = obj["name"];
                    cardText.appendChild(a);
                }

                // container for the card
                let cardContainer = document.createElement("div");
                cardContainer.className = "col s12 m6 l4 xl2";

                // card
                let card = document.createElement("div");
                card.className = "card blue-grey small";

                let cardContent = document.createElement("div");
                cardContent.className = "card-content";

                let cardTitle = document.createElement("span");
                cardTitle.className = "card-title";
                let titleString = key.charAt(0).toUpperCase() + key.substring(1);
                cardTitle.innerText = titleString;

                cardContent.appendChild(cardTitle);
                cardContent.appendChild(cardText);
                card.appendChild(cardContent);
                cardContainer.appendChild(card);
                mainCardData.appendChild(cardContainer);

                mainCardContent.appendChild(mainCardData);
            });

            //cardText.innerText = JSON.stringify(element);

            // append all elements together
            
        }
    }

    // all cards to the main view

    

    
    
}


window.onload = function(){
    console.log("window loaded!");

    let url = new URL("http://localhost:8080/api/data");
    url.search = new URLSearchParams({
        id:17
    });

    fetch(url)
        .then(data => data.json())
        .then(data => loadData(data));
}


// spare code

/*

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

    */