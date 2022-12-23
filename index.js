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

const cardBackImgPath = "/images/card-back-blue.png";

const cardContainerElem = document.querySelector(".card-container");

const createCards = () => {
  cardObjectDefinitions.forEach((cardItem) => createCard(cardItem));
};

const createCard = (cardItem) => {
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
};

const createElement = (elemType) => {
  return document.createElement(elemType);
};

const addClassToElement = (elem, className) => {
  elem.classList.add(className);
};

const addIdToElement = (elem, id) => {
  elem.id = id;
};

const addSrcToImageElem = (imgElem, src) => {
  imgElem.src = src;
};

const addChildElement = (parentElem, childElem) => {
  parentElem.appendChild(childElem);
};

const addCardToGridCell = (card) => {
  const cardPositionClassName = mapCardIdToGridCell(card);
  const cardPosElem = document.querySelector(cardPositionClassName);
  addChildElement(cardPosElem, card);
};

const mapCardIdToGridCell = (card) => {
  return cardGridMap[card.id];
};

createCards();
