window.onload = function(){
    const searchResultsContainer = document.getElementById("searchResults");
    const searchBar = document.getElementById("search");

    searchBar.addEventListener("keyup",(Element,Event) => {
        let query = searchBar.value;
        
        console.log(query);

        if (query != ""){
            console.log("Query is not empty");
            
            let params = query.split(" ").filter(x => { return (x != "") }) 

            console.log(params);

            params = params.join("+");

            let url = new URL("http://localhost:8080/api/data/search");
            url.search = new URLSearchParams({
                q:params
            });

            console.log(url);

            fetch(url)
                .then(data => data.json())
                .then(data => {
                    console.log(data);
            });
        };
    });
};


