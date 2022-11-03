// api.openweathermap.org/data/2.5/weather?q=Guwahati&APPID=541cb3cd2c2424526a4ff9d41d67e6dc
const http = require('http');
const fs = require('fs');
const requests = require('requests')
const indexFile = fs.readFileSync('index.html', 'utf-8');

const replaceVal = (tempVal, orgVal)=>{
    let temperature = tempVal.replace("{%location%}", orgVal.name);
    temperature = temperature.replace("{%country%}", orgVal.sys.country);
    temperature = temperature.replace("{%tempval%}", orgVal.main.temp);
    temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min);
    temperature = temperature.replace("{%tempmaxval%}", orgVal.main.temp_max);
    temperature = temperature.replace("{%temStatus%}", orgVal.weather[0].main);
    return temperature;
}
const server = http.createServer((req,res)=>{
    if(req.url == '/'){
        requests(
            'http://api.openweathermap.org/data/2.5/weather?q=Guwahati&&APPID=541cb3cd2c2424526a4ff9d41d67e6dc'
        )
        .on('data',(chunk)=>{
        //for convert json to obj for more readalbe :)
            const objData = JSON.parse(chunk); 
            const arrData = [objData] // we creted new arry for use it on our app
            const realData = arrData.map((val)=>replaceVal(indexFile, val)).join(' ');
            res.write(realData);
        })
        .on('end',(err)=>{
            if(err) return console.log('connection close due to err', err);
            res.end();
        });
    }
});
server.listen(7000, '127.0.0.1',()=>{
    console.log('server is running............');
});