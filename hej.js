let selectedItems = [];
let matchedItems = [];
let clickCount = 0;
const gridItems = document.querySelectorAll('.grid-item');

function shuffleGrid() {
  for (let i = 0; i < gridItems.length; i++) {
    const randomIndex = Math.floor(Math.random() * gridItems.length);
    gridItems[randomIndex].style.order = i;
  }
}

function checkGameWon() {
  return gridItems.length === matchedItems.length;
}

function checkMatch() {
  if (selectedItems.length === 2) {
    const firstItem = parseInt(selectedItems[0].dataset.value);
    const secondItem = parseInt(selectedItems[1].dataset.value);
    if (firstItem + secondItem === 15) {
      selectedItems.forEach(item => item.classList.add('matched'));
      matchedItems.push(...selectedItems);
    } else {
      selectedItems.forEach(item => item.classList.remove('selected'));
    }
    selectedItems = [];
    clickCount = 0;

    if (checkGameWon()) {
      showGameWonPopup();
    }
  }
}

function flipItem(item) {
  item.classList.toggle('flipped');
}

flipItem(gridItems[0]);

function handleClick() {
  if (matchedItems.includes(this)) return;
  if (selectedItems.includes(this)) return;
  if (clickCount <= 2) {
    this.classList.add('selected');
    flipItem(this);
    selectedItems.push(this);
    clickCount++;
  }
  checkMatch();
}

function resetGame() {
  gridItems.forEach(item => {
    item.classList.remove('selected', 'matched');
    item.style.order = '';
  });

  matchedItems = [];
  selectedItems = [];
  shuffleGrid();
}

function showGameWonPopup() {
  const popup = window.open('', 'Vinst!', 'width=400,height=200');
  popup.document.write('<h1>Grattis!</h1>');
  popup.document.write('<p>Du vann!</p>');
}

gridItems.forEach(item => item.addEventListener('click', handleClick));

shuffleGrid();
