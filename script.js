(function() {
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
    const board = document.querySelector("#board");
    const btnStart = document.querySelector("#btnStart");
    const btnClock = document.querySelector("#btnClock");
    const myStorage = window.localStorage;
    let cardsGame = [];
    let cardHTML = "";

    function timeGame() {
        if (myStorage.getItem("timeGame") != null)
            alert(`Melhor Tempo: ${myStorage.getItem("timeGame")} segundos`);
        else alert(`Melhor Tempo: 00 segundos`);
    }

    btnClock.addEventListener("click", timeGame);

    imagens.forEach((img) => {
        if (img != 'img/cross.png')
            cardsGame.push(img);
    })

    function menuGame() {
        for (let index = 0; index < 16; index++) {
            cardHTML += `<div class="cardGame" data-card="${imagens[8]}">
                            <img class="up" src="../${imagens[8]}"/>
                            <img class="down" src="../${imagens[8]}">
                        </div>`;
        }
    }

    menuGame();
    board.innerHTML = cardHTML;

    function sortCards() {
        cardsGame.sort(function() { return 0.3 - Math.random() });
        cardsGame.forEach((img) => {
            cardHTML += `<div class="cardGame" data-card="${img}">
                                <img class="up" src="../${img}"/>
                                <img class="down" src="../${imagens[8]}">
                            </div>`;
        });
    }

    btnStart.addEventListener("click", startGame);

    function startGame() {
        cardHTML = "";
        board.innerHTML = "";
        sortCards();
        sortCards();
        board.innerHTML = cardHTML;
        game();
    }

    function game() {
        const cards = document.querySelectorAll(".cardGame");
        let oneCard;
        let twoCard;
        let block = false;
        let flip = false;
        let contGame = 0;
        const contTime = performance.now();

        function myUp() {
            if (block) return;
            if (this === oneCard) return;
            this.classList.add("flip");

            if (!flip) {
                oneCard = this;
                flip = true;
                return;
            }

            twoCard = this;
            block = true;
            match();
        }

        function myDown() {
            setTimeout(() => {
                oneCard.classList.remove("flip");
                twoCard.classList.remove("flip");
                reset(false);
                alert("Você errou!");
            }, 1500);
        }

        function match() {
            if (oneCard.dataset.card === twoCard.dataset.card)
                reset(true);
            else myDown();

            if (contGame == 8) {
                const time = (((performance.now() - contTime) % 60000) / 1000).toFixed(0);
                myStorage.setItem("timeGame", time)
                alert(`O jogo acabou, seu tempo foi de ${time} segundos`);
            }
        }

        function reset(verify) {
            if (verify) {
                oneCard.removeEventListener("click", myUp);
                twoCard.removeEventListener("click", myUp);
                contGame += 1;
            }
            oneCard = null;
            twoCard = null;
            block = false;
            flip = false;
        }

        cards.forEach(card => card.addEventListener("click", myUp));
        cards.forEach(card => card.classList.add("flip"));
        setTimeout(() => {
            cards.forEach(card => card.classList.remove("flip"));
        }, 3000);
    }
})();

app.inicio();