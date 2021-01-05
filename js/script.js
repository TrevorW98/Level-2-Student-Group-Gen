let starterArray = ["Trevor", "Mendoza", "Racca", "Alex", "Hugo", "Carlos", "Ken", "Sean", "Ajay", "Anothay", "Juan", "Christy", "Adrian", "Brian"]
let secondaryArray = []
let nameInput = "";
let display = document.getElementById("display");
let addStudentBtn = document.getElementById("addStudentBtn");
let randomDisplay = document.getElementById("randomDisplay");
let randomBtn = document.getElementById("randomBtn");
let groupListDisplayPort = document.getElementById("groupListDisplayPort");
let numPerS = document.getElementById("numPerS");
let numOfS = document.getElementById("numOfS");
let numPerSBtn = document.getElementById("numPerSBtn");
let numOfSBtn = document.getElementById("numOfSBtn");
onLoad();
function createListFavs() {
    let listItem = document.createElement("li");
    let newName = document.createElement("button");
    newName.classList.add("rounded-sm", "btnSpecs");
    newName.innerText = nameInput;
    newName.addEventListener("click", function () {
        let value = starterArray.indexOf(nameInput);
        starterArray.splice(value, 1);
        localStorage.setItem("starterArray", JSON.stringify(starterArray));
        newName.remove();
        this.parentElement.remove();
    });
    listItem.appendChild(newName);
    display.appendChild(listItem);
}
function onLoad() {
    localStorage.setItem("starterArray", JSON.stringify(starterArray));
    let preset = JSON.parse(localStorage.getItem("starterArray"));
    console.log(preset);
    if (preset != null) {
        secondaryArray = preset;
        for (let i = 0; i < secondaryArray.length; i++) {
            let listItem = document.createElement("li");
            let newName = document.createElement("button");
            newName.classList.add("rounded-sm", "btnSpecs");
            newName.innerText = preset[i];
            newName.addEventListener("click", function () {
                let value = starterArray.indexOf(nameInput);
                starterArray.splice(value, 1);
                localStorage.setItem("starterArray", JSON.stringify(starterArray));
                newName.remove();
            });
            listItem.appendChild(newName);
            display.appendChild(listItem);
        }
    }
}
function saveNameToLS() {
    localStorage.setItem("starterArray", JSON.stringify(starterArray));
}

addStudentBtn.addEventListener("click", function () {
    nameInput = document.getElementById("nameInput").value;
    checkUserName();
    console.log(starterArray);
    setTimeout(function () {
        saveNameToLS();
    }, 1000)
    createListFavs();
});

//This doesnt work and It should, absolutely frustrating
function checkUserName(nameInput) {
    let pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/); //unacceptable chars
    if (pattern.test(nameInput)) {
        alert("Please only use standard alphanumerics");
    } else {
        starterArray.push(nameInput);
    }
}
function randomName(){
    let nameSelected = Math.floor(Math.random() * nameBank.length);
    randomDisplay.innerText = starterArray[nameSelected];
}
randomBtn.addEventListener("click", function(){
    randomName();
});
function generateGroupByAmount(){
   randomSort();
   let wordsPerLine = 0;
   let endResult = [];
   let groupNum = Array.from(starterArray);
   const wordsPerLine = Math.ceil(groupNum.length/ numOfS.value)
   for ( let i = 0; i < numOfS.value; i++) {
       endResult[i] = [];
       for( let ii = 0; ii < wordsPerLine; ii++) {
           let value = groupNum[ii + i * wordsPerLine]
           if (!value) continue
           endResult[ii].push(value);
       }
   }
   console.log(endResult);
   groupListDisplay(endResult);
}
function generateGroupBySize(){
    randomSort();
    console.log(numPerS.value);
    console.log(starterArray);
    let studentArray = Array.from(starterArray);
    let endResult2 = new Array(Math.ceil(peepsArr.length / numPerS.value))
        .fill()
        .map(_ => Array.from(studentArray.splice(0, numPerS.value)));
    console.log(endResult2);
    groupListDisplay(endResult2);
}
function randomSort(){
    starterArray = Array.from(starterArray)
    .map((a) => ({sort: Math.random(), value: a}))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    console.log(starterArray);
}
function groupListDisplay(Array){
    groupListDisplayPort.innerHTML = "";
    for(let i = 0; i < Array.length; i++){
        let firstDiv = document.createElement("div");
        let header1 = document.createElement("p");
        let header2 = document.createElement("p");
        header1.innerText = "Group ${i+1}";
        for(let ii = 0; ii< Array[i][ii]; ii++){
            header2.innerText = Array[i];
        }

        firstDiv.appendChild(header1);
        groupListDisplayPort.appendChild(firstDiv);
    }
}
numPerSBtn.addEventListener("click",function(){
    generateGroupBySize();
})
numOfSBtn.addEventListener("click",function(){
    generateGroupByAmount();
})