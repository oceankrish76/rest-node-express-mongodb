const router = require("express").Router({
    mergeParams: true
});
const mongoose = require("mongoose");

const Person = mongoose.model("Person")

router.get("/", async (req, res) => {
    try {
        const persons = await Person.find({})
        res.send(persons)
    } catch (error) {
        res.status(500)
    }
});

router.get("/:personId", async (req, res) => {
    try {
        const person = await Person.findOne({
            _id: req.params.personId
        })
        if (person.is_deleted === true) {
            res.send({
                "message": "Person is deleted"
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

        res.send(person)

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
        if (req.body.is_deleted) {
            person.is_deleted = req.body.is_deleted;
        } else {
            person.is_deleted = true;
        }
        await person.save();
        res.send(person)
    } catch (error) {
        res.status(500)
    }

})

module.exports = router;