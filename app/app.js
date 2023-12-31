/*
 * Copyright (c) 2012-2019 Red Hat, Inc.
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Contributors:
 *   Red Hat, Inc. - initial API and implementation
 */

/*eslint-env node*/

var express = require('express');
const axios = require("axios");
const mysql = require("mysql2");
var app = express();


var connection = mysql.createConnection({
  host     : 'mysql.hackuser53.svc.cluster.local',
  user     : 'mysql',
  password : 'password',
  database : "sampledb"
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});


async function testApi(){
  const query = await axios.get("https://jsonplaceholder.typicode.com/users");
  
  return query.data;
}



app.get('/', async function (req, res) {
 const checkingData =  await testApi();
 console.log("Data Check",checkingData);
  res.status(200).json({message:"Hi from Remote GitHub Repository",data:checkingData});
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
