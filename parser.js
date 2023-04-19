//creating empty arrays to store each dictionary
let majorDictionary = {};
let housingDictionary = {};
let mealDictionary = {};

var ExcelToJSON = function() {
   //parsing XLSX
   this.parseExcel = function() {
      var file = "https://usi-outreach-tsisc-safety-badge-system.s3.amazonaws.com/Public/SFSC/Fees.xlsx";
      //var file = "./Fees.xlsx";
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
         if (sheetName == 'majorFees') {
            //mapping list of majors & adding to dropdown selection
            var selectElement = document.getElementById('mjr');
            var majors = XL_row_object.map(t=>t.Majors)
            majors.forEach(item=> selectElement.appendChild(new Option(item)));

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
   } else if (sheetName == 'housingFees') {
      var column = 'Housing';
      var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);

      //mapping list of housings options & adding to dropdown selection
      var selectElement = document.getElementById('house');
      XL_row_object.map(t=>t.Housing)
         .forEach(item=>selectElement.appendChild(new Option(item)));

      //populating dictionary
      for (var i = 0; i < XL_row_object.length; i++) {
         var value = XL_row_object[i][column];
         if (value in housingDictionary) {
            housingDictionary[value].push(XL_row_object[i]);
         } else {
            housingDictionary[value] = [XL_row_object[i]];
         }
      }
   } else if (sheetName == 'mealPlans') {
      var column = 'MealPlan';
      var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);

      //mapping list of meal plans & adding to dropdown selection
      var selectElement = document.getElementById('meal');
      XL_row_object.map(t=>t.MealPlan)
         .forEach(item => selectElement.appendChild(new Option(item)));

      //populating dictionary
      for (var i = 0; i < XL_row_object.length; i++) {
         var value = XL_row_object[i][column];
         if (value in mealDictionary) {
            mealDictionary[value].push(XL_row_object[i]);
         } else {
            mealDictionary[value] = [XL_row_object[i]];
         }
      }
   }
   });
   };
   xhr.send();
};
};

const excelToJSON = new ExcelToJSON();
excelToJSON.parseExcel();