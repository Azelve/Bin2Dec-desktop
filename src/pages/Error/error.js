const remote = require("electron").remote;

function init() {
  document.querySelector("#close-error").addEventListener("click", function () {
    const window = remote.getCurrentWindow();
    window.close();
  });
}

document.onreadystatechange = function () {
  if (document.readyState == "complete") {
    init();
  }
};
