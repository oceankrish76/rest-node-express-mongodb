const router = require("express").Router({
    mergeParams: true
});
const mongoose = require("mongoose");

const Person = mongoose.model("Person")
const Customer = mongoose.model("Customer")

// task to fix: if customer is_active is false, Restrict the CRUD operation
router.get("/", async (req, res) => {
    try {
        // check if the customer is active
        // return proper message for inactive customer
        const customer = await Customer.findOne({
            _id: req.params.customerId
        })
        console.log(customer);
        if (customer.is_active === true) {
            // For active customer find all persons
            // it should not return deleted person
            //const persons = await Person.find()
            const persons = await Person.find({
                "is_deleted": false,
                "customer_id": customer.id
            })
            //console.log("not returning");
            res.send(persons)
        } else {
            res.send({
                "message": "Customer is not active"
            });
        }

    } catch (error) {
        res.status(500)
    }
});

router.get("/:personId", async (req, res) => {
    try {
        const person = await Person.findOne({
            _id: req.params.personId
        })
        const customer = await Customer.findOne({
            _id: req.params.customerId
        })
        if (person.is_deleted === true || customer.is_active === false) {
            res.send({
                "message": "Person is deleted or the customer is Inactive "
            });
        } else {
            res.send(person)
        }
    } catch (error) {
        res.status(500);
    }
});

router.put("/:personId", async (req, res) => {
    try {
        const person = await Person.findByIdAndUpdate({
            _id: req.params.personId
        }, req.body, {
            new: true,
            runValidators: true
            });
        
        const customer = await Customer.findOne({
             _id: req.params.customerId
        })
        if (customer.is_active === true) {
            res.send(person)
        } else {
            res.send({
                "message": "Inactive customer cannot update person(s)"
            })
        }

    } catch (error) {
        res.send(500)
    }
});

router.delete("/:personId", async (req, res) => {
    try {
        const person = await Person.findByIdAndRemove({
            _id: req.params.personId
        });

        res.send(person)

    } catch (error) {
        res.send(500)
    }
})


router.post("/", async (req, res) => {
    try {
        const person = new Person();
        person.firstname = req.body.firstname;
        person.lastname = req.body.lastname;
        person.role = req.body.role;
        person.customer_id = req.params.customerId;
        console.log(req.body);

        const customer = await Customer.findOne({
            _id: req.params.customerId
        })

        if (req.body.is_deleted) {
            person.is_deleted = req.body.is_deleted;
        } else {
            person.is_deleted = false;
        }
        await person.save();
        if (customer.is_active === true) {
            res.send(person)
        } else {
            res.send({
                "message": "Inactive customer cannot create person(s)"
            })
        }
    } catch (error) {
        res.status(500)
    }
})

module.exports = router;