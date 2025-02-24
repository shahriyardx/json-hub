import * as acorn from "acorn"

const code = `

function cashOut(money) {
if (typeof money !== "number" || money < 0) {
return "Invalid";
}
const Charge = 1.75 / 100;
const getMoney = money * Charge;
return getMoney;
}
function validEmail(email) {
if (typeof email !== "string") {
return "Invalid";
}
let emailToArray = email.split("");
let emailLength = emailToArray.length;
if (
emailToArray[0] === "@" ||
emailToArray[0] === "+" ||
emailToArray[0] === "." ||
emailToArray[0] === "-" ||
emailToArray[0] === "_"
) {
return false;
} else if (emailToArray.indexOf("@") === -1) {
return false;
} else if (emailToArray.includes(" ")) {
return false;
} else if (
emailToArray[emailLength - 4] !== "." ||
emailToArray[emailLength - 3] !== "c" ||
emailToArray[emailLength - 2] !== "o" ||
emailToArray[emailLength - 1] !== "m"
) {
return false;
} else {
return True;
}
}
function electionResult() {
let partyNames = ["mango", "banana", "Na-Vote", "mango"];
if (Array.isArray(partyNames) === false) {
return "Invalid";
}
let mangoParty = [];
let bananaParty = [];
for (const partyName of partyNames) {
if (partyName.includes("mango")) {
mangoParty.push("mango");
} else if (partyName.includes("banana")) {
bananaParty.push("banana");
}
}
if (mangoParty.length > bananaParty.length) {
return "Mango";
} else if (mangoParty.length < bananaParty.length) {
return "Banana";
} else if (mangoParty.length === bananaParty.length) {
return "Draw";
}
}
function isBestFriend(f1, f2) {
let f1 = { name: "hashem", roll: 1, bestFriend: 2 };
let f2 = { name: "kashem", roll: 2, bestFriend: 1 };
if (f1.roll === f2.bestFriend || f1.bestFriend === f2.roll) {
return true;
} else if (f1.roll === f2.roll || f1.bestFriend === f2.bestFriend) {
return true;
} else {
return false;
}
}
function calculateWatchTime() {
let times = [9800];
let sum = 0;
for (const time of times) {
if (typeof time !== "number") {
return "Invalid";
}
sum = sum + time;
}
let hour = Math.floor(sum / 3600);
sum = sum % 3600;
let minute = Math.floor(sum / 60);
sum = sum % 60;
let second = sum;
let result = { hour: hour, minute: minute, second: second };
return result;
}
`


acorn.parse(code, { ecmaVersion: 2020 })