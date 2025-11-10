const fs=require("fs");

function MyName(){
    console.log("Hello,My Name Is bhuva roshni")
}

function add(a, b) {
    console.log(a+b);
}

function subtract(a, b) {
    console.log(a-b);
}

function multiply(a, b) {
    console.log(a*b);
}

function divide(a, b) {
    console.log(a/b)
}

module.exports={
    MyName,
    add,
    subtract,
    multiply,
    divide,
    writeToFile,
    readFromFile,
    getRandomNumber
}