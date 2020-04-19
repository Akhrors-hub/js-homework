





//1. types of choices to bring any type
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);

}
function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);

}
function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);

}
function getRandomSymbol() {
    const symbols = '!@#$%^&*<>?';
    return symbols[Math.floor(Math.random() * symbols.length)];

}

console.log();

//2.  making types of choices into one 
const randomFunc = {
    lower: getRandomLower, upper: getRandomUpper, number: getRandomNumber, symbols: getRandomSymbol

}
//3. DOM elements  ,from the website 
const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");

// 4. Generate event listener

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasUpper = lowercaseEl.checked
    const hasLower = uppercaseEl.checked
    const hasNumbers = numbersEl.checked
    const hasSymbols = symbolsEl.checked

    resultEl.innerText = GeneratePassword(
        hasUpper,
        hasLower,
        hasNumbers,
        hasSymbols,
        length
    );
});

// 5. generate password function 
function GeneratePassword(upper, lower, numbers, symbols, length) {
    //  6. initialization
    let generatedPassword = '';
    const typesCount = upper + lower + numbers + symbols;
    console.log("typesCount:", typesCount);
    // 7. Analyzing with array
    const typesArr = [{ upper }, { lower }, { numbers }, { symbols }].filter(item => Object.values(item)[0]);
    console.log('typesArr:', typesArr);

    if (typesCount === 0) {
        return '';
    }

    // 8. Loop
    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];

            generatedPassword += randomFunc[funcName]();
        });
    }
    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;


}
// 9. Copy password to clipboard
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement("textarea");
    const password = resultEl.innerText;


    if (!password) {
        return;
    }
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard!');
});