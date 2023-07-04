var http = require('http');
var formidable = require('formidable');  
var mysql = require('mysql');

console.log("7.	Create a web page to fetch data from database and display all students of MCA 2 semester who have chosen AWT Course using use node js\n");
console.log("Server Running at http://localhost:8090 \nOpen the browser and type the url specified here to Fetch Student who have opted for AWT Course");        


http.createServer(function (req, res) {

      var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "sandb"
      });

      con.connect(function (err) {
        if (err) throw err;

        con.query("SELECT * FROM student WHERE course ='AWT' and program = 'mca' and semister = '2'", function (err, result) {

          if (err) throw err;
          res.writeHead(200, { 'Content-Type': 'text/html' });     
          res.write("7.	Create a web page to fetch data from database and display all students of MCA 2 semester who have chosen AWT Course using use node js\n");
          res.write("<table border=1><th>USN </th> <th>Name </th><th> Gender </th><th>Program </th><th> Sem </th><th> Course</th>"); 
          for (var i = 0; i < result.length; i++) {  
		res.write("<tr><td>" + result[i].usn + "</td><td>" + result[i].name + "</td><td>" +  result[i].gender + "</td><td>" + result[i].program + "</td><td>" + result[i].sem + "</td><td>" + result[i].course + "</td></tr>");              
   //         res.write('<tr><td>' + result[i].name + '</p>'); 
          }
          res.write("</table>");
          res.end();
        });
      });    
   
}).listen(8090);