var ExcelToJSON = function() {
   //parsing XLSX
   this.parseExcel = function() {
      var file = "./Fees.xlsx";
      var xhr = new XMLHttpRequest();
      xhr.open('GET', file, true);
      xhr.responseType = 'arraybuffer';
      xhr.onload = function(e) {
         var data = new Uint8Array(xhr.response);
         var workbook = XLSX.read(data, {
            type: 'array'
         });

      //creating empty arrays to store each dictionary
      var majorDictionary = {};
      var housingDictionary = {};
      var mealDictionary = {};

      workbook.SheetNames.forEach(function(sheetName) {
      // Here is your object
      var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
         if (sheetName == 'majorFees') {
            //mapping list of majors & adding to dropdown selection
            var majors = XL_row_object.map(t=>t.Majors);
            var selectElement = document.getElementById('mjr');
            majors.map(item => mjr.appendChild(new Option(item)).cloneNode(true));

            //populating dictionaries based on column key
            var column = 'Majors';
            for (var i = 0; i < XL_row_object.length; i++) {
               var value = XL_row_object[i][column];
               if (value in majorDictionary) {
                  majorDictionary[value].push(XL_row_object[i]);
               } else {
                  majorDictionary[value] = [XL_row_object[i]];
               }
        }

      var major = 'Computer Science';
      var majorData = majorDictionary[major];

      //placeholders
      var credithrs = 18;
      var inState = false;
      var firstSemester = true;
      var totalClasses = 6;
      var onlineClasses = 2;
      var hybridClasses = 3;
      var campusHousing = false;
      var archieBundle = true;
      var classes100 = 1;
      var classes200 = 0;
      var classes300 = 1;
      var classes400 = 2;

      //converts to number data type to add together
      function addNumbers(...nums) {
         return nums.reduce((total, num) => total + Number(num), 0);
       }
      
      //Cost for desired credit hours
      if (inState) {
         costPerCreditHr = (majorData[0]['CostPerCreditHourIN']) * credithrs;
         console.log("InState: "+costPerCreditHr);
      } else {
         costPerCreditHr = (majorData[0]['CostPerCreditHourOut']) * credithrs;
         console.log("OutState: "+costPerCreditHr);
      }

      //University Services Fee
      if (credithrs <=3) {
         univServiceFee = majorData[0]['UniversityServicesFee3OrFewerCreditHrs'];
         console.log("UnivFee<3: "+univServiceFee);
      } else if (credithrs > 3 && credithrs < 8) {
         univServiceFee = majorData[0]['UniversityServicesFee4To7CreditHours'];
         console.log("UnivFee4to7: "+univServiceFee);
      } else {
         univServiceFee = majorData[0]['UniversityServicesFee8OrMoreCreditHrs'];
         console.log("UnivFee8+: "+univServiceFee);
      }

      //Transportation/Parking Fee
      if(totalClasses > (hybridClasses + onlineClasses)) {
         transportationFee = majorData[0]['Transportation'];
         console.log("TransportationFee: "+transportationFee);
      } else {
         transportationFee = 0;
         console.log("TransportationFee: "+transportationFee);
      }

      //Student Activity Fee
      if(totalClasses != onlineClasses) {
         studentActivityFee = majorData[0]['StudentActivityFee'];
         console.log("StudentActivityFee: "+studentActivityFee);
      } else {
         studentActivityFee = 0;
         console.log("StudentActivityFee: "+studentActivityFee);
      }

      //Counseling Fee
      if(totalClasses > 0) {
         counselingFee = majorData[0]['CounselingFee'];
         console.log("CounselingFee: "+counselingFee);
      } else {
         counselingFee = 0;
         console.log("CounselingFee: "+counselingFee);
      }

      //Fees for first-semester students:
      //Assessment Fee, Enrollment Fee, Matriculation Fee
      if(firstSemester) {
         assessmentFee = majorData[0]['AssessmentFee'];
         enrollmentFee = majorData[0]['EnrollmentFee'];
         matriculationFee = majorData[0]['MatriculationFee'];
         console.log("AssessmentFee: "+assessmentFee);
         console.log("EnrollmentFee: "+enrollmentFee);
         console.log("MatriculationFee: "+matriculationFee);
      } else {
         assessmentFee = 0;
         enrollmentFee = 0;
         matriculationFee = 0;
         console.log("No Assessment, Enrollment, or Matriculation Fee.");
      }

      //Online Learning Fee
      if(onlineClasses > 0) {
         onlineFee = (majorData[0]['OnlineLearningFee']) * onlineClasses;
         console.log("OnlineLearningFee: "+onlineFee);
      } else {
         onlineFee = 0;
         console.log("OnlineLearningFee: "+onlineFee);
      }

      //Hybrid Learning Fee
      if(hybridClasses > 0) {
         hybridFee = (majorData[0]['HybridFee']) * hybridClasses;
         console.log("HybridLearningFee: "+hybridFee);
      } else {
         hybridFee = 0;
         console.log("HybridLearningFee: "+hybridFee);
      }

      //Non-resident Distance Education Fee
      if(inState == false && totalClasses == onlineClasses) {
         distanceFee = (majorData[0]['NonresDistanceEdFee']) * credithrs;
         console.log("Non-resident Distance Education Fee: "+distanceFee);
      } else {
         distanceFee = 0;
         console.log("Non-resident Distance Education Fee: "+distanceFee);
      }

      //Housing Activity Fee & Deaconess Plan
      if(campusHousing) {
         housingActivityFee = majorData[0]['HousingStudentActivityFee'];
         deaconessPlan = majorData[0]['DeaconessPlan'];
         console.log('HousingActivityFee: '+housingActivityFee);
         console.log('DeaconessPlan: '+deaconessPlan);
      } else {
         housingActivityFee = 0;
         deaconessPlan = 0;
         console.log('HousingActivityFee: '+housingActivityFee);
         console.log('DeaconessPlan: '+deaconessPlan);
      }

      //Archie's Book Bundle
      if(archieBundle) {
         archieFee = majorData[0]['ArchiesBookBundle'];
         console.log('ArchiesBookBundle: '+archieFee);
      } else {
         archieFee = 0;
         console.log('ArchiesBookBundle: '+archieFee);
      }
      //Program Fees
      program100 = (majorData[0]['100LevelProgramFees']) * classes100;
      program200 = (majorData[0]['200LevelProgramFees']) * classes200;
      program300 = (majorData[0]['300LevelProgramFees']) * classes300;
      program400 = (majorData[0]['400LevelProgramFees']) * classes400;
      programFee = program100 + program200 + program300 + program400;
      console.log('ProgramFees: '+programFee);

      //Athletics Fees
      athleticsFee = majorData[0]['AthleticsFee'];
      console.log('AthleticsFee: '+athleticsFee);

      function addNumbers(...nums) {
         return nums.reduce((total, num) => total + Number(num), 0);
       }

      //Total Semester Cost for Major
      majorCost = addNumbers(costPerCreditHr,univServiceFee,programFee,studentActivityFee,counselingFee,transportationFee,assessmentFee,enrollmentFee,matriculationFee,onlineFee,hybridFee,housingActivityFee,deaconessPlan,archieFee,athleticsFee);
      console.log('Total Cost for Major: '+majorCost);

        //logs list of majors
        //console.log(majors);

        //logs majors with dictionaries
        //console.log(majorDictionary);

        //creates table of all majors and fees
        //console.table(XL_row_object);
   } else if (sheetName == 'housingFees') {
      var column = 'Housing';
      var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
      //mapping list of housings options & adding to dropdown selection
      var housing = XL_row_object.map(t=>t.Housing);
      var selectElement = document.getElementById('house');
      housing.map(item => house.appendChild(new Option(item)).cloneNode(true));

      //populating dictionary
      for (var i = 0; i < XL_row_object.length; i++) {
         var value = XL_row_object[i][column];
         if (value in housingDictionary) {
            housingDictionary[value].push(XL_row_object[i]);
         } else {
            housingDictionary[value] = [XL_row_object[i]];
         }
      }
      var housing = '1 Person/1 Bedroom Apartment';
      var housingData = housingDictionary[housing];
   
      housingCost = housingData[0]['Cost'];
      console.log('HousingCost: '+housingCost);
   } else if (sheetName == 'mealPlans') {
      var column = 'MealPlan';
      var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
      //mapping list of meal plans & adding to dropdown selection
      var meals = XL_row_object.map(t=>t.MealPlan);
      var selectElement = document.getElementById('meal');
      meals.map(item => meal.appendChild(new Option(item)).cloneNode(true));

      //populating dictionary
      for (var i = 0; i < XL_row_object.length; i++) {
         var value = XL_row_object[i][column];
         if (value in mealDictionary) {
            mealDictionary[value].push(XL_row_object[i]);
         } else {
            mealDictionary[value] = [XL_row_object[i]];
         }
      }
      var mealPlan = 'Blue Eagle';
      var mealData = mealDictionary[mealPlan];

      mealPlanCost = mealData[0]['Cost'];
      console.log('MealPlanCost: '+mealPlanCost);
   }
      });
      totalCost = Number(majorCost)+Number(housingCost)+Number(mealPlanCost);
      console.log('Total Cost: '+totalCost);
   };
    xhr.send();
  };
};

var excelToJSON = new ExcelToJSON();
excelToJSON.parseExcel();