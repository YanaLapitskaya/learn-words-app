const express = require('express');
const aws=require('./aws-methods.js');
const path=require('path');
const bodyParser = require('body-parser');
const app = express();

app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use("/styles",express.static(__dirname + "/styles"));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
	res.render('index');
})

app.post('/',(req,res)=>{
	let text=req.body.text;
	let words=text.split(' ');
	words.forEach((word)=>{
		aws.sendMessage(word);
	});
	res.redirect('/receive');
})

app.get('/receive', async (req, res) => {
	let message=await aws.receiveMessage();
	res.render('words',{ word: message.Body});
})


app.get('/delete', (req, res) => {
	aws.deleteMessage("");
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))