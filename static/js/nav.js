/*This script adds the links into an html file with a nav tag. It adds links to the different pages available on our server
*/
function createli(link, name, optionalClass) {//takes a link, the text for the link, and an optional class and makes a list element to add to the navigation bar
    let li = document.createElement('li');//list element that will be returned and added to the tree
    let a = document.createElement('a');//link element that will link to the given webpage
    a.setAttribute('href', link);
    if (optionalClass != null) { a.setAttribute('class', optionalClass); }
    let text = document.createTextNode(name);//creates a text node to be added to the link to identify where it leads
    a.appendChild(text);
    li.appendChild(a);
    return li;
}

let nav = document.getElementsByTagName('nav')[0];//locally stores the nav element in the webpage file
let ul = document.createElement('ul'); //an unordered list element to add all the different links to in the nav bar 
//Links around the site
let home = createli('/group16', 'Home', null);//creates the element that links to the home page
let store = createli('/group16/store', 'Buy ticket', null);//creates the element that links to the store page
let profile = createli('/group16/profile', 'Profile', null);//creates the element that links to profile page
let logout = createli('/group16/logout', 'Logout', null);//creates the element that links to logging out
let login = createli('/group16/login', 'Login/Register', null);//creates the element that links to the login page
logout.style.cssFloat = 'right';
login.style.cssFloat = 'right';
//add them to the tree
ul.append(home);
ul.append(store);
ul.append(profile);
ul.append(logout);
ul.append(login);

nav.appendChild(ul);
