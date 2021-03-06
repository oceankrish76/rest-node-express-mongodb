const router = require("express").Router();

const mongoose = require("mongoose");
const express = require("express");

const Customer = mongoose.model("Customer")

const app = express();

app.use(express.static(__dirname + '/public'));
app.set('views', './views');
app.set('view engine', 'ejs');
router.get("/", async (req, res) => {
    try {
        const customers = await Customer.find({})
        //res.send(customers)
        res.format({
            'text/html': function () {
                res.render('customer-view.ejs', {
                    all_customers: customers
                })
            },
            'application/json': function () {
                //res.send(customers)
                res.header('Access-Control-Allow-Origin', '*');

                res.send({
                    message: 'hey'
                });
            }
        })
    } catch (error) {
        res.status(500)
    }

});

router.get("/:customerId", async (req, res) => {
    try {
        const customer = await Customer.findOne({
            _id: req.params.customerId
        })
        if (customer.is_active === false) {
            res.send({
                "message": "Customer is not active"
            });
        } else {
            res.format({
                'text/html': function () {
                    //res.send(customer)
                    res.render('individual-customer.ejs', {
                        customerdata: [customer]
                    })
                }
            })
        }
    } catch (error) {
        res.status(500);
    }
});

router.put("/:customerId", async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate({
            _id: req.params.customerId
        }, req.body, {
            new: true,
            runValidators: true
        });

        res.send(customer)

    } catch (error) {
        res.send(500)
    }
});

router.delete(":customerId", async (req, res) => {
    console.log("coming", req.params.customerId)
    try {
        var customer = await Customer.findByIdAndRemove({
            _id: req.params.customerId
        });

        // if was const canot override
        customer = customer.map(item => {
            if (item != req.params.customerId) {
                return item
            }
        })
        res.send(customer)

    } catch (error) {
        res.send(500)
    }
})

module.exports = router;