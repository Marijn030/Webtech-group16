function createli(link, name, optionalClass) {
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.setAttribute('href', link);
    if (optionalClass != null) { a.setAttribute('class', optionalClass); }
    let text = document.createTextNode(name);
    a.appendChild(text);
    li.appendChild(a);
    return li;
}

let nav = document.getElementsByTagName('nav')[0];
let ul = document.createElement('ul');
let login = (createli('/login', 'Login', null));
login.style.cssFloat = 'right';
ul.append(createli('/', 'Home', null));
ul.append(createli('/store', 'Buy ticket', null));
ul.append(createli('/userprofile', 'Profile', null));
ul.append(login);

nav.appendChild(ul);
