const express = require('express')
const cors = require('cors')
const app = express();

import routes from "./routeModules/routes";

app.use(express.json({
  limit : "50mb"
}))
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.use('/api',routes)

app.listen(4000, () => {
    console.log("server started on port 4000");
  });
  
