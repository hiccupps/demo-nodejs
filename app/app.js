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
var app = express();


async function testApi(){
  const query = await axios.get("https://jsonplaceholder.typicode.com/users");
  
  return query.data;
}



app.get('/', async function (req, res) {
 const checkingData =  await testApi();
 console.log("Data Check",checkingData);
  res.status(200).json({message:"Hi from OpenShift",data:checkingData});
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
