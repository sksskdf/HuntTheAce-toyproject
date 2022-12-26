const cardObjectDefinitions = [
  { id: 1, imagePath: "/images/card-KingHearts.png" },
  { id: 2, imagePath: "/images/card-JackClubs.png" },
  { id: 3, imagePath: "/images/card-QueenDiamonds.png" },
  { id: 4, imagePath: "/images/card-AceSpades.png" },
];

const cardGridMap = {
  1: ".card-pos-a",
  2: ".card-pos-b",
  3: ".card-pos-c",
  4: ".card-pos-d",
};

const aceId = 4;

let cards = [];

const cardBackImgPath = "/images/card-back-blue.png";

const cardContainerElem = document.querySelector(".card-container");

const collapsedGridAreaTemplate = '"a a" "a a"';
const cardCollectionCellClass = ".card-pos-a";

const numCards = cardObjectDefinitions.length;

let cardPositions = [];

let gameInProgress = false;
let shufflingInProgress = false;
let cardsRevealed = false;

const currentGameStatusElem = document.querySelector(".current-status");
const scoreContainerElem = document.querySelector(".header-score-container");
const scoreElem = document.querySelector(".score");
const roundContainerElem = document.querySelector(".header-round-container");
const roundElem = document.querySelector(".round");

const winColor = "greent";
const loseColor = "red";
const primaryColor = "black";

let roundNum = 0;
let maxRounds = 4;
let score = 0;

loadGame();

function createCards() {
  cardObjectDefinitions.forEach((cardItem) => createCard(cardItem));
}

function createCard(cardItem) {
  const cardElem = createElement("div");
  const cardInnerElem = createElement("div");
  const cardFrontElem = createElement("div");
  const cardBackElem = createElement("div");

  const cardFrontImg = createElement("img");
  const cardBackImg = createElement("img");

  addClassToElement(cardElem, "card");
  addIdToElement(cardElem, cardItem.id);

  addClassToElement(cardInnerElem, "card-inner");

  addClassToElement(cardFrontElem, "card-front");

  addClassToElement(cardBackElem, "card-back");

  addSrcToImageElem(cardBackImg, cardBackImgPath);

  addSrcToImageElem(cardFrontImg, cardItem.imagePath);

  addClassToElement(cardFrontImg, "card-img");

  addClassToElement(cardBackImg, "card-img");

  addChildElement(cardFrontElem, cardFrontImg);

  addChildElement(cardBackElem, cardBackImg);

  addChildElement(cardInnerElem, cardFrontElem);

  addChildElement(cardInnerElem, cardBackElem);

  addChildElement(cardElem, cardInnerElem);

  addCardToGridCell(cardElem);

  initializeCardPositions(cardElem);

  attatchClickEventHandlerToCard(cardElem);
}

function createElement(elemType) {
  return document.createElement(elemType);
}

function addClassToElement(elem, className) {
  elem.classList.add(className);
}

function addIdToElement(elem, id) {
  elem.id = id;
}

function addSrcToImageElem(imgElem, src) {
  imgElem.src = src;
}

function addChildElement(parentElem, childElem) {
  parentElem.appendChild(childElem);
}

function addCardToGridCell(card) {
  const cardPositionClassName = mapCardIdToGridCell(card);
  const cardPosElem = document.querySelector(cardPositionClassName);
  addChildElement(cardPosElem, card);
}

function mapCardIdToGridCell(card) {
  return cardGridMap[card.id];
}

function startGame() {
  initializeNewGame();
  startRound();
}

function initializeNewGame() {
  score = 0;
  roundNum = 0;

  shufflingInProgress = false;
  updateStatusElement(scoreContainerElem, "flex");
  updateStatusElement(roundContainerElem, "flex");
  updateStatusElement(
    scoreElem,
    "block",
    primaryColor,
    `Score <span class='badge'>${score}</span>`
  );
  updateStatusElement(
    roundElem,
    "block",
    primaryColor,
    `Round <span class='badge'>${roundNum}</span>`
  );
}

function chooseCard(card) {
  if (canChooseCard()) {
    evaluateCardChoice(card);
    flipCard(card, false);

    setTimeout(() => {
      flipCards(false);
      updateStatusElement(
        currentGameStatusElem,
        "block",
        primaryColor,
        "Card positions revealed"
      );
    }, 3000);
    cardsRevealed = true;
  }
}

function attatchClickEventHandlerToCard(card) {
  card.addEventListener("click", () => chooseCard(card));
}

