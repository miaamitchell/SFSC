// Requiring the module
const reader = require('xlsx')

// Reading tuition file
const file = reader.readFile('./Majors.xlsx')
  
const data = [] //creating array
  
const sheets = file.SheetNames
  
for(let i = 0; i < sheets.length; i++)
{
   const temp = reader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]])
   temp.forEach((res) => {
      data.push(res)
   })
}

var credithrs = 18;
var inState = false;
var totalClasses = 6;
var onlineClasses = 3;
var hybridClasses = 3;

let majorFilter = data.find(t=>t.Majors == "Respiratory Therapy"); //finding fees specific to major

let majorsList = data.map(t=>t.Majors); //mapping array of majors

//fees
var costPerCreditHrIn = (majorFilter['CostPerCreditHourIN']*credithrs);
var costPerCreditHrOut = (majorFilter['CostPerCreditHourOut']*credithrs);

var univServiceFee3OrFewer = majorFilter['UniversityServicesFee3OrFewerCreditHrs']
var univServiceFee4To7= majorFilter['UniversityServicesFee4To7CreditHours']
var univService8OrMore = majorFilter['UniversityServicesFee8OrMoreCreditHrs']
var transportationFee = majorFilter['Transportation']

//Cost for Desired Credit Hours
if (inState) {
   console.log(costPerCreditHrIn);
} else {
   console.log(costPerCreditHrOut);
}

//University Services Fee
if (credithrs <=3) {
   console.log(univServiceFee3OrFewer)
} else if (credithrs > 3 && credithrs < 8) {
   console.log(univServiceFee4To7)
} else {
   console.log(univService8OrMore)
}

//Transportation Fee
if(totalClasses > (hybridClasses + onlineClasses)) {
   console.log(transportationFee)
} else {
   console.log('No transportation fee.')
}



//console.log(majorsList);
//console.log(majorFilter);

//printing test calculations
//console.log(costPerCreditHrIn);