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
  // Prompt user for length of password
  var passwordLength = prompt(
    "What length of password do you want?\n Between 8 and 128 characters."
  );

  // Validate user input is between 8 and 128 characters
  //   a. Reject and re-prompt if user selects a value out of bounds
  //   b. If value is valid then continue through the program
  // changed to a while() loop to check passwordLength and continue to re-prompt
  // if statement checks for null value where user has cancelled out of the prompt
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
function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

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

  var generatedPassword = "";

  // if any of these conditions are true, then the while loop will be triggered
  if (
    includeLowercase ||
    includeUppercase ||
    includeNumeric ||
    includeSpecial
  ) {
    // this solution puts the character types in a set order, so although each character individually is selected at random, their pattern is pre-determined by the character sets included.
    // to make it so that the order is random and still validate each character type selected is included, then would need to have a state object to track each type included and update that object through the iterations.  Then the final check just needs to check that object to validate each required type has been included e.g. specials_include = true;
    // ternary operator 'else' statement set to null to reduce amount of code - this works as the returned value isn't used anywhere
    while (generatedPassword.length < passwordLength) {
      includeLowercase && generatedPassword.length < passwordLength
        ? (generatedPassword += getRandom(lowerCasedCharacters))
        : null;
      includeUppercase && generatedPassword.length < passwordLength
        ? (generatedPassword += getRandom(upperCasedCharacters))
        : null;
      includeNumeric && generatedPassword.length < passwordLength
        ? (generatedPassword += getRandom(numericCharacters))
        : null;
      includeSpecial && generatedPassword.length < passwordLength
        ? (generatedPassword += getRandom(specialCharacters))
        : null;
    }
  } else {
    // handles if the user cancels at the very beginning and prevents this alert popping up as passwordLength will be undefined from the empty array
    if (passwordLength !== undefined) {
      alert("You need to include at least 1 character set!");
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
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
