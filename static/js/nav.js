function createh2(link, name, optionalClass) {
    let h2 = document.createElement('h2');
    let a = document.createElement('a');
    a.setAttribute('href', link);
    if (optionalClass != null) { a.setAttribute('class', optionalClass); }
    let text = document.createTextNode(name);
    a.appendChild(text);
    h2.appendChild(a);
    return h2;
}

let nav = document.getElementsByTagName('nav')[0];

nav.appendChild(createh2('index.html', 'Home', null));
