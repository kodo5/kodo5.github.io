class Card {
  constructor({
    content_text,
    imageUrl,
    onDismiss,
    onLike,
    onDislike
  }) {
    this.imageUrl = imageUrl;
    this.content_text = content_text;
    this.onDismiss = onDismiss;
    this.onLike = onLike;
    this.onDislike = onDislike;
    this.#init();
  }

  // private properties
  #startPoint;
  #offsetX;
  #offsetY;

  #isTouchDevice = () => {
    return (('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0));
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
    if (this.#isTouchDevice()) {
      this.#listenToTouchEvents();
    } else {
      this.#listenToMouseEvents();
    }

    this.#addOnClick()
  }

  #listenToTouchEvents = () => {
    this.element.addEventListener('touchstart', (e) => {
      const touch = e.changedTouches[0];
      if (!touch) return;
      const { clientX, clientY } = touch;
      this.#startPoint = { x: clientX, y: clientY }
      document.addEventListener('touchmove', this.#handleTouchMove);
      this.element.style.transition = 'transform 0s';
    });

    document.addEventListener('touchend', this.#handleTouchEnd);
    document.addEventListener('cancel', this.#handleTouchEnd);
  }

  #listenToMouseEvents = () => {
    this.element.addEventListener('mousedown', (e) => {
      const { clientX, clientY } = e;
      this.#startPoint = { x: clientX, y: clientY }
      document.addEventListener('mousemove', this.#handleMouseMove);
      this.element.style.transition = 'transform 0s';
    });

    document.addEventListener('mouseup', this.#handleMoveUp);

    // prevent card from being dragged
    this.element.addEventListener('dragstart', (e) => {
      e.preventDefault();
    });
  }

  #handleMove = (x, y) => {
    this.#offsetX = x - this.#startPoint.x;
    this.#offsetY = y - this.#startPoint.y;
    const rotate = this.#offsetX * 0.1;
    this.element.style.transform = `translate(${this.#offsetX}px, ${this.#offsetY}px) rotate(${rotate}deg)`;
    // dismiss card
    if (Math.abs(this.#offsetX) > this.element.clientWidth * 0.7) {
      this.#dismiss(this.#offsetX > 0 ? 1 : -1);
    }
  }

  // mouse event handlers
  #handleMouseMove = (e) => {
    e.preventDefault();
    if (!this.#startPoint) return;
    const { clientX, clientY } = e;
    this.#handleMove(clientX, clientY);
  }

  #handleMoveUp = () => {
    this.#startPoint = null;
    document.removeEventListener('mousemove', this.#handleMouseMove);
    this.element.style.transform = '';
  }

  // touch event handlers
  #handleTouchMove = (e) => {
    if (!this.#startPoint) return;
    const touch = e.changedTouches[0];
    if (!touch) return;
    const { clientX, clientY } = touch;
    this.#handleMove(clientX, clientY);
  }

  #handleTouchEnd = () => {
    this.#startPoint = null;
    document.removeEventListener('touchmove', this.#handleTouchMove);
    this.element.style.transform = '';
  }

  #dismiss = (direction) => {
    this.#startPoint = null;
    document.removeEventListener('mouseup', this.#handleMoveUp);
    document.removeEventListener('mousemove', this.#handleMouseMove);
    document.removeEventListener('touchend', this.#handleTouchEnd);
    document.removeEventListener('touchmove', this.#handleTouchMove);
    this.element.style.transition = 'transform 1s';
    this.element.style.transform = `translate(${direction * window.innerWidth}px, ${this.#offsetY}px) rotate(${90 * direction}deg)`;
    this.element.classList.add('dismissing');
    setTimeout(() => {
      this.element.remove();
    }, 1000);
    if (typeof this.onDismiss === 'function') {
      this.onDismiss();
    }
    if (typeof this.onLike === 'function' && direction === 1) {
      // document.getElementsByTagName("body")[0].style = "background: linear-gradient(0deg, rgb(81, 255, 54), rgb(38, 253, 196)) no-repeat;"
      this.onLike();
    }
    if (typeof this.onDislike === 'function' && direction === -1) {
      this.onDislike();
      // document.getElementsByTagName("body")[0].style = "background: linear-gradient(0deg, rgb(255, 96, 54), rgb(253, 38, 122)) no-repeat;"
    }
  }

  
  #make_card = (content_details) => {
    
    // console.log(content_details);
    const card = document.createElement("div");

    // const h1 = document.createElement('h1');
    // var textnode = document.createTextNode(content_details.character);
    // h1.append(textnode);

// {/* <video autoplay="autoplay" loop="loop" width="400" height="300">
//   <source src="video.mp4" type="video/mp4" />
//   <img src="video.gif" width="400" height="300" />
// </video> */}
    const img = document.createElement('video');

    // make the img a vid
    img.autoplay = 'autoplay';
    img.loop = 'loop';

    const src_tag = document.createElement("source");
    src_tag.src = content_details.img;
    src_tag.type = "video/mp4"
    img.append(src_tag);

    // img.src = content_details.img;
    // img.decoding = "async"
    img.style = 'width:100%; height:auto; visibility: hidden; ';
    console.log(img.style);
    const h2 = document.createElement('h2');
    var textnode = document.createTextNode(content_details.throw);
    h2.append(textnode);

    const h3 = document.createElement('h3');
    var textnode = document.createTextNode(content_details.translation);
    h3.append(textnode);
    h3.style = 'visibility: hidden;';
    

    
    card.append(img);
    card.append(h2);
    card.append(h3);
    
    return card
  }

  #addOnClick = () => {
    this.element.addEventListener('click', (e) => {
      // console.log(this.element);
   
      this.element.getElementsByTagName("video")[0].style = 'visibility: visible;  width:100%; height:auto;'
      this.element.getElementsByTagName("h3")[0].style = 'visibility: visible;'
    });
  }
  
  
}