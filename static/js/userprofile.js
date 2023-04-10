document.getElementById("submit").addEventListener("click", clickSubmit);

function clickSubmit() {
    usernameNode = document.getElementsByTagName('input')[0];
    username = usernameNode.innerHTML;
    console.log(username);
    passwordNode = document.getElementsByTagName('input')[1];
    password = passwordNode.innerHTML;
    console.log(password);
}