const pageLoader = function(data){
    let searchResults = document.getElementById("searchResults");
    searchResults.innerHTML = "";

    for (let ind of data){

        console.log(ind);
        console.log(ind["Type"]);

        let cardContainer = document.createElement("div");
        cardContainer.className = "col s12 m6 l4 xl2";

        let card = document.createElement("div");
        card.className = "card";

        let cardContent = document.createElement("div");
        cardContent.className = "card-content";

        let cardTitle = document.createElement("span");
        cardTitle.className = "card-title";
        cardTitle.innerText = ind["type"];

        let cardImage = document.createElement("img");
        //cardImage.className = "";
        cardImage.src = "img/homer.png";

        let cardImageContainer = document.createElement("div");
        cardImageContainer.className = "card-image";
        cardImageContainer.appendChild(cardImage);
        cardImageContainer.appendChild(cardTitle);

        let cardText = document.createElement("p");
        cardText.innerText = JSON.stringify(ind);

        cardContent.appendChild(cardImageContainer);
        cardContent.appendChild(cardText);
        card.appendChild(cardContent);
        cardContainer.appendChild(card);
        searchResults.appendChild(cardContainer);
    }
}

window.onload = function(){
    const searchResultsContainer = document.getElementById("searchResults");
    const searchBar = document.getElementById("search");

    searchBar.addEventListener("keyup",(Element,Event) => {
        let query = searchBar.value;
        
        //console.log(query);

        if (query != ""){
            //console.log("Query is not empty");
            
            let params = query.split(" ").filter(x => { return (x != "") }) 

            //console.log(params);

            params = params.join("+");

            let url = new URL("http://localhost:8080/api/data/search");
            url.search = new URLSearchParams({
                q:params
            });

            //console.log(url);

            fetch(url)
                .then(data => data.json())
                .then(data => {
                    //console.log(data);
                    pageLoader(data);
            });
        };
    });
};


