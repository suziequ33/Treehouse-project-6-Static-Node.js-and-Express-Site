const express = require('express');
const app = express();
const projectTitle = 'Static Node.js and Express Site.';
const projectDescription = 'Created a portfolio site to showcase the project I have built. '

app.get('/', (req, res) => {
    res.render('project.pug', {projectTitle, projectDescription});
});


app.listen(3000, () => {
    console.log('Server running on port 3000');
});