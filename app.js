const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
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

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/blocks', async (req, res) => {
    const blocks = await EduBlock.find({});
    res.render('blocks/index', { blocks })
})

app.get('/blocks/new', async (req, res) => {
    res.render('blocks/new');
})

app.post('/blocks', async (req, res) => {
   const block = new EduBlock(req.body.block);
   await block.save();
   res.redirect(`/blocks/${block._id}`);
})

app.get('/blocks/:id', async (req, res) => {
    const block = await EduBlock.findById(req.params.id);
    res.render('blocks/show', { block });
})

app.get('/blocks/:id/edit', async (req,res) => {
    const block = await EduBlock.findById(req.params.id);
    res.render('blocks/edit', { block });
})

app.put('/blocks/:id', async(req, res) => {
    const { id } = req.params;
    const block = await EduBlock.findByIdAndUpdate(id, { ...req.body.block });
    res.redirect(`/blocks/${block._id}`);
})

app.delete('/blocks/:id', async (req, res) => {
    const {id} = req.params;
    await EduBlock.findByIdAndDelete(id);
    res.redirect('/blocks');
})


app.listen(3000, () => {
    console.log('The Server is listening on Port 3000')
})