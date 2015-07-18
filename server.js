var fs = require('fs');
var express = require('express');
var React = require('react');
var Handlebars = require('handlebars');

var locationsComponent = require('./src/components/locations.jsx');

var source = fs.readFileSync('./layouts/index.hbs', 'utf8');
var template = Handlebars.compile(source);
var app = express();

// Temp demo data
var locations = [
    { id: 0, name: 'Abu Dhabi' },
    { id: 1, name: 'Berlin' },
    { id: 2, name: 'Bogota' }
];

var renderIndex = function renderIndex(req, res) {
    // Creates a react element from the locations component, used
    // below for rendering
    var locationsEl = React.createFactory(locationsComponent);
    var bootstrapData = {
        locations: locations
    };

    // console.log(React.renderToString(locationsEl(bootstrapData)))

    // Set the response to HTML and render the Handlebars template,
    // first with the markup, rendered from React, then with
    // the bootstrapData
    res.setHeader('Content-Type', 'text/html');
    res.send(template({
        name: 'React Server Rendering',
        markup: React.renderToString(locationsEl(bootstrapData)),
        bootstrapData: JSON.stringify(bootstrapData)
    }));
};

app.use(express.static(__dirname + '/public'));
app.get('/', renderIndex);
app.listen(3002);
