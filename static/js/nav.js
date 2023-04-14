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
//Links around the site
let home = createli('/', 'Home', null);
let store = createli('/store', 'Buy ticket', null);
let profile = createli('/profile', 'Profile', null);
let login = createli('/login', 'Login', null);
login.style.cssFloat = 'right';
//add them to the tree
ul.append(home);
ul.append(store);
ul.append(profile);
ul.append(login);

nav.appendChild(ul);
