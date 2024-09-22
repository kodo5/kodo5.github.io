var keys = Object.keys(examples) // get example throws

// get url param
const urlParams = new URLSearchParams(window.location.search); // dev beware, this way lie xss
var throw_param = urlParams.get("throw");

// only work if param is in throws
if (keys.includes(throw_param)){


    var gifs = examples[throw_param]
    var gif_img = "/styles/imgs/" + gifs[Math.floor(Math.random() * gifs.length)]; // get random source
    console.log(gif_img);
    window.location.href = gif_img;


    // Old code that load the gif_img full screen on the page

    // // make video
    // const img = document.createElement('video');
    // img.autoplay = 'autoplay';
    // img.loop = 'loop';

    // const src_tag = document.createElement("source");
    // src_tag.src = gif_img;
    // src_tag.type = "video/mp4"
    // img.append(src_tag);
    // // add video
    // document.body.append(img);
    

    
    
}
else{
    alert("No example for this throw"); // this can be better
}


