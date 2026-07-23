const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const output = document.getElementById("output");
const btn = document.getElementById("btn");

function displayName(){
    btn.addEventListener("click", function(){
        alert(firstName.value + " " + lastName.value);
    });
}

// Attach the click handler
displayName();