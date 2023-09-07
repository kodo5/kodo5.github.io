// DOM
const swiper = document.querySelector('#swiper');
const like = document.querySelector('#like');
const dislike = document.querySelector('#dislike');

// constants
// const urls = [
//   'https://source.unsplash.com/random/1000x1000/?sky',
//   'https://source.unsplash.com/random/1000x1000/?landscape',
//   'https://source.unsplash.com/random/1000x1000/?ocean',
//   'https://source.unsplash.com/random/1000x1000/?moutain',
//   'https://source.unsplash.com/random/1000x1000/?forest'
// ];

const urls = [
  '','','','',''
];

var judo_json = judo_json
.map(value => ({ value, sort: Math.random() }))
.sort((a, b) => a.sort - b.sort)
.map(({ value }) => value)

// const content = [
//   'A',
//   'B',
//   'C',
//   'D',
//   'E'
// ];

// const content_details_x = [
//   {text:'de',char:'的',translation:'(possessive particle), of / really and truly / aim, clear'},
//   {text:'yī',char:'一',translation:'one / single / a(n)'},
//   {text:'shì',char:'是',translation:'is, are, am, yes to be'},
//   {text:'bù',char:'不',translation:'(negative prefix) no, not'},
//   {text:'le',char:'了',translation:'(modal particle intensifying preceding clause), (past tense marker) / to know, to understand, to know'},
// ]

// variables
let cardCount = 0;

// functions
function appendNewCard() {
  const card = new Card({
    content_text: judo_json[cardCount % 5],
    imageUrl: urls[cardCount % 5], // needs changing to accomidate more than 5 repeating cards
    onDismiss: appendNewCard,
    onLike: () => {
      like.style.animationPlayState = 'running';
      like.classList.toggle('trigger');
    },
    onDislike: () => {
      dislike.style.animationPlayState = 'running';
      dislike.classList.toggle('trigger');
    }
  });
  swiper.append(card.element);
  cardCount++;

  const cards = swiper.querySelectorAll('.card:not(.dismissing)');
  cards.forEach((card, index) => {
    card.style.setProperty('--i', index);
  });
}

// first 5 cards
for (let i = 0; i < 38; i++) {
  appendNewCard();
}

