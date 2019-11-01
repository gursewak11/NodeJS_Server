const express= require("express");
const hbs = require("hbs");  
const fs = require('fs');

const port = process.env.PORT || 3000;

let app= express();

hbs.registerPartials(__dirname + '/views/partials');       
app.set('viewEngin', 'hbs'); 

app.use((req, res, next)=>{                 
    const now= new Date().toString();
    const log= `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (error)=>{
        if(error){
            console.log("Unablem to append data to file");
        }
    });
    next();
})

app.use(express.static(__dirname + '/public'));  //kind of middleware

hbs.registerHelper('getCurrentYear', ()=>{  
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.get('/', (req, res)=>{ 
    var context = {         
        pageTitle: 'Home Page',
        dis: 'Hello I am Lucifer Morning Star',
    }; 
    res.render('home.hbs',context)
});

app.get('/about',(req, res)=>{     
    res.render('about.hbs',{
        pageTitle: 'About Page',
    })
});

app.get('/bad', (req, res)=>{
    res.send({
        message: "Error message"
    });
});

app.get('/projects',(req, res)=>{
    res.render('project.hbs',{
        
    });
});

app.listen(port, ()=>{                         
    console.log('Server is up on port 3000');
});  