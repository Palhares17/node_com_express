const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5431,
  user: 'root',
  password: 'root',
  database: 'mycontacts',
});

client.connect();

exports.Query = async (query) => {
  const { rows } = await client.query(query);
  return rows;
};
