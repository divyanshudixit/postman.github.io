console.log("Postman ");

// Utility Function
// 1.Utility function to get DOM element from string
function getElementFromString(string) {
  let div = document.createElement("div");
  div.innerHTML = string;
  return div.firstElementChild;
}

// initialise the adderparams to 0
let addedParamCount = 0;

// Hide the paramters Box initially
let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = "none";

// If the user clicks on params box,Hide json
let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener("click", () => {
  document.getElementById("requestJsonBox").style.display = "none";
  document.getElementById("parametersBox").style.display = "block";
});

// If the user clicks on json box,Hide params
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
  document.getElementById("parametersBox").style.display = "none";
  document.getElementById("requestJsonBox").style.display = "block";
});
// If the user clicks on + button ,add more paramters
let addParam = document.getElementById("addParam");

addParam.addEventListener("click", () => {
  let params = document.getElementById("params");

  let string = `<div class="form-row my-3">
    <label for="url" class="col-sm-2 col-form-label">Parameter ${
      addedParamCount + 2
    }</label>
    <div class=" col-md-4">
        <input type="text" class="form-control" id="parameterKey${
          addedParamCount + 2
        }" placeholder="Enter parameter ${addedParamCount + 2} Key">
    </div>
    <div class=" col-md-4">
        <input type="text" class="form-control" id="parameterValue${
          addedParamCount + 2
        }"
            placeholder="Enter parameter ${addedParamCount + 2} Value">
    </div>
    <button class="btn btn-primary deleteParam"> - </button>
</div>`;

  // Convert the element string to DOM  node
  let paramElement = getElementFromString(string);

  // console.log(paramElement);
  params.appendChild(paramElement);

  // Add an eventListener to remove the parameter on clicking - button
  let deleteParam = document.getElementsByClassName("deleteParam");
  for (item of deleteParam) {
    item.addEventListener("click", (e) => {
      // TODO : add a confirmation box to confirm parameter deletion
      e.target.parentElement.remove();
    });
  }
  addedParamCount++;
});

let submit = document.getElementById("submit");
submit.addEventListener("click", (e) => {
  e.preventDefault();
  // Show please wait in the response box to request patience from the user
  document.getElementById("responsePrism").innerHTML =
    "Please wait..Fetching Response ...";
  let url = document.getElementById("url").value;
  let requestType = document.querySelector(
    "input[name='requestType']:checked"
  ).value;
  let contentType = document.querySelector(
    "input[name='contentType']:checked"
  ).value;

  // if user has used params option insead of json ,collect all the parameters in an object
  if (contentType == "params") {
    data = {};
    for (let i = 0; i < addedParamCount + 1; i++) {
      if (document.getElementById("parameterKey" + (i + 1)) != undefined) {
        let key = document.getElementById("parameterKey" + (i + 1)).value;
        let value = document.getElementById("parameterValue" + (i + 1)).value;
        data[key] = value;
      }
    }
    data = JSON.stringify(data);
  } else {
    data = document.getElementById("requestJsonText").value;
  }

  // Debugging
  console.log("Url ", url);
  console.log("requestType ", requestType);
  console.log("contentType ", contentType);
  console.log("data is ", data);

  //  if the request type is get ,invoke fetch api to create a post request
  if (requestType == "GET") {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.text())
      .then((text) => {
        document.getElementById("responsePrism").innerHTML = text;
      });
  } else {
    fetch(url, {
      method: "POST",
      body: data,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.text())
      .then((text) => {
        // document.getElementById('responseJsonText').value=text;
        document.getElementById("responsePrism").innerHTML = text;
        
      });
  }
});
