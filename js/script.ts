{
    let characters = [];
    let apiURL = "https://rickandmortyapi.com/api/character";

    function loadApiData() {
        $.getJSON(apiURL, infodata => {
            for (let i = 1; i <= infodata.info.pages; i++) {
                $.getJSON(apiURL + "?page=" + i, data => {
                    console.log(i);
                    data.results.forEach((element: object) => {
                        addCharacter(element);
                    });
                })
            }
        });
    }

    function addCharacter(character) {
        showCharacter(character.name)
    }

    function showCharacter(name) {
        console.log(name);
    }

    loadApiData();
}