

// DOM
const swiper = document.querySelector('#swiper');
const like = document.querySelector('#like');
const dislike = document.querySelector('#dislike');



// set up json of all throws
var judo_json = judo_json
.map(value => ({ value, sort: Math.random() }))
.sort((a, b) => a.sort - b.sort)
.map(({ value }) => value)

var grade_spesific_throws = judo_json; // set default of all throws
var num_of_throws = judo_json.length;

// Get Url Param of belt
const urlParams = new URLSearchParams(window.location.search); // dev beware, this way lie xss
var belt = urlParams.get("belt");



var options = ["red","yellow","orange","green","blue","brown","black","other"];

if (options.includes(belt)){
  grade_spesific_throws = []; // wipe default all throws
  num_of_throws = 0; // wipe default num of throws


  var grade_throws = syllabus[belt]; // set throws for this grade


  // num_of_throws = grade_throws.length; // set new number of throws
  // possible bug where there is no gif for a spesific throw so numbers get out of sync

  for (let i = 0; i < 68; i++) {
    if (grade_throws.includes(judo_json[i].throw)){
      num_of_throws += 1;
      grade_spesific_throws.push(judo_json[i]); // add a new thow to be shown
      
      document.body.id = belt;

    }
  }
  console.log(grade_spesific_throws);
  console.log(num_of_throws);
}
else{
  // possible xss catch
}

const urls = [
  '','','','',''
];







// variables
let cardCount = 0;

// functions
function appendNewCard() {
  const card = new Card({
    content_text: grade_spesific_throws[cardCount % num_of_throws],
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

for (let i = 0; i < 5; i++) {
  appendNewCard();
}

