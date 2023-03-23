//Garrett DiDomizio, Mia Mitchell, Yifei Jiao, Ryan Pritchett Contact: gdidomizio@eagles.usi.edu Last Updated: 3/23/2023
//This JavaScript Document controls the form
//
//
//
//
function backtoCheckin(){
  windows.location.href = "file:///C:/Users/Garrett%20DiDomizio/Documents/CIS477/SFSCCheckin.html";
}

var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
    
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit"
    
    ; 
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...change the form action to the new page URL:
    document.getElementById("regForm").action = "Post-CalcSFSC.html";
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  var selects = x[currentTab].getElementsByTagName("select"); // get all select elements in the current tab
  // A loop that checks every input field and select element in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // Check if each select element has a valid value
  for (i = 0; i < selects.length; i++) {
    if (selects[i].value == "") { // if the selected value is empty...
      selects[i].className += " invalid"; // add an "invalid" class to the select element
      valid = false; // and set the current valid status to false
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

//More validation
// Get references to the select menus
const inPersonClassesSelect = document.querySelector("select[name='In-Person Classes']");
const onlineClassesSelect = document.querySelector("select[name='Online Classes']");
const hybridClassesSelect = document.querySelector("select[name='Hybrid Classes']");

// Get a reference to the form and prevent it from submitting by default
const form = document.querySelector("form");
form.addEventListener("submit", function(event) {
  event.preventDefault();

  // Get the selected values from the select menus
  const creditHours = parseInt(creditHoursSelect.value);
  const inPersonClasses = parseInt(inPersonClassesSelect.value);
  const onlineClasses = parseInt(onlineClassesSelect.value);
  const hybridClasses = parseInt(hybridClassesSelect.value);

  // Check that credit hours are greater than 0
  if (creditHours <= 0) {
    alert("Please select a number of credit hours greater than 0.");
    return;
  }

  // Check that at least one of the class options is greater than 0
  if (inPersonClasses + onlineClasses + hybridClasses <= 0) {
    alert("Please select at least one in-person, online, or hybrid class.");
    return;
  }

  // If validation passes, submit the form
  form.submit();
});

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}


