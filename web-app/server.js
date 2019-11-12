'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config({path: __dirname + '/.env'});
const router = express.Router();

// set up environment vars
const dbUser = process.env.MONGODB_USER;
const dbPassword = process.env.MONGODB_PASSWORD;
const db = process.env.MONGODB_DB;

const port = process.env.PORT || 4000;
const httpsPort = process.env.HTTPS_PORT || 4443;
const sslCertPath = process.env.SSL_CERT_PATH;
const sslKeyPath = process.env.SSL_KEY_PATH;

if (!dbUser || !dbPassword || !db)
  throw 'Environment variables MONGODB_USER, MONGODB_PASSWORD, ' +
    + 'and MONGO_DB must be set';

// const Watch = require('./watch');
// const Website = require('./website');

mongoose.connect('mongodb://' + dbUser + ':' + dbPassword + '@' + db);

// Create our Express application
const app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// this does something?
app.use(bodyParser.json());
app.use(bodyParser());

app.use('/app', express.static('web/dist'));

app.use('/api', router);

/*

const watchesRoute = router.route('/watches');
const watchRoute = router.route('/watch/:id');

const websitesRoute = router.route('/websites');





// -- ROUTES --

// needed for CORS I think? but we're not using it, whatever
watchesRoute.options(function(req, res) {
  res.writeHead(200);
  res.end();
});

// needed for CORS I think? but we're not using it, whatever
watchRoute.options(function(req, res) {
  res.writeHead(200);
  res.end();
});

// needed for CORS I think? but we're not using it, whatever
websitesRoute.options(function(req, res) {
  res.writeHead(200);
  res.end();
});




// allows filtering by URL, email
watchesRoute.get((req, res) => {

  let queryParams = {};

  if (req.params.url) {
    queryParams.url = req.params.url;
  }

  if (req.params.email) {
    queryParams.watchers = {
      email: req.params.email
    };
  }

  const query = Watch.find(queryParams);
  query.exec((err, watches) => {

    if (err) return res.status(500).json({
      success: false,
      message: 'internal server error'
    });

    // get website details so we can sub website ID for name
    const query2 = Website.find();
    query2.exec((err, websites) => {

      if (err) return res.status(500).json({
        success: false,
        message: 'internal server error'
      });

      const websiteDict = {};
      websites.forEach(website => {
        websiteDict[website.id] = website.name;
      });

      const watchesPlus = watches.map(watch => watch.toObject());

      // sub website ID for name
      for (let index in watchesPlus) {
        watchesPlus[index].websiteName =
          websiteDict[watchesPlus[index].website];
        watchesPlus[index].websiteId = watchesPlus[index].website;
      }

      res.json({
        success: true,
        message: 'welp, here it is',
        data: watchesPlus
      });

    });
  });
});

// create da watches
watchesRoute.post((req, res) => {
  if (!req.body.url) return res.status(400).json({
    success: false,
    message: 'URL is required'
  });

  if (!req.body.watchers) return res.status(400).json({
    success: false,
    message: 'watchers are required'
  });

  const title = req.body.title;
  const url = req.body.url;
  const website = req.body.website;
  const watchers = req.body.watchers;

  const watch = new Watch({ title, url, website, watchers });
  watch.save((err, watch) => {
    if (err) return res.status(500).json({
      success: false,
      message: err
    });

    return res.status(201).json({
      success: true,
      message: 'watch created successfully',
      data: watch
    });
  });
});




// gets one watch row
watchRoute.get((req, res) => {

  const watchId = req.params.id;

  if (!watchId.match(/^[0-9a-fA-F]{24}$/)) return res.status(404).json({
    success: false,
    message: 'watch not found'
  });

  Watch.findById(watchId, (err, watch) => {

    if (err) return res.status(500).json({
      success: false,
      message: 'internal server error'
    });

    if (!watch) return res.status(404).json({
      success: false,
      message: 'watch not found'
    });

    return res.json({
      success: false,
      message: 'welp, here it is',
      data: watch
    });
  });
});

watchRoute.put((req, res) => {
  const watchId = req.params.id;

  if (!watchId.match(/^[0-9a-fA-F]{24}$/)) return res.status(404).json({
    success: false,
    message: 'watch not found'
  });

  Watch.findById(watchId, (err, watch) => {

    if (err) return res.status(500).json({
      success: false,
      message: 'internal server error'
    });

    if (!watch) return res.status(404).json({
      success: false,
      message: 'watch not found'
    });

    watch.title = req.body.title || '';
    watch.url = req.body.url || '';
    watch.website = req.body.website || 0;
    watch.watchers = req.body.watchers || [];

    watch.save((err, watch) => {
      if (err) return res.status(500).json({
        success: false,
        message: err
      });

      return res.json({
        success: true,
        message: 'watch updated successfully',
        data: watch
      });
    });
  });
});

watchRoute.delete((req, res) => {
  const watchId = req.params.id;

  if (!watchId.match(/^[0-9a-fA-F]{24}$/)) return res.status(404).json({
    success: false,
    message: 'watch not found'
  });

  Watch.findByIdAndRemove(watchId, (err, watch) => {

    if (err) return res.status(500).json({
      success: false,
      message: 'internal server error'
    });

    if (!watch) return res.status(404).json({
      success: false,
      message: 'watch not found'
    });

    return res.json({
      success: false,
      message: 'watch deleted',
      data: watch
    });
  });
});





websitesRoute.get((req, res) => {

  const query = Website.find();
  query.exec((err, websites) => {

    if (err) return res.status(500).json({
      success: false,
      message: 'internal server error'
    });

    res.json({
      success: true,
      message: 'welp, here it is',
      data: websites
    });
  });
});


*/

// -- SERVE --

app.listen(port);
console.log('Server running on port ' + port);

// serve on HTTPS also

if (!sslCertPath || !sslKeyPath)
  console.log('Note: environment variables SSL_CERT_PATH and '
    + 'SSL_KEY_PATH must be set to serve on HTTPS');
else {
  const https = require('https');
  const fs = require('fs');
  const options = {
    cert: fs.readFileSync(sslCertPath),
    key: fs.readFileSync(sslKeyPath)
  };
  https.createServer(options, app).listen(httpsPort);
  console.log('HTTPS server running on port ' + httpsPort);
}
