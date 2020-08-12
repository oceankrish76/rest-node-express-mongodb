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
        res.render('customer-view.ejs', {
            all_customers: customers
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
            res.send(customer)
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

router.delete("/:customerId", async (req, res) => {
    try {
        const customer = await Customer.findByIdAndRemove({
            _id: req.params.customerId
        });
        res.send(customer)

    } catch (error) {
        res.send(500)
    }
})


router.post("/", async (req, res) => {
    try {
        const customer = new Customer();
        customer.name = req.body.name;
        customer.url = req.body.url;
        // task to fix
        if (req.body.is_active) {
            customer.is_active = req.body.is_active;
        } else {
            customer.is_active = true;
        }
        await customer.save();
        res.send(customer)
    } catch (error) {
        res.status(500)
    }

})

module.exports = router;