async function performcalc() 
{      
      const excelToJSON = new ExcelToJSON();
      await excelToJSON.parseExcel();

      //getting user selections
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
   if(inPersonClasses > 1) {
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
   if(firstSemester) {
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
   if(inState == false && totalClasses == onlineClasses) {
      distanceFee = Number((majorData[0]['NonresDistanceEdFee']) * creditHours);
   } else {
      distanceFee = 0;
   }

   //Housing Activity Fee & Deaconess Plan
   if(housingPlan) {
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
   majorCost = costPerCreditHr+univServiceFee+programFee+studentActivityFee+counselingFee+transportationFee+assessmentFee+enrollmentFee+matriculationFee+onlineFee+hybridFee+housingActivityFee+deaconessPlan+archieFee+athleticsFee;

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
   document.getElementById("credithrcostid").innerHTML = "Cost for Desired Credit Hours: $"+majorCost;
   document.getElementById("univserviceid").innerHTML = "University Service Fee: $"+univServiceFee;
   document.getElementById("transportationid").innerHTML = "Transportation/Parking Fee: $"+transportationFee;
   document.getElementById("studentactivityid").innerHTML = "Student Activity Fee: $"+studentActivityFee;
   document.getElementById("archiebundleid").innerHTML = "Archie's Book Bundle: $"+archieFee;
   document.getElementById("housingplanid").innerHTML = "Housing Costs: $"+housingCost;
   document.getElementById("deaconessid").innerHTML = "Deaconess Plan: $"+deaconessPlan;
   document.getElementById("mealplanid").innerHTML = "Meal Plan: $"+mealPlanCost;
   document.getElementById("totalcostid").innerHTML = "Total Cost: $"+totalCost;
   document.getElementById("aidid").innerHTML = "Estimated Financial Aid: $"+estimatedAid;
   document.getElementById("fileupdated").innerHTML = "Fees and costs updated as of: "+fileModified;
   
   var totalOutput = document.getElementById("grandtotalid")
   var descriptor;

   //changing grand total to refund(green) or cost(red)
   if (grandTotal >= 0) {
      totalOutput.style.color = "red";
      descriptor = "Estimated Cost";
   }
   else {
      totalOutput.style.color = "green";
      descriptor = "Estimated Rebate";
   }
   totalOutput.innerText = descriptor +": $"+Math.abs(grandTotal).toFixed(2);
}  

/*
//converting string values to numbers and adding fixed decimal
function dollarValue(value) {
   if (typeof value === 'string') {
      return parseFloat(value);
   }
   if (typeof value === 'number') {
      return value;
   }
}
*/

performcalc();