var http = require('http');
var formidable = require('formidable');  

var mysql = require('mysql');

console.log("6.	Design a web page to fetch the profile of a student from mongodb/mysql database using node.js\n");
console.log("Server Running at http://localhost:8090 \nOpen the browser and type the url specified here to Fetch Profile of Student");        


http.createServer(function (req, res) {

      var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "sandb"
      });

      con.connect(function (err) {
        if (err) throw err;

        con.query("SELECT * FROM student WHERE usn ='san'", function (err, result) {

          if (err) throw err;
          res.writeHead(200, { 'Content-Type': 'text/html' });     
          res.write("6.	Design a web page to fetch the profile of a student from mongodb/mysql database using node.js");

          res.write("<br><br><table border=1 align=center width=50%> "); 
          res.write("<caption> Profile of : " + result[0].name   +  "</caption>");
		res.write("<tr><td> USN  </td><td>" + result[0].usn + "</td></tr>" +
                          "<tr><td> Name </td><td>" + result[0].name + "</td></tr>" +
                          "<tr><td> Gender </td><td>" + result[0].gender + "</td></tr>" +
                          "<tr><td> Program </td><td>" + result[0].program + "</td></tr>" + 
			            "<tr><td> Sem </td><td>" + result[0].sem + "</td></tr>");
			              
          
          res.write("</table>");
          res.end();
        });
      });    
   
}).listen(8090);