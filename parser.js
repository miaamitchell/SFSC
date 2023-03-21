//parsing thru xlsx file
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
         //displays majors and associated dictionaries
         console.log(dictionary);
 
         //displays table of all majors and fees
         //console.table(XL_row_object);
       })
     };
     xhr.send();
   };
 };
 
 var excelToJSON = new ExcelToJSON();
 excelToJSON.parseExcel();
 
/*
var credithrs = 18;
var inState = false;
var firstSemester = true;
var totalClasses = 6;
var onlineClasses = 3;
var hybridClasses = 3;

// Finding fees specific to major
let majorFilter = data.find(t=>t.Majors == "Respiratory Therapy");

// Mapping array of majors
let majorsList = data.map(t=>t.Majors);

//fees
var costPerCreditHrIn = (majorFilter["CostPerCreditHourIN"]*credithrs);
var costPerCreditHrOut = (majorFilter["CostPerCreditHourOut"]*credithrs);
var onlineLearningFee = (majorFilter["OnlineLearningFee"]*onlineClasses);
var hybridLearningFee = (majorFilter["HybridFee"]*hybridClasses);

var univServiceFee3OrFewer = majorFilter["UniversityServicesFee3OrFewerCreditHrs"];
var univServiceFee4To7= majorFilter["UniversityServicesFee4To7CreditHours"];
var univService8OrMore = majorFilter["UniversityServicesFee8OrMoreCreditHrs"];
var transportationFee = majorFilter["Transportation"];
var studentActivityFee = majorFilter["StudentActivityFee"];
var counselingFee = majorFilter["CounselingFee"];
var assessmentFee = majorFilter["AssessmentFee"];
var enrollmentFee = majorFilter["EnrollmentFee"];
var matriculationFee = majorFilter["MatriculationFee"];

//Cost for Desired Credit Hours
if (inState) {
   console.log("InState: "+costPerCreditHrIn);
} else {
   console.log("OutState: "+costPerCreditHrOut);
}

//University Services Fee
if (credithrs <=3) {
   console.log("UnivFee<3: "+univServiceFee3OrFewer)
} else if (credithrs > 3 && credithrs < 8) {
   console.log("UnivFee4to7: "+univServiceFee4To7);
} else {
   console.log("UnivFee8+: "+univService8OrMore);
}

//Transportation/Parking Fee
if(totalClasses > (hybridClasses + onlineClasses)) {
   console.log("TransportationFee: "+transportationFee);
} else {
   console.log("No transportation fee.");
}

//Student Activity Fee
if(totalClasses != onlineClasses) {
   console.log("StudentActivityFee: "+studentActivityFee);
} else {
   console.log("No student activity fee.");
}

//Counseling Fee
if(totalClasses > 0) {
   console.log("CounselingFee: "+counselingFee);
} else {
   console.log("No counseling fee.");
}

//Fees for first-semester students:
//Assessment Fee, Enrollment Fee, Matriculation Fee
if(firstSemester) {
   console.log("AssessmentFee: "+assessmentFee);
   console.log("EnrollmentFee: "+enrollmentFee);
   console.log("MatriculationFee: "+matriculationFee);
} else {
   console.log("No Assessment, Enrollment, or Matriculation Fee.");
}

//Online Learning Fee
if(onlineClasses > 0) {
   console.log("OnlineLearningFee: "+onlineLearningFee);
} else {
   console.log("No online learning fee.");
}

//Hybrid Learning Fee
if(hybridClasses > 0) {
   console.log("HybridLearningFee: "+hybridLearningFee);
} else {
   console.log("No hybrid learning fee");
}
*/