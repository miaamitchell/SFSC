
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
let majorFilter = data.find(t=>t.Majors == "Respiratory Therapy"); //finding data specific to major
const array = Object.values(majorFilter);

//prints array of costs for major
console.log(array);

//printing test calculation
console.log(array[1]*credithrsIN); //multiply costpercredithrIN * credithrsIN



// Printing data
//console.log(data)


// //import dependencies
// const XLSX = require("xlsx");

// //read the file into memory
// //const workbook = XLSX.read(fs.readFileSync("file-example.xlsx:"));
// const workbook = XLSX.readFile("Fees.xlsx");

// //convert the XLSX into JSON
// let worksheets = {};
// for(const Sheet1 of workbook.Sheet1) {
//     //some helper functions in XLSX.utils generate different views of the sheets:
//     //  XLSX.untils.sheet_to_json generates an array of objects
//     worksheets[Sheet1] = XLSX.utils.sheet_to_json(workbook.Sheets[Sheet1]);

// }

// //show the data as JSON
// console.log("json:\n", JSON.stringify(worksheets.Sheet1), "\n\n");



// const xlsxFile = require('read-excel-file/node');

// xlsxFile('./Fees.xlsx')
//     .then((rows) => {
//         const columnNames = rows.shift(); //separate first row w/ column names
//         const objs = rows.map((row) => { //map rest of row into columns
//             const obj = {}; //create object literal for current row
//             row.forEach((cell,i) => {
//                 obj[columnNames[i]] = cell; //use index from current cell to get column name, add current cell to new objecy
//             });
//             return obj; 
//             console.log(objs); //display array of objects on console
//         });
//     });