function updateStatusElement(elem, display, color, innerHTML) {
  elem.style.display = display;

  if (arguments.length > 2) {
    elem.style.color = color;
    elem.innerHTML = innerHTML;
  }
}

function outputChoiceFeedBack(hit) {
  if (hit) {
    updateStatusElement(
      currentGameStatusElem,
      "block",
      winColor,
      "Hit!! - Well Done!! :)"
    );
  } else {
    updateStatusElement(
      currentGameStatusElem,
      "block",
      loseColor,
      "Missed!! :("
    );
  }
}

function calculateScoreToAdd(roundNum) {
  switch (roundNum) {
    case 1:
      return 100;
    case 2:
      return 50;
    case 3:
      return 25;
    default:
      return 10;
  }
}

function calculateScore() {
  const scoreToAdd = calculateScoreToAdd(roundNum);
  score = score + scoreToAdd;
}

function updateScore() {
  calculateScore();
}

function evaluateCardChoice(card) {
  if (card.id == aceId) {
    updateScore();
    outputChoiceFeedBack(true);
  } else {
    outputChoiceFeedBack(false);
  }
}

function canChooseCard() {
  return gameInProgress == true && !shufflingInProgress && !cardsRevealed;
}

function startRound() {
  initializeNewRound();
  collectCards();
  flipCards(true);
  shuffleCards();
}

function shuffleCards() {
  const id = setInterval(shuffle, 12);
  let shuffleCount = 0;

  function shuffle() {
    randomizeCardPositions();

    if (shuffleCount == 500) {
      clearInterval(id);
      dealCards();
    } else {
      shuffleCount++;
    }
  }
}

function dealCards() {
  addCardsToAppropriateCell();
  const areasTemplate = returnGridAreasMappedToCardPos();
  transformGridArea(areasTemplate);
}

function returnGridAreasMappedToCardPos() {
  let firstPart = "";
  let secondPart = "";
  let areas = "";

  cards.forEach((card, index) => {
    if (cardPositions[index] == 1) {
      areas = areas + "a ";
    } else if (cardPositions[index] == 2) {
      areas = areas + "b ";
    } else if (cardPositions[index] == 3) {
      areas = areas + "c ";
    } else if (cardPositions[index] == 4) {
      areas = areas + "d ";
    }

    if (index == 1) {
      firstPart = areas.substring(0, areas.length - 1);
      areas = "";
    } else if (index == 3) {
      secondPart = areas.substring(0, areas.length - 1);
    }
  });
  return `"${firstPart}" "${secondPart}"`;
}

function addCardsToAppropriateCell() {
  cards.forEach((card) => {
    addCardToGridCell(card);
  });
}

function randomizeCardPositions() {
  const random1 = Math.floor(Math.random() * numCards) + 1;
  const random2 = Math.floor(Math.random() * numCards) + 1;

  const temp = cardPositions[random1 - 1];

  cardPositions[random1 - 1] = cardPositions[random2 - 1];
  cardPositions[random2 - 1] = temp;
}

function initializeNewRound() {
  roundNum++;
  playGame.disabled = true;

  gameInProgress = true;
  shufflingInProgress = true;
  cardsRevealed = false;

  updateStatusElement(
    currentGameStatusElem,
    "block",
    primaryColor,
    "Shuffling..."
  );
  updateStatusElement(
    roundElem,
    "block",
    primaryColor,
    `Round <span class='badge'>${roundNum}</span>`
  );
}

function initializeCardPositions(card) {
  cardPositions.push(card.id);
}

function collectCards() {
  transformGridArea(collapsedGridAreaTemplate);
  addCardsToGridAreaCell(cardCollectionCellClass);
}

function transformGridArea(areas) {
  cardContainerElem.getElementsByClassName.gridTemplateAreas = areas;
}

function addCardsToGridAreaCell(cellPositionClassName) {
  const cellPositionElem = document.querySelector(cellPositionClassName);

  cards.forEach((card, index) => {
    addChildElement(cellPositionElem, card);
  });
}

function loadGame() {
  createCards();

  cards = document.querySelectorAll(".card");

  playGame.addEventListener("click", () => startGame());
}

function flipCard(card, flipToBack) {
  const innerCardElem = card.firstChild;
  if (flipToBack && !innerCardElem.classList.contains("flip-it")) {
    innerCardElem.classList.add("flip-it");
  } else if (innerCardElem.classList.contains("flip-it")) {
    innerCardElem.classList.remove("flip-it");
  }
}

function flipCards(flipToBack) {
  cards.forEach((card, index) => {
    setTimeout(() => {
      flipCard(card, flipToBack);
    }, index * 100);
  });
}
