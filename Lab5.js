var http = require('http');
var formidable = require('formidable');  
var mysql = require('mysql');

console.log("5.Design a web page to register for an aspiring student to register for a program offered by the university using node.js and mysql database\n");
console.log("Server Running at http://localhost:8090 \nOpen the browser and type the url specified here to Register the Student");        

http.createServer(function (req, res) {
  if (req.url == '/register') {

    var form = new formidable.IncomingForm();   

    form.parse(req, function (err, fields) {    
      var con = mysql.createConnection({
        host: "localhost",
       user: "root",
        password: "",
        database: "sandb"
      });

      con.connect(function (err) {
        if (err) throw err;
        var sql = "insert into student (usn,name,gender,program,semister,course) VALUES ('" + fields.txtusn +  "','" + fields.txtname + "','" + fields.txtgender + "','" + fields.txtprogram + "','" + fields.txtsem + "','" + fields.txtcourse + "')";

        con.query(sql, function (err, result) {

          if (err) throw err;
          res.writeHead(200, { 'Content-Type': 'text/html' });      
            res.write("Registered Successfully" + "<a href=http://localhost:8090> Click for new Registration </a>");     
          
          res.end();
        });
      });
    });
  } else {

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write("5.Design a web page to register for an aspiring student to register for a program offered by the university using node.js and mysql database<hr>");
    res.write('<form action="/register" method="post">');    
    res.write('USN: <input type="text" name="txtusn"><br>');
    res.write('Name : <input type="text" name="txtname"><br>');
    res.write('Gender : <input type="text" name="txtgender"><br>');
    res.write('Program : <input type="text" name="txtprogram"><br>');
    res.write('Semester : <input type="text" name="txtsem"><br>');
    res.write('Course : <input type="text" name="txtcourse"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    res.end();
  }
}).listen(8090);