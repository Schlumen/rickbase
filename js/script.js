{
    let characters = [];
    let apiURL = "https://rickandmortyapi.com/api/character";
    function loadApiData() {
        $.getJSON(apiURL, infodata => {
            for (let i = 1; i <= infodata.info.pages; i++) {
                $.getJSON(apiURL + "?page=" + i, data => {
                    data.results.forEach((element) => {
                        const character = createCharacterObject(element);
                        addCharacter(character);
                        showCharacter(character);
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
    function addCharacter(character) {
        characters.push(character);
    }
    function showCharacter(character) {
        let characterList = $(".character-list");
        let characterListItem = $("<li class='character-list-item'></li>");
        let characterButton = $("<button type='button' class='character-button'></button>");
        let characterImage = $("<img class='character-image'>");
        let imageWrapper = $("<div class='image-wrapper'></div>");
        let textWrapper = $("<div class='text-wrapper'></div>");
        characterImage.attr("src", character.image);
        textWrapper.text(character.name);
        characterButton.addClass(character.status);
        characterButton.on("click", () => showCharacterModal(character));
        imageWrapper.append(characterImage);
        characterButton.append(imageWrapper, textWrapper);
        characterListItem.append(characterButton);
        characterList.append(characterListItem);
    }
    function showCharacterModal(character) {
        let modalContainer = $("#modal-container");
        let modal = $("<div class='modal'></div>");
        let modalImageWrapper = $("<div class='modal-image-wrapper'></div>");
        let modalTextWrapper = $("<div class='modal-text-wrapper'></div>");
        let modalCharacterImage = $("<img class='modal-character-image'>");
        modalContainer.html("");
        modalContainer.on("click", (event) => {
            if ($(event.target).is(modalContainer)) {
                hideCharacterModal();
            }
        });
        modalCharacterImage.attr("src", character.image);
        modalTextWrapper.html(`<h2>${character.name}</h2>
            <p>${character.status} - ${character.species}</p>
            <p>Type: ${character.type}</p>
            <p><span>Last known location:</span></p>
            <p>${character.location}</p>
            <p><span>First seen in:</span><p>
            <p>${character.origin}</p>`);
        modalImageWrapper.append(modalCharacterImage);
        modal.append(modalImageWrapper);
        modal.append(modalTextWrapper);
        modalContainer.append(modal);
        modalContainer.addClass("is-visible");
    }
    function hideCharacterModal() {
        $("#modal-container").removeClass("is-visible");
    }
    loadApiData();
}
//# sourceMappingURL=script.js.map