function loadData(data){
    // select card content
    let mainCardData = document.getElementById("dataAttribute");

    let mainCardContent = document.getElementById("card-content");

    mainCardContent.innerHTML = "";

    let title = document.createElement("div");
    title.className = "card-title";
    title.innerText = data["name"];

    let p = document.createElement("p");
    p.innerText = data["description"];

    mainCardContent.appendChild(title).appendChild(p);

    let essentials = ["id","name","description","type"];

    for (const key in data) {
        if (essentials.includes(key)) {
            continue
            console.log("Wrong!");
        }
        if (data.hasOwnProperty(key)) {
            
            let element = data[key];

            // container for the card
            let cardContainer = document.createElement("div");
            cardContainer.className = "col s12 m6 l4 xl2";

            // card
            let card = document.createElement("div");
            card.className = "card blue-grey";


            let cardContent = document.createElement("div");
            cardContent.className = "card-content";

            let cardTitle = document.createElement("span");
            cardTitle.className = "card-title";
            cardTitle.innerText = key;

            //let cardImage = document.createElement("img");
            //cardImage.className = "";
            //cardImage.src = "img/homer.png";

            //let cardImageContainer = document.createElement("div");
            //cardImageContainer.className = "card-image";
            //cardImageContainer.appendChild(cardImage);
            //cardImageContainer.appendChild(cardTitle);

            let cardText = document.createElement("p");
            cardText.innerText = JSON.stringify(element);

            //cardContent.appendChild(cardImageContainer);
            cardContent.appendChild(cardTitle);
            cardContent.appendChild(cardText);
            card.appendChild(cardContent);
            cardContainer.appendChild(card);
            mainCardData.appendChild(cardContainer);
            
            if (key == "id"){
                console.log(`id is ${data[key]}`);
            } else if (key == "description"){
                console.log(`description is ${data[key]}`)
            } else {
                console.log(`${key} : ${element}`);
            }
            
        }
    }

    mainCardContent.appendChild(mainCardData);

    
    
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