function displayBio() {
    const name = prompt("Please enter your name:");
    const age = parseInt(prompt("Please enter your age:"), 10);

    if (name === null || name.trim() === "" || isNaN(age)) {
        alert("Please enter a valid name and age.");
        return;
    }

    if (age >= 18) {
        alert(name + " is an adult.");
    } else {
        alert(name + " is not an adult.");
    }
}

function displayHobbies() {
    const hobbies = prompt("Please enter your hobbies (comma-separated):");

    if (hobbies === null || hobbies.trim() === "") {
        alert("You did not enter any hobbies.");
        return;
    }

    const hobbiesArray = hobbies.split(",").map(item => item.trim()).filter(Boolean);
    alert("Your hobbies are: " + hobbiesArray.join(", "));
}

function displaySkills(reading, writing, coding) {
    if (reading === null || writing === null || coding === null || reading.trim() === "" || writing.trim() === "" || coding.trim() === "") {
        alert("Please enter valid skill levels for reading, writing, and coding.");
        return;
    }
    else{
        alert("Your skills are: " + reading.trim() + ", " + writing.trim() + ", " + coding.trim());
    }

}

window.addEventListener("DOMContentLoaded", () => {
    const myBio = document.querySelector(".myBio");
    const myHobbies = document.querySelector(".myHobbies");
    const mySkills = document.querySelector(".mySkills");

    if (myBio) {
        myBio.addEventListener("click", displayBio);
    }

    if (myHobbies) {
        myHobbies.addEventListener("click", displayHobbies);
    }

    if (mySkills) {
        mySkills.addEventListener("click", () => {
            const reading = prompt("Please enter your reading skill level:");
            const writing = prompt("Please enter your writing skill level:");
            const coding = prompt("Please enter your coding skill level:");
            displaySkills(reading, writing, coding);
        });
    }
});