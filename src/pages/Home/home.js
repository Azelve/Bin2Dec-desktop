const remote = require("electron").remote;

function init() {
  document.querySelector("#close-btn").addEventListener("click", function () {
    const window = remote.getCurrentWindow();
    window.close();
  });
}

function mirrorWindow() {
  document.querySelector("#mirror").addEventListener("click", function () {
    window.open(
      "https://www.instagram.com/espelhoinvertido",
      "Espelho Invertido"
    );
  });
}

document.onreadystatechange = function () {
  if (document.readyState == "complete") {
    init();
    mirrorWindow();
  }
};

// Here we have the variables to our binary and decimal numbers, also the label and its color
let binary = document.querySelector("#binary-input");
let label = document.querySelector("#binary-label");
let title = document.querySelector("h1");
let labelColor = document.documentElement;
binary.addEventListener("input", checkField);

// Here we are seting the new Binary number onChange and checking if it is a binary number
function checkField() {
  const binaryCheck = binary.value;
  let x;

  if (binaryCheck === "") {
    label.innerHTML = "Empty";
    return labelColor.style.setProperty("--background-label", "#e59400");
  }

  for (x of binaryCheck) {
    if (x !== "0" && x !== "1") {
      label.innerHTML = "Error";
      return labelColor.style.setProperty("--background-label", "#e50000");
    }
  }

  label.innerHTML = `Binary`;
  labelColor.style.setProperty("--background-label", "#008000");
}

// Here we are checking if the number is correct and making the conversion
function convert() {
  let conversion = Number(binary.value);
  let labelError = String(label.textContent);

  if (labelError === "Error") {
    title.innerHTML = "Bin2Dec";
    return window.open("", "Error").close();
  }

  if (!conversion) {
    document.querySelector("#decimal-output").innerHTML = `0`;

    return (title.innerHTML = "Please, enter a value!");
  }

  output = parseInt(conversion, 2);
  document.querySelector("#decimal-output").innerHTML = `${output}`;
  title.innerHTML = "Bin2Dec";
}
