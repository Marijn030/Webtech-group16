var users;

fetch("/users").then(c => c.json()).then(userss => {
    console.log(userss);
    users = userss;
});