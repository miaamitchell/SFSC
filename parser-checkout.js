//creating empty arrays to store each dictionary
var majorDictionary = {};
var housingDictionary = {};
var mealDictionary = {};
var lastModified = "";

var ExcelToJSON = function() {
   //parsing XLSX
   this.parseExcel = function() {
      return new Promise((resolve,reject) => {
         //var file = "https://pilotusi-my.sharepoint.com/:x:/r/personal/mmitchell1_eagles_usi_edu/Documents/Fees.xlsx?d=w221a6e8e9a2849e39bfece2de096339e&csf=1&web=1&e=EDcqHE";
         var file = "https://usi-outreach-tsisc-safety-badge-system.s3.amazonaws.com/Public/SFSC/Fees.xlsx";
         //var file = "./Fees.xlsx";
         var xhr = new XMLHttpRequest();
         xhr.open('GET', file, true);
         xhr.responseType = 'arraybuffer';
         xhr.onload = function(e) {
            var data = new Uint8Array(xhr.response);
            lastModified = xhr.getResponseHeader('Last-Modified');
            var workbook = XLSX.read(data, { type: 'array'});

            workbook.SheetNames.forEach(function(sheetName) {
            // Here is your object
            var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            if (sheetName == 'majorFees') {
   
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
   resolve();
   };
   xhr.send();
});
};
};