const axios = require("axios");
const dotenv = require("dotenv");
const url = require("url");
const readline = require("readline");

dotenv.config({
    path: './config.env'
});

const scanner = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const validateLink = function(data){
    try{
        new URL(data);
        return true;
    }catch(e){
        return false;
    }
};

scanner.question("🌏 Please provide a URL to shorten: \n", (data) => {
    if(validateLink(data)){
        shortenLink(data);
    }else{
        console.log("❎ Invalid link provided. Exiting...");
    }
    scanner.close();
});

const shortenLink = function(link){
    const options = {
        method: 'POST',
        url: 'https://api.short.io/links',
        headers: {
            'Content-Type': 'application/json',
            Authorization: process.env.SHORTIO_API_KEY
        },
        data: {
            domain: process.env.DOMAIN,
            originalURL: link,
        }
    };

    axios.request(options).then( (resp) => {
        console.log("🚀 Short Link: " ,resp.data.secureShortURL);
    }).catch( (err) => {
        console.log(err);
    });
}
