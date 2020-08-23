const router = require("express").Router({
    mergeParams: true
});

const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({
    extended: false
});
const Customer = mongoose.model("Customer")

const app = express();

app.use(express.static(__dirname + '/public'));
app.set('views', './views');
app.set('view engine', 'ejs');

app.post("/customers/postcustomer", async (req, res) => {
    res.render('post-customer.ejs');
    // try {
    //     const customer = new Customer();
    //     customer.name = req.body.name;
    //     customer.url = req.body.url;
    //     if (req.body.is_active) {
    //         customer.is_active = req.body.is_active;
    //     } else {
    //         customer.is_active = true;
    //     }
    //     await customer.save().then(data => console.log("Customer saved")).catch(err => console.err);
    //     res.render('post-customer.ejs', {
    //         post_customer: customer
    //     })

    // } catch (error) {
    //     res.status(500)
    // }

})

module.exports = router;