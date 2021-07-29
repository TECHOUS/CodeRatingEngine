import {dirname} from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import Rainbow from '@techous/rainbowjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rainbow = new Rainbow();
let tests = [];

function it(name, fn){
    tests.push({name,fn});
}
global.it = it;

function run(){
    let testsPassed = 0;
    let testsFailed = 0;
    tests.forEach(test => {
		Promise.all([test.fn()])
        .then(p => {
            console.log('✅', test.name)
            testsPassed++;
        })
        .catch(e => {
            console.log('❌', test.name)
            testsFailed++;
        });
    });
    if(testsPassed>0){
        console.log(rainbow.getColorString('Lg',`${testsPassed} passing`,true));
    }
    if(testsFailed>0){
        console.error(rainbow.getColorString('Dr',`${testsFailed} failing`,true));
    }
}

// reading current directory
fs.readdir(__dirname, (err, files)=>{
    if(err)
        return console.log('Unable to scan directory: ' + err);
    
    files.forEach(async (fileName)=> {
        // fetch out the .crt files
        if(!fileName.includes('coderatingtest') && fileName.includes('.crt.js')){
            await import(`./${fileName}`)
            run();
        }
    });
})