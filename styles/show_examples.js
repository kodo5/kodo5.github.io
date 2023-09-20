var keys = Object.keys(examples) // get example throws


function make_link(throw_name){
    console.log(throw_name);

    var a = document.createElement("a");
    var h1 = document.createElement("h1");
    // puts the throw name on the page
    var textnode = document.createTextNode(throw_name);
    h1.append(textnode);

    a.href = "/styles/?throw=" + throw_name
    a.append(h1)
    return a


}

for (let i = 0; i < keys.length; i++) {
    
    var h1_link = make_link(keys[i])
    document.body.appendChild(h1_link);
  }