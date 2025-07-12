const cards = ['❤️', '❤️', '😂', '😂', '👌', '👌', '👍', '👍', '😎', '😎', '😶‍🌫️', '😶‍🌫️'];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  const gameBoard = document.getElementById('game-board');
  const shuffledCards = shuffle(cards);
  
  shuffledCards.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.value = card;
    cardElement.dataset.index = index;
    cardElement.addEventListener('click', flipCard);
    gameBoard.appendChild(cardElement);
  });
}

function flipCard() {
  if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
    this.classList.add('flipped');
    this.textContent = this.dataset.value;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      moves++;
      document.getElementById('moves').textContent = moves;
      checkMatch();
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.value === card2.dataset.value) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedPairs++;
    flippedCards = [];

    if (matchedPairs === cards.length / 2) {
      setTimeout(() => alert(`You won in ${moves} moves!`), 500);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.textContent = '';
      card2.textContent = '';
      flippedCards = [];
    }, 1000);
  }
}

window.onload = createBoard;