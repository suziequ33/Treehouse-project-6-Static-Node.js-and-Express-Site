const express = require('express');
const app = express();
const data = require('./data.json');
//const path = require('path');

//set the engine to pug
app.set('view engine', 'pug');

//set the static files from the 'public' directory under the '/static' path
app.use('/static', express.static('public'));

//"index" routes to render the "home" page with project data
app.get('/', (req, res) => {
    console.log(data.projects);
    res.render('index', { projects: data.projects });
});

//'about' route to render the 'About' page
app.get('/about', (req, res) => {
    res.render('about');
});

//Dynmic 'project' routes based on project id
app.get('/project/:id', (req, res, next) => {
    const projectId = req.params.id;
    const project = data.projects.find(project => project.id.toString() === projectId);
    if(!project) {
        const error = new Error('Project not found');
        error.status = 404;
        next(error);
    }
    res.render('project', { project });
});

//404 handler
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

//global error handler
app.use((err, req, res, next) => {
    err.status = err.status || 500;
    err.message = err.message || 'Internal Server Error';
    console.error(` ${err.status} - ${err.message}`);
    res.status(err.status).render('error',  {error: err});
});


app.listen(3000, () => {
    console.log('Server running on port 3000');
});