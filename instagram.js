// First install Minimist by npm install minimist
//Then intsall puppeteer by npm install puppeteer

const minimist = require("minimist");
const puppeteer = require("puppeteer");
const fs = require("fs");


let args = minimist(process.argv);

let configjson  = fs.readFileSync(args.config,"utf-8");
let configjso = JSON.parse(configjson);


instagram();
async function instagram(){

    let browser = await puppeteer.launch({
        headless:false,
        args:[
            '--start-maximized',
           
            
        ],
        defaultViewport:null
    });

    let pages = await browser.pages();
    let page = pages[0];

    await page.goto(args.url);

    await page.waitForSelector("input[name='username']");
    await page.type("input[name='username']",configjso.username,{delay:600});

    await page.waitForSelector("input[name='password']");
    await page.type("input[name='password']",configjso.password,{delay:600});

    await page.waitForSelector("button[type='submit']");
    await page.click("button[type='submit']");
    
    
    await page.waitForSelector("button.HoLwm");
    await page.click("button.HoLwm");
    
    await autoScroll(page);
    await page.waitFor(5000);
    await page.waitForSelector("span.fr66n > button.wpO6b");
    let likesArray = await page.$$("span.fr66n > button.wpO6b");

    console.log(likesArray.length);
    for (let i = 0; i < likesArray.length; i++) {
        await likesArray[i].click({ delay: 100 });
}

}

async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= 1438) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}



