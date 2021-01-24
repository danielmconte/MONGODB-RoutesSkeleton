// Use this file when you want to clear 
// and seed new data into your db 
// In terminal: node seed.js

const mongoose = require('mongoose');
const EduBlock = require('./models/eduBlock');

mongoose.connect('mongodb://localhost:27017/fruitful-supply', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    await EduBlock.deleteMany({});
    const blockOne = new EduBlock({
        title: 'Linked List', 
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Singly-linked-list.svg/1920px-Singly-linked-list.svg.png',
        summary: 'A linear collection of data elements whose order is not given by their physical placement in memory. Instead, each element points to the next.'});
    await blockOne.save();
    const blockTwo = new EduBlock({
        title: 'Binary Search Tree', 
        image:  'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Binary_search_tree.svg/1024px-Binary_search_tree.svg.png',
        summary: "A rooted binary tree whose internal nodes each store a key greater than all the keys in the node's left subtree and less than those in its right subtree."});
    await blockTwo.save();
    const blockThree = new EduBlock({
        title: 'Stack', 
        image: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Lifo_stack.png',
        summary: 'A collection of elements, with two main principal operations: Push, which adds an element to the collection, and Pop, which removes the most recently added element that was not yet removed.'});
    await blockThree.save();
}

seedDB().then(() => {
    mongoose.connection.close();
});