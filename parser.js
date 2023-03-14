
// Requiring the module
const reader = require('xlsx')

// Reading tuition file
const file = reader.readFile('./Testing.xlsx')
  
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

const credithrsIN = 18;
let majorFilter = data.find(t=>t.Majors == "Respiratory Therapy"); //finding fees specific to major

let majorsList = data.map(t=>t.Majors); //mapping array of majors

//fee constants
const costpercredithrIN = (majorFilter['CostPerCreditHourIN']*credithrsIN);

//console.log(majorsList);
//console.log(majorFilter);

//printing test calculations
//console.log(costpercredithrIN);
