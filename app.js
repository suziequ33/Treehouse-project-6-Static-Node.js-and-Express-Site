const express = require('express');
const app = express();
const data = require('./data.json');
//const path = require('path');

//set the engine to pug
app.set('view engine', 'pug');

//set the static files from the 'public' directory under the '/static' path
app.use('/static',express.static('public'));

//"index" routes to render the "home" page with project data
app.get('/', (req, res) => {
    res.render('index', {projects: data.projects});
});

//'about' route to render the 'About' page
app.get('/about', (req, res) => {
    res.render('about');
});

//Dynmic 'project' routes based on project id
app.get('/project/:id', (req, res) => {
    const projectId = req.params.id;
    const project = data.projects.find(proj => proj.id === Number(projectId));
    if (project) {
        res.render('project', {project});
    } else {
        res.status(404).send('Project not found');
    }
});

//404 handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//global error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    console.error(`Error: ${err.message}, Status: ${err.status}`);
    res.render('error', {error: err});
});


app.listen(3000, () => {
    console.log('Server running on port 3000');
});