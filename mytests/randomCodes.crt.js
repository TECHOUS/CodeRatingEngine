import assert from 'assert';
import request from 'supertest';
import app from '../app';

console.log('testing the code rating engine APIs');

let token = "";
let codeId1 = "";
let codeId2 = "";
const SEARCH_USER = "GauravWalia19"; 
it('get the random codes with token', async () => {
    try{
        const res = await request(app)
        .get('/api/v1/randomCodes')
        assert.strictEqual(200, res.status)
        token = res.body.accessToken;
        codeId1 = res.body.codeObject1.codeId;
        codeId2 = res.body.codeObject2.codeId;
        console.log("Before ", token);
    }catch(e){
        return Promise.reject(e);
    }
});

it('search the users', async ()=>{
    try{
        const res = await request(app)
        .get('/api/v1/searchUser')
        .query({username: SEARCH_USER})
        .send({'codeRatingEngineToken': token})
        assert.strictEqual(200, res.status)
    }catch(e){
        return Promise.reject(e);
    }
})