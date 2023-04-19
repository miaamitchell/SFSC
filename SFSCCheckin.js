//Garrett DiDomizio, Mia Mitchell, Yifei Jiao, Ryan Pritchett Contact: gdidomizio@eagles.usi.edu Last Updated: 3/23/2023
//This JavaScript Document controls the form
//
//
//
//
function backtoCheckin(){
  location.replace("SFSCCheckin.html");
}
var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  //console.log(x);
  //console.log(n);
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
  console.log("this is the current tab:" +currentTab);
  console.log(n);
  if(parseInt(n) == 1){
    console.log("Advanced tab; need to validate it")
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
  console.log("Validating tab "+currentTab);

  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  console.log(x[currentTab]);
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
  console.log("we did it, hooray");
  return valid; // return the valid status
}


//More validation
// Get references to the select menus
//const inPersonClassesSelect = document.querySelector("input[name='In-Person Classes']");
//const onlineClassesSelect = document.querySelector("input[name='Online Classes']");
//const hybridClassesSelect = document.querySelector("input[name='Hybrid Classes']");

//console.log("In Person log = "+inPersonClassesSelect.value);
//console.log("In online log = "+onlineClassesSelect.value);
//console.log("In hybrid log = "+hybridClassesSelect.value);

// Get a reference to the form and prevent it from submitting by default
document.getElementById("regForm").addEventListener("submit", function(event) {
  event.preventDefault();

  // Get the selected values from the select menus
  const creditHours = parseInt(creditHoursSelect.value);
  const inPersonClasses = parseInt(inPersonClassesSelect.value);
  const onlineClasses = parseInt(onlineClassesSelect.value);
  const firstSemester = true;
  const hybridClasses = parseInt(hybridClassesSelect.value);
  const estimatedAid = parseInt(estimatedAidSelect.value);
  const mjrSelect = true;
  const InRes = true; 
  const oneHundred = parseInt(selectedoneHundredSelect.value);
  const twoHundred = parseInt(selectedtwoHundredSelect.value);
  const threeHundred = parseInt(selectedthreeHundred.value);
  const fourHundred = parseInt(selectedfourHundred.value);
  const mealPlan = true;
  const housingPlan = true;
  const archiesBundle = true;

  // Check that credit hours are greater than 0
  if (inPersonClasses+onlineClasses+hybridClasses == 0) {
    console.log("all class types = 0");
    alert("Please select a number of credit hours greater than 0.");
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
  console.log(archiesBundle);
  
  // Use the stored value in your JavaScript code
  //console.log("Number of credit hours selected: " + selectedCreditHours);
  //console.log("The number of in person credit hours is: " + selectedinPersonClasses);
  }
  function validatecreditHours()
  {
      console.log("enough credit hours")
      var selectedhundredLevel = document.getElementsByName("Number of 100-Level Credit Hours")[0].value;
      var selectedtwohundredLevel = document.getElementsByName("Number of 200-Level Credit Hours")[0].value;
      var selectedthreehundredLevel = document.getElementsByName("Number of 300-Level Credit Hours")[0].value;
      var selectedfourhundredLevel = document.getElementsByName("Number of 400-Level Credit Hours")[0].value;
      var selectedCreditHours = document.getElementsByName("Number of Credit Hours")[0].value;
    // Example credit hours
  const levelCredits = parseInt(selectedhundredLevel) + parseInt(selectedtwohundredLevel) + parseInt(selectedthreehundredLevel) + parseInt(selectedfourhundredLevel);//adds amount of credits selected from each level
  console.log("Credit Hours w/level identified = "+levelCredits)
  console.log("Selected Hours = "+selectedCreditHours)
  // Validate credit hours for each level
  //let input = document.getElementById("hundredL", "twohundredL", "threehundredL", "fourhundredL");
  if (levelCredits > parseInt(selectedCreditHours)) {//if amount of credits in major is greater than overall credits selected on first screen validation will fail
    //input.style.color= "red";
      input.style.background = "rgb(234 158 170)";
      alert("Credit hours for all levels exceed total credit hours selected.");
      return false; 
    }
  console.log('Credit hours are valid.'); // If all credit hours are valid
  return true;
  }


function validateclassType()
{
var selectedinPersonClasses = document.getElementsByName("In-Person Classes")[0].value;//call values from session
var selectedonlineClasses = document.getElementsByName("Online Classes")[0].value;
var selectedhybridClasses = document.getElementsByName("Hybrid Classes")[0].value;
const classesTaken = parseInt(selectedinPersonClasses) + parseInt(selectedhybridClasses) + parseInt(selectedonlineClasses);
console.log("Amount of classes of any type equals" + classesTaken)
//let input = document.getElementById("IP");
if (classesTaken < 1){// if the amount of type of classes taken is less than one, validation will fail, as at least 1 class of 1 type has to be taken.
  alert("No amount of classes were selected for any class type (hybrid, in person, or online)"); //validate that at least one clss type is selected.
  //input.style.background = "rgb(234 158 170)";
  return false;
}
console.log('Amount of classes was valid, as it was greater than 1'); //if classes taken is greater than 1
return true;
}

function validatemajorSelected()
{
  var selectedmajor = document.getElementById("mjr").options[document.getElementById("mjr").selectedIndex];//call value from session
  let input = document.getElementById("mjr");
  if (selectedmajor.value == 1){//if major stays as default value defined in html(1), then validation will fail.
  alert("No major was selected, please select a major"); //validates that a major was selected
  input.style.background = "rgb(234 158 170)";
  return false;
  }
  console.log('major was selected'); //if major was selected this appears
  return true;
}

function validatemealPlan()
{
  var selectedmealPlan = document.getElementById("meal").options[document.getElementById("meal").selectedIndex];//call value from session
  let input = document.getElementById("meal");
  if (selectedmealPlan.value == 1){ //if meal plan stays as default value defined in html(1), then validation will fail.
    alert("No meal plan was selected, please select a meal plan"); //validates that a major was selected
    input.style.background = "rgb(234 158 170)";
    return false;
    }
    console.log('meal plan was selected')//if meal plan was selected
    return true;
}
function validateHousing()
{
  let input = document.getElementById("house");
  var selectedhousingPlan = document.getElementById("house").options[document.getElementById("house").selectedIndex];//call value from session
  if (selectedhousingPlan.value == 1){ //if housing plan stays as default value defined in html(1), then validation will fail.
    input.style.background = "rgb(234 158 170)";
    //alert("No housing plan was selected, please select a housing plan"); //validates that a major was selected
    return false;
    }
    return true;
}
function validateAid(){
  console.log(estaid);
  //let input = document.getElementById("estAidof");
  var estaid = document.getElementsByName("aidinputted")[0].value;
  if (estaid.value == NaN){
    //input.style.background = "rgb(234 158 170)";
    console.log(estaid);
    //alert("No aid money was entered, to go forward please enter an amount without a comma or dollar sign")
    return false;
  }
  return true;
}