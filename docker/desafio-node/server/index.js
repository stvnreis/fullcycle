const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const config = {
  host: 'db',
  database: 'nodedb',
  user: 'root',
  password: 'root',
};

const connection = mysql.createConnection(config);

connection.query(`
  create table if not exists people(
    id int auto_increment primary key, 
    name varchar(50) not null
  );
`);

const sql = (name) => { return `insert into people(name) values('${name}')`; };


app.get('/', (req, res) => {
  connection.query(sql('Steven Reis'));

  connection.query(`select * from people`, (error, results, fields) => {
    const people = results.map((person) => {
      return `<p>${person.name}</p>`;
    })

    res.send(`
      <h1>Full Cycle!!!</h1>
      ${people.join(' ')}
    `);
  });
});

app.listen(port, () => {
  console.log(`http server listening on ${ port }`);
})