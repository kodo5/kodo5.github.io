var keys = Object.keys(examples) // get example throws

// get url param
const urlParams = new URLSearchParams(window.location.search); // dev beware, this way lie xss
var throw_param = urlParams.get("throw");

// only work if param is in throws
if (keys.includes(throw_param)){
    var gifs = examples[throw_param]
    var gif_img = "/styles/imgs/" + gifs[Math.floor(Math.random() * gifs.length)];
    var new_style = "url('"+gif_img+"')" // mmm...
    

    document.body.style.backgroundImage = new_style // set the new background
   

    // puts the throw name on the page

    // const h1 = document.createElement('h1');
    // var textnode = document.createTextNode(throw_param); // hmmmmmmmmm...
    
    // h1.append(textnode);
    // document.body.append(h1);
    
}
else{
    alert("No example for this throw"); // this can be better
}


