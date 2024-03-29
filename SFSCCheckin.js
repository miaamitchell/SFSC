//Garrett DiDomizio, Mia Mitchell, Yifei Jiao, Ryan Pritchett Contact: gdidomizio@eagles.usi.edu Last Updated: 3/23/2023
//This JavaScript Document controls the form
//
function backtoCheckin(){
  location.replace("SFSCCheckin.html");
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
    document.getElementById("nextBtn").innerHTML = "Submit"; 
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  if(parseInt(n) == 1){
    //validation for each of the requuired fields for calculations to succeed.
    if(currentTab == 0 && !validatemajorSelected()){
      //if validation failed, return without proceeding pasgt 1st tab
     return false;
   }
   if (currentTab == 0 && !validateAid()){
    //if aid is not entered validation will fail and it will not proceed. 
    return false;
   }
   if (currentTab == 1 && !validateclassType()){
    //if validation failed, will not allow to proceed past 2nd tab
    return false;
  }
    //if validation failed, will not be able to proceed past third tab
    if(currentTab == 2 && !validatecreditHours())
  {
   //if validation function failed, return with alert error without proceeding past 3rd tab
  return false; 
  }
    if(currentTab == 3 && !validatemealPlan()){
      //if validation failed, return without proceeding past last tabs
      return false;
    }
    
    if(currentTab == 3 && !validateHousing()){
      //if validation failed, return without proceeding past last tab
      return false;
    }
  }

  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");

  // Hide the current tab:
  x[currentTab].style.display = "none";
  // if you have reached the end of the form... :
  if (currentTab == x.length -1 & parseInt(n)== 1) {
    // Check that the form inputs are valid
    if(validateForm(currentTab))
    {
      sessionSave();
      //...change the form action to the new page URL:
      document.getElementById("regForm").action = "Post-CalcSFSC.html";
      //...the form gets submitted:
      document.getElementById("regForm").submit();
    return false;
    }
  }
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // Otherwise, display the correct tab:
  showTab(currentTab);
}


