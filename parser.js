var ExcelToJSON = function() {
   this.parseExcel = function() {
      var file = "./Majors.xlsx";
      var xhr = new XMLHttpRequest();
      xhr.open('GET', file, true);
      xhr.responseType = 'arraybuffer';
      xhr.onload = function(e) {
         var data = new Uint8Array(xhr.response);
         var workbook = XLSX.read(data, {
            type: 'array'
         });
      workbook.SheetNames.forEach(function(sheetName) {
        // Here is your object
        var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        //var json_object = JSON.stringify(XL_row_object); converting to string
        //console.table(json_object); //displaying strings in table

        var majors = XL_row_object.map(t=>t.Majors);

        //populating dictionary
        var column = 'Majors';
        var dictionary = {};
        for (var i = 0; i < XL_row_object.length; i++) {
            var value = XL_row_object[i][column];
            if (value in dictionary) {
               dictionary[value].push(XL_row_object[i]);
            } else {
               dictionary[value] = [XL_row_object[i]];
            }
        }

      var major = 'Computer Science';
      var majorData = dictionary[major];

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

      //Total Semester Cost



        //logs list of majors
        //console.log(majors);

        //logs majors with dictionaries
        //console.log(dictionary);

        var majors = XL_row_object.map(t=>t.Majors);
        var selectElement = document.getElementById('mjr');
        majors.map(item => mjr.appendChild(new Option(item)).cloneNode(true));

        //creates table of all majors and fees
        //console.table(XL_row_object);
      })
    };
    xhr.send();
  };
};

var excelToJSON = new ExcelToJSON();
excelToJSON.parseExcel();
