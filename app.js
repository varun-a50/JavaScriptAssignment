
const express = require('express');
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));



let accessToken;
app.get('/form', (req, res) => {
    res.sendFile(__dirname + '/public/home.html');

})
app.get('/newCustomer', (req, res) => {
    res.sendFile(__dirname + '/public/new_customer.html');
})


app.get('/customer_list', async (req, res) => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "JSESSIONID=4E75BC588AA13B5692300098FDEC5FE8");
   
    var raw = JSON.stringify({
        "login_id": "test@sunbasedata.com",
        "password": "Test@123"
    });
    
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const data = await fetch("https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list", requestOptions)
        .then(response => response.text())
        .then(result => { return result })
        .catch(error => console.log({error}));

    res.send(data);
})

//-------------------------------------------------------------------------------------------------------------------------------
app.post('/addCustomer', async (req, res) => {
    var myHeaders = new Headers();

    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "JSESSIONID=8333E25A2C98E87F68051062393BD601");



    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(req.body),
        redirect: 'follow'
    };


    const newData = await fetch("https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=create", requestOptions)
        .then(response => response.text())
        .then(result => {
            return result
        })
        .catch(error => console.log({error}));



    res.send(newData);

})
//-----------------------------------------------------------------------------------------------------------------------------
app.get('/allCustomers', async (req, res) => {
    res.sendFile(__dirname + '/public/customers.html');
})
//-----------------------------------------------------------------------------------------------------------------------------
app.post('/getAccessToken', async (req, res) => {


    var requestOptions = {
        method: 'POST',
        body: JSON.stringify(req.body),
        redirect: 'follow'
    };


    accessToken = await fetch("https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp", requestOptions)
        .then(response => response.text())
        .then(result => { return JSON.parse(result).access_token })
        .catch(error => console.log({error}));

    res.send(accessToken);
})
//---------------------------------------------------------------------------------------------------------------------------------
app.post('/updateData', async (req, res) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "JSESSIONID=8333E25A2C98E87F68051062393BD601");



    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(req.body),
        redirect: 'follow'
    };

    const TestData = await fetch(`https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=update&uuid=${req.body.uuid}`, requestOptions)
        .then(response => response.text())
        .then(result => { return result })
        .catch(error => console.log({error}));


    res.sendFile(__dirname + '/public/customers.html');
})


//----------------------------------------------------------------------------------------------------------------------------------
app.post('/deleteCustomer', async (req, res) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    myHeaders.append("Cookie", "JSESSIONID=8333E25A2C98E87F68051062393BD601");


    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: req.body.uuid,
        redirect: 'follow'
    };

   const deleteData = await fetch(`https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=delete&uuid=${req.body.uuid}`, requestOptions)
        .then(response => response.text())
        .then(result => {return result})
        .catch(error => console.log({error}));

        res.redirect('/public/customers.html');
})

//----------------------------------------------------------------------------------------------------------------------------
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
})

//-------------------------------------------------------------------------------------------------------------------------------
