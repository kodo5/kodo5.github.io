class Card {
    constructor({
      content_text,
      translation
    }) {
      this.content_text = content_text;
      this.translation = translation;
      this.locked = false;
      this.#init();
    }

  
    #init = () => {
      const card = document.createElement('div');
      card.classList.add('card');
  
      // new stuff
      // const h1 = document.createElement('h1');
      // var textnode = document.createTextNode(this.content_text);
      // console.log(this.content_text);
      // h1.append(textnode)
      // card.append(h1)
  
      card.append(this.#make_card(this.content_text));
      // -------------
  
      // const img = document.createElement('img');
      // img.src = this.imageUrl;
      // card.append(img);
      this.element = card;
      this.#addOnClick()
    }



    #addOnClick = () => {
        this.element.addEventListener('click', (e) => {
          console.log("START SELECTED CARD",selected_card);
          console.log("TRANSLATION",this.translation);

          const red_glow = 'box-shadow: 0px 0px 20px 5px red; color: red; border-color: red;';
          const green_glow = 'box-shadow: 0px 0px 20px 5px aqua; border-color: aqua;';
          

          // check if this card is locked, if so exit without doing anything
          if (this.locked == true){
            return 0
          }

          // Cards are correctly matched
          if (selected_card.translation == this.content_text){
            // lock the two cards
            this.locked = true;
            selected_card.locked = true;

            this.element.style = green_glow;
            selected_card = "";
            
          }
          else if (selected_card == ""){
            // No other card has been selected, so set this one to green
            this.element.style = green_glow;
            selected_card = this;

            
          }
          else{
            // the cards do not match, therefore they are both turned red
            this.element.style = red_glow;
            selected_card.element.style = red_glow;
            this.locked = false;
            selected_card.locked = false;

            selected_card = "";
          }

          // this.element.style = 'box-shadow: 10px 10px green; color: green; border-color: green;'
        });
        
      }
    
    #make_card = (text) => {
        const card = document.createElement("div");
        const h1 = document.createElement('h1');
        var textnode = document.createTextNode(text);
        h1.append(textnode);
        card.append(h1);
        return card 
    }

}