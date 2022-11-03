
const fs = require("fs");
const path = require("path");
const FILE_NAME = "ski.csv";

const csvPath = path.join(__dirname,'csvs', FILE_NAME);
const csv = fs.readFileSync(csvPath, "utf-8");
//console.log(csv)
const rows = csv.split("\r\n")
//console.log(rows)
if(rows[rows.length - 1] === '') {
    //console.log("'' has been found");
    rows.pop();
}
//console.log(rows)

let results = []
let columnTitle = []
for (const i in rows){
    const row = rows[i]
    const data = row.split(",")
    if (i==="0") {
        columnTitle = data
    } else {
        let row_data = {}
        for (const index in columnTitle) {
            const title = columnTitle[index]
            row_data[title] = data[index]
        }
        results.push(row_data)
    }
}
// console.log(results)
//console.log(results[0]);
//console.log(results[0]['개방서비스명']);
//console.log(results[0]['소재지전체주소']);


//sql 접속
/*
1. query 문 insert

for(int = 0; i < results.size(); i++){

  query 넣는 문
  query(insert(?,?,?).mysql 자동으로 id +1 해주는 구문, results[i]['개방서비스명'], results[i]['소재지전체주소'])
  저장하겠지.

}


*/

const csvtojson = require('csvtojson');
const mysql = require("mysql");

// Database credentials
const hostname = "localhost",
	username = "root",
	password = "12341234",
	databsename = "teamproject"


// Establish connection to the database
let con = mysql.createConnection({
	host: hostname,
	user: username,
	password: password,
	database: databsename,
});

// CSV file name
const fileName = "ski.csv";

csvtojson().fromFile(fileName).then(source => {

	// Fetching the data from each row
	// and inserting to the table "sample"
	for (var i = 0; i < results.length; i++) {
		var l_id = results[i][""]
        address = results[i]["도로명전체주소"],
        l_store_name = results[i]["문화체육업종명"],
        latitude = results[i]["좌표정보(x)"],
        longtitude = results[i]["좌표정보(y)"],
        l_name = results[i]["사업장명"],
			  phone = results[i]["소재지전화"]
			  
		var insertStatement =
		`INSERT INTO location values(?, ?, ?, ?, ?, ?, ?)`;
		var items = [l_id, address, l_store_name, latitude, longtitude, l_name, phone ];

		// Inserting data of current row
		// into database
		con.query(insertStatement, items,
			(err, results, fields) => {
			if (err) {
				console.log(
	"Unable to insert item at row ", i + 1);
				return console.log(err);
			}
		});
	}
	console.log(
"All items stored into database successfully");
});