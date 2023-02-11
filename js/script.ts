{
    let characters = [];
    let apiURL = "https://rickandmortyapi.com/api/character";

    function loadApiData() {
        $.getJSON(apiURL, infodata => {
            for (let i = 1; i <= infodata.info.pages; i++) {
                $.getJSON(apiURL + "?page=" + i, data => {
                    data.results.forEach((element: object) => {
                        const charObj: object = createCharacterObject(element);
                        addCharacter(charObj);
                        showCharacter(charObj);
                    });
                });
            }
        });
    }

    function createCharacterObject(character) {
        return {
            name: character.name,
            status: character.status,
            species: character.species,
            type: character.type,
            gender: character.gender,
            origin: character.origin.name,
            location: character.location.name,
            image: character.image
        };
    }

    function addCharacter(charObj: object) {
        characters.push(charObj);
    }

    function showCharacter(charObj) {
        let characterList = $(".character-list");
        let characterListItem = $("<li class='character-list-item'></li>");
        let characterButton = $("<button type='button' class='character-button'></button>");
        characterButton.text(charObj.name);

        characterListItem.append(characterButton);
        characterList.append(characterListItem);
    }

    loadApiData();
}