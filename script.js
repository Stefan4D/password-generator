// Array of special characters to be included in password
var specialCharacters = [
  "@",
  "%",
  "+",
  "\\",
  "/",
  "'",
  "!",
  "#",
  "$",
  "^",
  "?",
  ":",
  ",",
  ")",
  "(",
  "}",
  "{",
  "]",
  "[",
  "~",
  "-",
  "_",
  ".",
];

// Array of numeric characters to be included in password
var numericCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

// Function to prompt user for password options
function getPasswordOptions() {
  // 1. Prompt user for length of password
  var passwordLength = prompt(
    "What length of password do you want?\n Between 8 and 128 characters."
  );

  // 2. Validate user input is between 8 and 128 characters
  //   a. Reject and re-prompt if user selects a value out of bounds
  //   b. If value is valid then continue through the program

  // changed to a while() loop to check passwordLength and continue to re-prompt
  // if loop checks for null value where user has cancelled out of the prompt
  while (passwordLength < 8 || passwordLength > 128) {
    if (passwordLength === null) {
      break;
    }
    passwordLength = prompt(
      "That length is not valid, please choose a value between 8 and 128."
    );
  }

  // check for null value for passwordLength
  if (passwordLength !== null) {
    // 3. Prompt user if they want to include each character type:
    //   a. Lowercase characters
    //   b. Uppercase characters
    //   c. Numeric characters
    //   d. Special characters
    var includeLowercase = confirm(
      "Do you want to include lowercase characters?"
    );
    var includeUppercase = confirm(
      "Do you want to include uppercase characters?"
    );
    var includeNumeric = confirm("Do you want to include numeric characters?");
    var includeSpecial = confirm("Do you want to include special characters?");

    // returning default values of false if any are null
    return [
      includeLowercase || false,
      includeUppercase || false,
      includeNumeric || false,
      includeSpecial || false,
      passwordLength,
    ];
  }

  // return an empty array if passwordLength is null
  return [];
}

// Function for getting a random element from an array
function getRandom(arr) {}

// Function to generate password with user input
function generatePassword() {
  // call this function to get the options for the password, uses destructuring to grab each of the named variables.
  const [
    includeLowercase,
    includeUppercase,
    includeNumeric,
    includeSpecial,
    passwordLength,
  ] = getPasswordOptions();

  // 4. Validate that the user selected at least 1 of the character sets
  //   a. If user did not select any character sets then re-prompt them
  //   b. If user has at least 1 character set then continue the program
  var generatedPassword = "";

  // if any of these conditions are true, then the while loop will be triggered
  if (
    includeLowercase ||
    includeUppercase ||
    includeNumeric ||
    includeSpecial
  ) {
    // this solution puts the character types in a set order, so although each character individually is selected at random, their pattern is pre-determined by the character sets included.
    while (generatedPassword.length < passwordLength) {
      includeLowercase && generatedPassword.length < passwordLength
        ? (generatedPassword +=
            lowerCasedCharacters[
              Math.floor(Math.random() * lowerCasedCharacters.length)
            ])
        : (generatedPassword += "");
      includeUppercase && generatedPassword.length < passwordLength
        ? (generatedPassword +=
            upperCasedCharacters[
              Math.floor(Math.random() * upperCasedCharacters.length)
            ])
        : (generatedPassword += "");
      includeNumeric && generatedPassword.length < passwordLength
        ? (generatedPassword +=
            numericCharacters[
              Math.floor(Math.random() * numericCharacters.length)
            ])
        : (generatedPassword += "");
      includeSpecial && generatedPassword.length < passwordLength
        ? (generatedPassword +=
            specialCharacters[
              Math.floor(Math.random() * specialCharacters.length)
            ])
        : (generatedPassword += "");
    }
  } else {
    // this is handles if the user cancels out at the very beginning and prevents this alert popping up as passwordLength will be undefined from the empty array
    if (passwordLength !== undefined) {
      alert("You need to include at least 1 character set!");
      console.log("You need to include at least 1 character set!");
    }
  }
  return generatedPassword;
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
  // passwordText.value = generatedPassword;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

/* 

Requirements:
- Generate a password when the button is clicked
- Present a series of prompts for password criteria
  - Length of password
    - At least 8 characters but no more than 128.
  - Character types
    - Lowercase
    - Uppercase
    - Numeric
    - Special characters ($@%&*, etc)
  - Code should validate for each input and at least one character type should be selected
  - Once prompts are answered then the password should be generated and displayed in an alert or written to the page

*/

// Solution:

// 5. Generate a password
// 6. Validate the password meets the criteria
//   a. Contains at least 1 character from each of the selected character sets
//   b. If does not meet the criteria then re-generate the password
//   c. If meets the criteria then write the password to the textarea in the HTML document
