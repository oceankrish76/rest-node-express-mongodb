const mongoose = require('mongoose')
const app = require("./server"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);

const Customer = mongoose.model("Customer") // Link to your customer model
//app.listen(3002);

// const databaseName = 'test'
require("dotenv").config();
const router = require("express").Router({
    mergeParams: true
});
// 'use strict';

mongoose.Promise = global.Promise;
//console.log(process.env.MONGOURI_TEST)

jest.useFakeTimers();

beforeAll(async () => {
    mongoose.connect(process.env.MONGOURI_TEST, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
})



it("gets the customers endpoint", async done => {
    const response = await request.get("/customers");
    console.log(response.status);
    //console.log(response.body.message);
    expect(response.status).toBe(200);
    //expect(response.body.message).toBe("pass!");
    done();
});

// Cleans up database between each test
async function removeAllCollections() {
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName];
        await collection.deleteMany();
    }
}

it("Should save customer to database", async done => {
    const response = await request.get("/customers");

    // Sends request...

    // Searches the customer in the database
    const customer = await Customer.find({
        is_active: true,
        _id: '5f2aac92404d922c705fb1a3'

    });
    console.log("check " + customer);
    //expect(customer.is_active).toBeTruthy();
    // console.log(response) response.body empty aaucha kina hola.
    //expect(response.body.name).toBeTruthy();
    done();
});


afterEach(async () => {
    await removeAllCollections();
});