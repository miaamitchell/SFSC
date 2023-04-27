async function performcalc() 
{      
      const excelToJSON = new ExcelToJSON();
      await excelToJSON.parseExcel();

      //getting user selections from SFSCCheckin.html
      var major = sessionStorage.getItem("mjrSelect");
      var majorData = majorDictionary[major];
      var fileModified = lastModified;

      var estimatedAid = sessionStorage.getItem("estimatedAid");
      var creditHours = sessionStorage.getItem("creditHours");
      var inPersonClasses = sessionStorage.getItem("inPersonClasses");
      var onlineClasses = sessionStorage.getItem("onlineClasses");
      var hybridClasses = sessionStorage.getItem("hybridClasses");
      var inState = sessionStorage.getItem("InRes");
      var classes100 = sessionStorage.getItem("oneHundred");
      var classes200 = sessionStorage.getItem("twoHundred");
      var classes300 = sessionStorage.getItem("threeHundred");
      var classes400 = sessionStorage.getItem("fourHundred");
      var mealPlan = sessionStorage.getItem("mealPlan");
      var housingPlan = sessionStorage.getItem("housingPlan");
      var archieBundle = sessionStorage.getItem("archiesBundle");

   //Fee Calculations
   //Cost for desired credit hours
   if (inState == "Yes") {
      costPerCreditHr = Number((majorData[0]['CostPerCreditHourIN']) * creditHours);
   } else {
      costPerCreditHr = Number((majorData[0]['CostPerCreditHourOut']) * creditHours);
   }

   //University Services Fee
   if (creditHours <=3) {
      univServiceFee = Number(majorData[0]['UniversityServicesFee3OrFewerCreditHrs']);
   } else if (creditHours > 3 && creditHours < 8) {
      univServiceFee = Number(majorData[0]['UniversityServicesFee4To7CreditHours']);
   } else {
      univServiceFee = Number(majorData[0]['UniversityServicesFee8OrMoreCreditHrs']);
   }

   //Transportation/Parking Fee
   if(inPersonClasses > 0) {
      transportationFee = Number(majorData[0]['Transportation']);
   } else {
      transportationFee = 0;
   }

   //Student Activity Fee
   if(inPersonClasses + hybridClasses > 0) {
      studentActivityFee = Number(majorData[0]['StudentActivityFee']);
   } else {
      studentActivityFee = 0;
   }

   //Counseling Fee
   if(inPersonClasses+hybridClasses+onlineClasses > 0) {
      counselingFee = Number(majorData[0]['CounselingFee']);
   } else {
      counselingFee = 0;
   }

   //Fees for first-semester students:
   //Assessment Fee, Enrollment Fee, Matriculation Fee
   if(firstSemester == "Yes") {
      assessmentFee = Number(majorData[0]['AssessmentFee']);
      enrollmentFee = Number(majorData[0]['EnrollmentFee']);
      matriculationFee = Number(majorData[0]['MatriculationFee']);
   } else {
      assessmentFee = 0;
      enrollmentFee = 0;
      matriculationFee = 0;
   }

   //Online Learning Fee
   if(onlineClasses > 0) {
      onlineFee = Number((majorData[0]['OnlineLearningFee']) * onlineClasses);
   } else {
      onlineFee = 0;
   }

   //Hybrid Learning Fee
   if(hybridClasses > 0) {
      hybridFee = Number((majorData[0]['HybridFee']) * hybridClasses);
   } else {
      hybridFee = 0;
   }

   //Non-resident Distance Education Fee
   if(inState == "No" && onlineClasses > 0 && hybridClasses == 0 && inPersonClasses == 0) {
      distanceFee = Number((majorData[0]['NonresDistanceEdFee']) * creditHours);
   } else {
      distanceFee = 0;
   }

   //Housing Activity Fee & Deaconess Plan
   if(housingPlan != "Living Off-Campus") {
      housingActivityFee = Number(majorData[0]['HousingStudentActivityFee']);
      deaconessPlan = Number(majorData[0]['DeaconessPlan']);
   } else {
      housingActivityFee = 0;
      deaconessPlan = 0;
   }

   //Archie's Book Bundle
   if(archieBundle == "Yes") {
      archieFee = Number((majorData[0]['ArchiesBookBundle'])*creditHours);
   } else {
      archieFee = 0;
   }

   //Program Fees
   program100 = Number((majorData[0]['100LevelProgramFees']) * classes100);
   program200 = Number((majorData[0]['200LevelProgramFees']) * classes200);
   program300 = Number((majorData[0]['300LevelProgramFees']) * classes300);
   program400 = Number((majorData[0]['400LevelProgramFees']) * classes400);
   programFee = program100 + program200 + program300 + program400;

   //Athletics Fees
   athleticsFee = Number(majorData[0]['AthleticsFee']);

   //Total Semester Cost for Major
   majorCost = costPerCreditHr+univServiceFee+programFee+studentActivityFee+counselingFee+transportationFee+assessmentFee+enrollmentFee+matriculationFee+onlineFee+hybridFee+housingActivityFee+deaconessPlan+archieFee+athleticsFee,distanceFee;

   //assigning housingData as information from housingDictionary based on user's selected housingPlan
   var housingData = housingDictionary[housingPlan];
   //assigning housingCost the Cost column value from housingData
   housingCost = Number(housingData[0]['Cost']);

   //assigning mealData as information from mealDictionary based on user's selected mealPlan
   var mealData = mealDictionary[mealPlan];
   //assigning mealPlanCost the Cost column value from mealData
   mealPlanCost = Number(mealData[0]['Cost']);

   //Total Cost for Semester
   totalCost = majorCost+housingCost+mealPlanCost;
   
   //Estimated Balance
   grandTotal = totalCost - estimatedAid;

   //showing fees/costs in Post-CalcSFSC.html based on element id
   document.getElementById("credithrcostid").innerHTML = "Cost for Desired Credit Hours: $"+costPerCreditHr.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
   document.getElementById("programfeeid").innerHTML = "Program Fee: $"+programFee.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
   document.getElementById("counselingfeeid").innerHTML = "Counseling Fee: $"+counselingFee.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
   document.getElementById("assessmentfeeid").innerHTML = "Assessment Fee: $"+assessmentFee.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
   document.getElementById("enrollmentfeeid").innerHTML = "Enrollment Fee: $"+enrollmentFee.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
   document.getElementById("matriculationfeeid").innerHTML = "Matriculation Fee: $"+matriculationFee.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
   document.getElementById("onlinefeeid").innerHTML = "Online Learning Fee: $"+onlineFee.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
   document.getElementById("hybridfeeid").innerHTML = "Hybrid Learning Fee: $"+hybridFee.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
   document.getElementById("housingactivityfeeid").innerHTML = "Housing Student Activity Fee: $"+housingActivityFee.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
   document.getElementById("athleticsfeeid").innerHTML = "Athletics Fee: $"+athleticsFee.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
   document.getElementById("distancefeeid").innerHTML = "Nonresident Distance Education Fee: $"+distanceFee.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
   document.getElementById("univserviceid").innerHTML = "University Service Fee: $"+univServiceFee.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
   document.getElementById("transportationid").innerHTML = "Transportation/Parking Fee: $"+transportationFee.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
   document.getElementById("studentactivityid").innerHTML = "Student Activity Fee: $"+studentActivityFee.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
   document.getElementById("archiebundleid").innerHTML = "Archie's Book Bundle: $"+archieFee.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
   document.getElementById("housingplanid").innerHTML = "Housing Costs: $"+housingCost.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
   document.getElementById("deaconessid").innerHTML = "Deaconess Plan: $"+deaconessPlan.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
   document.getElementById("mealplanid").innerHTML = "Meal Plan: $"+mealPlanCost.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
   document.getElementById("totalcostid").innerHTML = "Total Cost: $"+totalCost.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
   document.getElementById("aidid").innerHTML = "Estimated Financial Aid: $"+Number(estimatedAid).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
   document.getElementById("fileupdated").innerHTML = "Fees and costs updated as of: "+fileModified;
   
   var totalOutput = document.getElementById("grandtotalid");
   //text before grandTotal variable
   var descriptor;

   //changing grand total to rebate(green) or cost(red)
   if (grandTotal >= 0) {
      totalOutput.style.color = "red";
      descriptor = "Estimated Cost";
   }
   else {
      totalOutput.style.color = "green";
      descriptor = "Estimated Credit";
   }
   totalOutput.innerText = descriptor + ": $" + Math.abs(grandTotal).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
}  
/* //hiding and showing possible emailForm
function hideForm() {
   document.getElementById("emailForm").style.display = "none";
}
function showForm() {
   document.getElementById("emailForm").style.display = "block";
}
*/

performcalc();