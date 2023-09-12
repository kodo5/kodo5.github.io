selected_card = "";


function appendNewCard(col,text,translation){
    
    const card = new Card({
        content_text: text,
        translation: translation
      });
      col.append(card.element);
}

function eek(){
    // var all_cards = document.getElementsByClassName("card");
    // var unlocked = false
    // for (let i = 0; i < all_cards.length; i++) {
    //     // if (all_cards[i].locked == false){
    //     //     console.log()
    //     // }
        
    // }
    location.reload();

}



const num_of_cards = 4;
var c1 = document.getElementsByClassName("column")[0];
var c2 = document.getElementsByClassName("column")[1];


// shuffle overall words list
var words = words
.map(value => ({ value, sort: Math.random() }))
.sort((a, b) => a.sort - b.sort)
.map(({ value }) => value)

console.log(words);

// create short word list
var wordlist = words.slice(0,num_of_cards);

// place first col
for (let i = 0; i < num_of_cards; i++) {
    appendNewCard(c1,wordlist[i].jpn,wordlist[i].eng);
}

// shuffle second col
var wordlist = wordlist
.map(value => ({ value, sort: Math.random() }))
.sort((a, b) => a.sort - b.sort)
.map(({ value }) => value)

// place second col
for (let i = 0; i < num_of_cards; i++) {
    appendNewCard(c2,wordlist[i].eng,wordlist[i].jpn);
}
  