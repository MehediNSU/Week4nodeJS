const express = require('express');
const fs = require('fs');

const app = express();

//This is the default json object
const newCustomer = { 
    name: 'Robin',
    age: 26, 
    gender: 'Male', 
    id: 1208,
    address: "Brain Station 23 Ltd"
};

const data = JSON.stringify(newCustomer, null, 2);

//Default page
app.get('/',(req, res, next) => {
    res.send('This is homepage')
    console.log(
        `${new Date(Date.now()).toLocaleString()} - ${req.method} - ${req.originalUrl} - ${req.protocol} - ${req.ip}`
    );
    next();
})

 //This is the writeFile block
app.post('/write',(req, res, next) => {
    res.send('This is write page')
    fs.writeFile('newCustomer.json', data, (err) => {
    if (err) throw err;
    next();
  });
});

//This is the readFile block
app.get('/read',(req, res, next) => {
    res.send('This is read page')
    fs.readFile('customer.json', (err, data) => {
    if (err) throw err;
    let customer = JSON.parse(data);
    console.log('This is read file');
    console.log(customer);
    next();
  });
});

//This is the updateFile block
app.get('/update', (req, res, next) => {
 res.send('This is update page')
        fs.readFile('customer.json', (err, data) => {
        if (err) throw err;
        let customer = JSON.parse(data);
        customer.age +=1;
        console.log('This is update file');
        console.log(customer);
        
        fs.writeFile('customer.json', JSON.stringify(customer), (err) =>{
        if (err) throw err;
        })
    });
next();
})

app.listen(3000, () => {
    console.log('Server listening on port 3000');
})