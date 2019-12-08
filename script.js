$(document).ready(function (){
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
    btnStart = document.querySelector("#btnStart");
    let cardsGame = [];
    let cardHTML = "";

    imagens.forEach((img) => {
        if (img != 'img/cross.png')
        cardsGame.push(img);
    })

    function menuGame(){
        for (let index = 0; index < 16; index++) {
            cardHTML += `<div class="cardGame" data-card="${imagens[8]}">
                            <img class="up" src="../${imagens[8]}"/>
                            <img class="down" src="../${imagens[8]}">
                        </div>`;
        }
    }

    menuGame();
    board.innerHTML = cardHTML;

    function sortCards(){
        cardsGame.sort(function( ){return 0.3 - Math.random()});
        cardsGame.forEach((img) => {
                cardHTML += `<div class="cardGame" data-card="${img}">
                                <img class="up" src="../${img}"/>
                                <img class="down" src="../${imagens[8]}">
                            </div>`;
        });
    }
 
    function fadeSlide() {
        setTimeout(() => {
            $(".up").fadeToggle("fast");  
            $(".up").fadeToggle("fast");  
            $(".down").slideToggle("fast");   
        }, 3000);
        $(".down").slideToggle("fast");
    }
 
    $("#btnStart").click(function() {
        cardHTML = "";
        board.innerHTML = "";
        sortCards();
        sortCards();
        board.innerHTML = cardHTML;
        game();
        fadeSlide();
    });
    
    function game() {
        const cards = document.querySelectorAll(".cardGame");
        let oneCard;
        let twoCard;
        let block = false;
        let contGame = 0;
        const contTime = performance.now();
        
        function match() {
            let verify = oneCard.dataset.card === twoCard.dataset.card;
            !verify ? myDown() : reset(verify);
    
            if (contGame == 8) {
                alert(`O jogo acabou, seu tempo foi de ${(((performance.now() - contTime) % 60000) / 1000).toFixed(0)} segundos`);
            }
        }
        
        function myUp() {
            if (block) return false;
            this.classList.add("flip");
    
            if (!oneCard) {
                oneCard = this;
                return false;
            }
    
            twoCard = this;
            match();
        }
        
        function myDown() {
            block = true;
    
            setTimeout(() => {
                oneCard.classList.remove("flip");
                twoCard.classList.remove("flip");
                reset();
                alert("Você errou!");
            }, 1500);
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
        }

        cards.forEach(card => card.addEventListener("click", myUp));  
    }  
})();

app.inicio();