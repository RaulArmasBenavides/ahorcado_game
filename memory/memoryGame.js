function initMemoryGame(containerId) {
	const cardsArray = [
	  '🍕', '🍔', '🌮', '🍟', '🍣', '🍩',
	  '🍕', '🍔', '🌮', '🍟', '🍣', '🍩'
	];
 
	const gameContainer = document.getElementById(containerId);
	let firstCard = null;
	let secondCard = null;
	let lockBoard = false;
 
	shuffle(cardsArray);
 
	gameContainer.innerHTML = '';
	cardsArray.forEach(icon => {
	  const card = document.createElement('div');
	  card.classList.add('memory-card');
	  card.dataset.icon = icon;
	  card.innerHTML = `<span class="front">${icon}</span><span class="back">❓</span>`;
	  card.addEventListener('click', () => handleCardClick(card));
	  gameContainer.appendChild(card);
	});
 
	function handleCardClick(card) {
	  if (lockBoard || card === firstCard || card.classList.contains('matched')) return;
 
	  card.classList.add('flipped');
 
	  if (!firstCard) {
		 firstCard = card;
	  } else {
		 secondCard = card;
		 checkMatch();
	  }
	}
 
	function checkMatch() {
	  const isMatch = firstCard.dataset.icon === secondCard.dataset.icon;
	  isMatch ? disableCards() : unflipCards();
	}
 
	function disableCards() {
	  firstCard.classList.add('matched');
	  secondCard.classList.add('matched');
	  resetBoard();
	}
 
	function unflipCards() {
	  lockBoard = true;
	  setTimeout(() => {
		 firstCard.classList.remove('flipped');
		 secondCard.classList.remove('flipped');
		 resetBoard();
	  }, 1000);
	}
 
	function resetBoard() {
	  [firstCard, secondCard] = [null, null];
	  lockBoard = false;
	}
 
	function shuffle(array) {
	  array.sort(() => 0.5 - Math.random());
	}
 }