function validateForm(){

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
      alert("All options must be selected before advancing");
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

// Get a reference to the form and prevent it from submitting by default
document.getElementById("regForm").addEventListener("submit", function(event) {
  event.preventDefault();

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

function sessionSave(){
// Get the selected value from the "Number of Credit Hours" dropdown
  var estaid = document.getElementsByName("aidinputted")[0].value;
  var selectedmajor = document.getElementById("mjr").options[document.getElementById("mjr").selectedIndex];
  var selectedCreditHours = document.getElementsByName("Number of Credit Hours")[0].value;
  var selectedfirstSemester = document.getElementById("firstSem").options[document.getElementById("firstSem").selectedIndex];
  var selectedinPersonClasses = document.getElementsByName("In-Person Classes")[0].value;
  var selectedonlineClasses = document.getElementsByName("Online Classes")[0].value;
  var selectedhybridClasses = document.getElementsByName("Hybrid Classes")[0].value;
  var selectedindianaResident = document.getElementById("InRes").options[document.getElementById("InRes").selectedIndex];
  var selectedhundredLevel = document.getElementsByName("Number of 100-Level Credit Hours")[0].value;
  var selectedtwohundredLevel = document.getElementsByName("Number of 200-Level Credit Hours")[0].value;
  var selectedthreehundredLevel = document.getElementsByName("Number of 300-Level Credit Hours")[0].value;
  var selectedfourhundredLevel = document.getElementsByName("Number of 400-Level Credit Hours")[0].value;
  var selectedmealPlan = document.getElementById("meal").options[document.getElementById("meal").selectedIndex];
  var selectedhousingPlan = document.getElementById("house").options[document.getElementById("house").selectedIndex];
  var selectedarchiesPlan = document.getElementById("archiesBundle").options[document.getElementById("archiesBundle").selectedIndex];
  
  // Store the selected value in sessionStorage
  sessionStorage.setItem("estimatedAid", estaid);
  sessionStorage.setItem("mjrSelect", selectedmajor.text);
  sessionStorage.setItem("creditHours", selectedCreditHours);
  sessionStorage.setItem("firstSemester", selectedfirstSemester.text);
  sessionStorage.setItem("inPersonClasses", selectedinPersonClasses);
  sessionStorage.setItem("onlineClasses", selectedonlineClasses);
  sessionStorage.setItem("hybridClasses", selectedhybridClasses);
  sessionStorage.setItem("InRes", selectedindianaResident.text);
  sessionStorage.setItem("oneHundred", selectedhundredLevel);
  sessionStorage.setItem("twoHundred", selectedtwohundredLevel);
  sessionStorage.setItem("threeHundred", selectedthreehundredLevel);
  sessionStorage.setItem("fourHundred", selectedfourhundredLevel);
  sessionStorage.setItem("mealPlan", selectedmealPlan.text);
  sessionStorage.setItem("housingPlan", selectedhousingPlan.text);
  sessionStorage.setItem("archiesBundle", selectedarchiesPlan.text);
  
  // Use the stored value in your JavaScript code
  }
  function validatecreditHours()
  {
      var selectedhundredLevel = document.getElementsByName("Number of 100-Level Credit Hours")[0].value;
      var selectedtwohundredLevel = document.getElementsByName("Number of 200-Level Credit Hours")[0].value;
      var selectedthreehundredLevel = document.getElementsByName("Number of 300-Level Credit Hours")[0].value;
      var selectedfourhundredLevel = document.getElementsByName("Number of 400-Level Credit Hours")[0].value;
      var selectedCreditHours = document.getElementsByName("Number of Credit Hours")[0].value;
    // Example credit hours
  const levelCredits = parseInt(selectedhundredLevel) + parseInt(selectedtwohundredLevel) + parseInt(selectedthreehundredLevel) + parseInt(selectedfourhundredLevel);//adds amount of credits selected from each level
  // Validate credit hours for each level
  if (levelCredits > parseInt(selectedCreditHours)) {//if amount of credits in major is greater than overall credits selected on first screen validation will fail
      valHours();
      // alert("Credit hours for all levels exceed total credit hours selected.");
      return false; 
    }
  // If all credit hours are valid
  else {
    hideValHours();
    return true;
  }
  }


function validateclassType()
{
var selectedinPersonClasses = document.getElementsByName("In-Person Classes")[0].value;//call values from session
var selectedonlineClasses = document.getElementsByName("Online Classes")[0].value;
var selectedhybridClasses = document.getElementsByName("Hybrid Classes")[0].value;
const classesTaken = parseInt(selectedinPersonClasses) + parseInt(selectedhybridClasses) + parseInt(selectedonlineClasses);

if (classesTaken < 1){// if the amount of type of classes taken is less than one, validation will fail, as at least 1 class of 1 type has to be taken.
  hideValClass();
  noClasses();
  // alert("No classes were selected."); //validate that at least one class type is selected.
  return false;
}
else if (classesTaken > 10) {
  hideNoClasses();
  valClasses();

  return false;
}
//if classes taken is greater than 1
else {
  hideNoClasses();
  hideValClass();
  return true;
}
}

function validatemajorSelected()
{
  var selectedmajor = document.getElementById("mjr").options[document.getElementById("mjr").selectedIndex];//call value from session
  let input = document.getElementById("mjr");
  if (selectedmajor.value == 1){//if major stays as default value defined in html(1), then validation will fail.
  alert("Please select a major."); //validates that a major was selected
  input.style.background = "rgb(234 158 170)";
  return false;
  }
  //if major was selected
    return true;
}

function validatemealPlan()
{
  var selectedmealPlan = document.getElementById("meal").options[document.getElementById("meal").selectedIndex];//call value from session
  let input = document.getElementById("meal");
  if (selectedmealPlan.value == 1){ //if meal plan stays as default value defined in html(1), then validation will fail.
    alert("Please select a meal plan."); //validates that a major was selected
    input.style.background = "rgb(234 158 170)";
    return false;
    }
    //if meal plan was selected
    return true;
}
function validateHousing()
{
  let input = document.getElementById("house");
  var selectedhousingPlan = document.getElementById("house").options[document.getElementById("house").selectedIndex];//call value from session
  if (selectedhousingPlan.value == 1){ //if housing plan stays as default value defined in html(1), then validation will fail.
    input.style.background = "rgb(234 158 170)";
    alert("Please select a housing plan"); //validates that a major was selected
    return false;
    }
    return true;
}
function validateAid(){
  let input = document.getElementById("estAidof");
  var estaid = document.getElementsByName("aidinputted")[0].value;
  if (estaid == ""){
    input.style.background = "rgb(234 158 170)";
    alert("No aid money was entered, to go forward please enter an amount without a comma or dollar sign")
    return false;
  }
  return true;
}

function valHours() {
  document.getElementById("validate").style.display = "block";
}

function hideValHours() {
  document.getElementById("validate").style.display = "none";
}

function noClasses() {
  document.getElementById("noClasses").style.display = "block";
}

function valClasses() {
  document.getElementById("overClasses").style.display = "block";
}

function hideValClass() {
  document.getElementById("overClasses").style.display = "none";
}

function hideNoClasses() {
  document.getElementById("noClasses").style.display = "none";
}