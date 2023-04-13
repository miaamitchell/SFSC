function addNumbers(...nums) {
   return nums.reduce((total, num) => total + Number(num), 0);
}


function sleep(milliseconds) {  
  return new Promise(resolve => setTimeout(resolve, milliseconds));  
}  



async function performcalc() 
{      
      const excelToJSON = new ExcelToJSON();
      excelToJSON.parseExcel();
      
      // JM Note: Ideally this isn't a hard sleep and actually waits for the function response.
      await sleep(100);  

      var major = sessionStorage.getItem("mjrSelect");
      var majorData = majorDictionary[major];
      
      console.log(major);
      console.log(majorData);
 

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
      
   //Cost for desired credit hours
   if (inState) {
      costPerCreditHr = (majorData[0]['CostPerCreditHourIN']) * creditHours;
   } else {
      costPerCreditHr = (majorData[0]['CostPerCreditHourOut']) * creditHours;
   }

   //University Services Fee
   if (creditHours <=3) {
      univServiceFee = majorData[0]['UniversityServicesFee3OrFewerCreditHrs'];
   } else if (creditHours > 3 && creditHours < 8) {
      univServiceFee = majorData[0]['UniversityServicesFee4To7CreditHours'];
   } else {
      univServiceFee = majorData[0]['UniversityServicesFee8OrMoreCreditHrs'];
   }

   //Transportation/Parking Fee
   if(inPersonClasses > 1) {
      transportationFee = majorData[0]['Transportation'];
   } else {
      transportationFee = 0;
   }

   //Student Activity Fee
   if(inPersonClasses + hybridClasses > 0) {
      studentActivityFee = majorData[0]['StudentActivityFee'];
   } else {
      studentActivityFee = 0;
   }

   //Counseling Fee
   if(inPersonClasses+hybridClasses+onlineClasses > 0) {
      counselingFee = majorData[0]['CounselingFee'];
   } else {
      counselingFee = 0;
   }

   //Fees for first-semester students:
   //Assessment Fee, Enrollment Fee, Matriculation Fee
   if(firstSemester) {
      assessmentFee = majorData[0]['AssessmentFee'];
      enrollmentFee = majorData[0]['EnrollmentFee'];
      matriculationFee = majorData[0]['MatriculationFee'];
   } else {
      assessmentFee = 0;
      enrollmentFee = 0;
      matriculationFee = 0;
   }

   //Online Learning Fee
   if(onlineClasses > 0) {
      onlineFee = (majorData[0]['OnlineLearningFee']) * onlineClasses;
   } else {
      onlineFee = 0;
   }

   //Hybrid Learning Fee
   if(hybridClasses > 0) {
      hybridFee = (majorData[0]['HybridFee']) * hybridClasses;
   } else {
      hybridFee = 0;
   }

   //Non-resident Distance Education Fee
   if(inState == false && totalClasses == onlineClasses) {
      distanceFee = (majorData[0]['NonresDistanceEdFee']) * creditHours;
   } else {
      distanceFee = 0;
   }

   //Housing Activity Fee & Deaconess Plan
   if(housingPlan) {
      housingActivityFee = majorData[0]['HousingStudentActivityFee'];
      deaconessPlan = majorData[0]['DeaconessPlan'];
   } else {
      housingActivityFee = 0;
      deaconessPlan = 0;
   }

   //Archie's Book Bundle
   if(archieBundle) {
      archieFee = majorData[0]['ArchiesBookBundle'];
   } else {
      archieFee = 0;
   }

   //Program Fees
   program100 = (majorData[0]['100LevelProgramFees']) * classes100;
   program200 = (majorData[0]['200LevelProgramFees']) * classes200;
   program300 = (majorData[0]['300LevelProgramFees']) * classes300;
   program400 = (majorData[0]['400LevelProgramFees']) * classes400;
   programFee = program100 + program200 + program300 + program400;

   //Athletics Fees
   athleticsFee = majorData[0]['AthleticsFee'];

   //Total Semester Cost for Major
   majorCost = addNumbers(costPerCreditHr,univServiceFee,programFee,studentActivityFee,counselingFee,transportationFee,assessmentFee,enrollmentFee,matriculationFee,onlineFee,hybridFee,housingActivityFee,deaconessPlan,archieFee,athleticsFee);

   console.log(housingPlan);
   var housingData = housingDictionary[housingPlan];

   housingCost = housingData[0]['Cost'];

   var mealData = mealDictionary[mealPlan];

   mealPlanCost = mealData[0]['Cost'];

   totalCost = addNumbers(majorCost,housingCost,mealPlanCost);
   grandTotal = totalCost - estimatedAid;

   window.sessionStorage.setItem('totalCost',totalCost);

   // JM Note: Set a value just to show we can make it work....Ryan has code to add/replace this.
   document.getElementById("headertag").innerHTML = "Total Cost: $"+totalCost;

}  
performcalc();