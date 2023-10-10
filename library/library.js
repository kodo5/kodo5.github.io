
function make_viz(item){
    item.style = "color: red;"
}

function make_card(content_details){
    
    console.log(content_details);
    const card = document.createElement("div");
    card.className = "card"

    // const h1 = document.createElement('h1');
    // var textnode = document.createTextNode(content_details.character);
    // h1.append(textnode);

    const img = document.createElement('video');
    img.style = 'width:100%; height:auto';
    img.autoplay = 'autoplay';
    img.loop = 'loop';

    const src_tag = document.createElement("source");
    src_tag.src = content_details.img;
    src_tag.type = "video/mp4"
    img.append(src_tag);

    // img.src = content_details.img;
    // img.decoding = "async"
    // img.style = 'visibility: hidden;';
    
    const h2 = document.createElement('h2');
    var textnode = document.createTextNode(content_details.throw);
    h2.append(textnode);

    const h3 = document.createElement('h3');
    var textnode = document.createTextNode(content_details.translation);
    h3.append(textnode);
    
    
    card.append(img);
    card.append(h2);
    card.append(h3);

    card.addEventListener("click", function(e) {
        alert(1);
    }, false);
    
    return card
  }



// first 5 cards
var container = document.getElementById("container");
console.log(container);

// var waza_types = ["Te-waza","Koshi-waza","Ashi-Waza","Ma-Sutemi-Waza","Yoko-Sutemi-Waza"];

for (let i = 0; i < 68; i++) {
    var card = make_card(judo_json[i]);
    console.log(card);
    console.log(judo_json[i]);
    container.appendChild(card);
  }