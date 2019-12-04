(function (){
var imagens = [
    'img/facebook.png',
    'img/android.png',
    'img/chrome.png',
    'img/firefox.png',
    'img/html5.png',
    'img/googleplus.png',
    'img/twitter.png',
    'img/windows.png',
    'img/cross.png'
];

    const tabuleiro = document.querySelector("#tabuleiro");
    btnStart = document.querySelector("#btnStart");
    let cardsGame = [];
    let cardHTML = "";
    let blockGame = true;
    
    imagens.forEach((img) => {
        if (img != 'img/cross.png')
        cardsGame.push(img);
    })

    function sortCards(){
        cardsGame.sort(function( ){return 0.3 - Math.random()});
        cardsGame.forEach((img) => {
                cardHTML += `<div class="memory-card" data-card="${img}">
                    <img class="front-face" src="../${img}"/>
                    <img class="back-face" src="../${imagens[8]}">
                </div>`;
        });
    }

    sortCards();
    sortCards();
    tabuleiro.innerHTML = cardHTML;

    function blocking() {
        blockGame = false;
        console.log(blockGame);
    }

    if (blockGame == false) {
        const cards = document.querySelectorAll(".memory-card");
        let firstCard, secondCard;
        let lockCards = false;

        function flipCard() {
            if (lockCards) return false;
            this.classList.add("flip");

            if (!firstCard) {
                firstCard = this;
                return false;
            }

            secondCard = this;

            checkForMatch();
        }

        function checkForMatch() {
        let isMatch = firstCard.dataset.card === secondCard.dataset.card;

        !isMatch ? unFlipCards() : resetCards(isMatch);
        }

        function unFlipCards() {
        lockCards = true;
        setTimeout(() => {
            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");

            resetCards();
        }, 1000);
        }

        function resetCards(isMatch = false) {
        if (isMatch) {
            firstCard.removeEventListener("click", flipCard);
            secondCard.removeEventListener("click", flipCard);
        }

        [firstCard, secondCard, lockCards] = [null, null, false];
        }

        cards.forEach(card => card.addEventListener("click", flipCard));    
    }





})();

app.inicio();