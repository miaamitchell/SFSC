var ExcelToJSON = function() {
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
            //mapping list of majors & adding to selection for dropdown
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
      
      //Cost for desired credit hours
      if (inState) {
         costPerCreditHrIn = (majorData[0]['CostPerCreditHourIN']) * credithrs;
         console.log("InState: "+costPerCreditHrIn);
      } else {
         costPerCreditHrOut = (majorData[0]['CostPerCreditHourOut']) * credithrs;
         console.log("OutState: "+costPerCreditHrOut);
      }

      //University Services Fee
      if (credithrs <=3) {
         univServiceFee3OrFewer = majorData[0]['UniversityServicesFee3OrFewerCreditHrs'];
         console.log("UnivFee<3: "+univServiceFee3OrFewer);
      } else if (credithrs > 3 && credithrs < 8) {
         univServiceFee4To7 = majorData[0]['UniversityServicesFee4To7CreditHours'];
         console.log("UnivFee4to7: "+univServiceFee4To7);
      } else {
         univService8OrMore = majorData[0]['UniversityServicesFee8OrMoreCreditHrs'];
         console.log("UnivFee8+: "+univService8OrMore);
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
         hybridLearningFee = (majorData[0]['HybridFee']) * hybridClasses;
         console.log("HybridLearningFee: "+hybridLearningFee);
      } else {
         HybridFee = 0;
         console.log("HybridLearningFee: "+HybridFee);
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

      //Total Semester Cost



        //logs list of majors
        //console.log(majors);

        //logs majors with dictionaries
        //console.log(majorDictionary);

        //creates table of all majors and fees
        //console.table(XL_row_object);
   } else if (sheetName == 'housingFees') {
      var column = 'Housing';
      var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
      //mapping list of housings options & adding to selection for dropdown
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

   }
      });
   };
    xhr.send();
  };
};

var excelToJSON = new ExcelToJSON();
excelToJSON.parseExcel();