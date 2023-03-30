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

         var majors = XL_row_object.map(t=>t.Majors);

         var selectElement = document.getElementById('mjr');

         majors.map(item => mjr.appendChild(new Option(item)).cloneNode(true));
 
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
 let feedata = [
   {
   "id": "AccountingandProfessionalServices",
   "name": "Accounting and Professional Services"
 },
 {
   "id": "AppliedStudiesBPS",
   "name": "Applied Studies BPS"
 },
 {
   "id": "Art",
   "name": "Art"
 },
 {
   "id": "Biochemisty",
   "name": "Biochemisty"
 },
 {
   "id": "Biology",
   "name": "Biology"
 },
 {
   "id": "Biophysics",
   "name": "Biophysics"
 },
 {
   "id": "BusinessAdministration",
   "name": "Business Administration"
 },
 {
   "id": "Chemistry",
   "name": "Chemistry"
 },
 {
   "id": "CivilEngineering",
   "name": "Civil Engineering"
 },
 {
   "id": "CommunicationStudies",
   "name": "Communication Studies"
 },
 {
   "id": "CommunicationStudiesJUMPOption",
   "name": "Communication Studies JUMP Option"
 },
 {
   "id": "ComputerInformationSystems",
   "name": "Computer Information Systems"
 },
 {
   "id": "ComputerScience",
   "name": "Computer Science"
 },
 {
   "id": "CriminalJustice",
   "name": "Criminal Justice"
 },
 {
   "id": "DentalHygiene",
   "name": "Dental Hygiene"
 },
 {
   "id": "EarlyChildhoodEducation",
   "name": "Early Childhood Education"
 },
 {
   "id": "Economics",
   "name": "Economics"
 },
 {
   "id": "ElectricalEngineering",
   "name": "Electrical Engineering"
 },
 {
   "id": "ElementaryEducation",
   "name": "Elementary Education"
 },{
   "id": "Engineering",
   "name": "Engineering"
 },
 {
   "id": "English",
   "name": "English"
 },
 {
   "id": "EnglishTeaching",
   "name": "English Teaching"
 },
 {
   "id": "EnvironmentalScience",
   "name": "Environmental Science"
 },
 {
   "id": "ExerciseScience",
   "name": "Exercise Science"
 },
 {
   "id": "Finance",
   "name": "Finance"
 },
 {
   "id": "FoodAndNutrition",
   "name": "Food And Nutrition"
 },
 {
   "id": "Geology",
   "name": "Geology"
 },
 {
   "id": "GlobalStudies",
   "name": "Global Studies"
 },
 {
   "id": "HealthInformaticsAndInformationManagement",
   "name": "Health Informatics And Information Management"
 },
 {
   "id": "HealthServices",
   "name": "Health Services"
 },
 {
   "id": "History",
   "name": "History"
 },
 {
   "id": "IndividualStudiesBPS",
   "name": "Individual Studies BPS"
 },
 {
   "id": "IndustrialSupervision",
   "name": "Industrial Supervision"
 },
 {
   "id": "Journalism",
   "name": "Journalism"
 },
 {
   "id": "Kinesiology",
   "name": "Kinesiology"
 },
 {
   "id": "Management",
   "name": "Management"
 },
 {
   "id": "ManufacturingEngineering",
   "name": "Manufacturing Engineering"
 },
 {
   "id": "ManufacturingEngineeringTechnology",
   "name": "Manufacturing Engineering Technology"
 },
 {
   "id": "Marketing",
   "name": "Marketing"
 },
 {
   "id": "Mathematics",
   "name": "Mathematics"
 },
 {
   "id": "MathematicsTeaching",
   "name": "MathematicsTeaching"
 },
 {
   "id": "MechanicalEngineering",
   "name": "Mechanical Engineering"
 },
 {
   "id": "NursingBSNRNToBSNOnlineCompletion",
   "name": "Nursing BSN RN To BSN Online Completion"
 },
 {
   "id": "NursingBSNRNToBSN",
   "name": "Nursing BSN RN To BSN"
 },
 {
   "id": "NursingBSN",
   "name": "Nursing BSN"
 },
 {
   "id": "Philosophy",
   "name": "Philosophy"
 },
 {
   "id": "Physics",
   "name": "Physics"
 },
 {
   "id": "PoliticalScience",
   "name": "Political Science"
 },
 {
   "id": "Psychology",
   "name": "Psychology"
 },
 {
   "id": "PublicRelationsAndAdvertising",
   "name": "Public Relations And Advertising"
 },
 {
   "id": "RadioAndTechnology",
   "name": "Radio And Technology"
 },
 {
   "id": "RadiologicAndImagingSciences",
   "name": "Radiologic And Imaging Sciences"
 },
 {
   "id": "RespiratoryTherapy",
   "name": "Respiratory Therapy"
 },
 {
   "id": "RTTToBSRTOnlineCompletion",
   "name": "RTT To BSRT Online Completion"
 },
 {
   "id": "ScienceTeaching",
   "name": "Science Teaching"
 },
 {
   "id": "SocialWork",
   "name": "Social Work"
 },
 {
   "id": "Sociology",
   "name": "Sociology"
 },
 {
   "id": "SpecialEducation",
   "name": "Special Education"
 },
 {
   "id": "SportManagement",
   "name": "Sport Management"
 },
 {
   "id": "Statistics",
   "name": "Statistics"
 },
 {
   "id": "TheatreArts",
   "name": "Theatre Arts"
 },
 {
   "id": "Undecided",
   "name": "Udecided"
 },
 {
   "id": "VisualArtP12Teaching",
   "name": "Visual Art P12 Teaching"
 },
 {
   "id": "WorldLanguagesAndCultures",
   "name": "World Languages And Cultures"
 },
 {
   "id": "WorldLanguagesAndCulturesTeaching",
   "name": "World Languages And Cultures Teaching"
 }
 
];

var selectElement = document.getElementById('mjr');

feedata.map(item => mjr.appendChild(new Option(item.name, item.id)).cloneNode(true));

let housedata = [{
   "id": "4Person2BedroomDorm",
   "name": "4 Person/2 Bedroom Dorm"
 },
 {
   "id": "1Person2BedroomDorm",
   "name": "1 Person/2 Bedroom Dorm"
 },
 {
   "id": "4Person2BedroomApartment",
   "name": "4 Person/2 Bedroom Apartment"
 },
 {
   "id": "2Person2BedroomApartment",
   "name": "2 Person/2 Bedroom Apartment"
 },
 {
   "id": "2Person1BedroomApartment",
   "name": "2 Person/2 Bedroom Apartment"
 },
 {
   "id": "1Person1BedroomApartment",
   "name": "1 Person/1 Bedroom Apartment"
 }
 
];

var selectElement = document.getElementById('housing');

housedata.map(item => housing.appendChild(new Option(item.name, item.id)).cloneNode(true));

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