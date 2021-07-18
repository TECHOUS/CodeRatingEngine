const request = require('supertest');
const app = require('../server');

describe('testing the code rating engine APIs',() => {
    let token = "";
    beforeEach('get the random codes with token', async () => {
        try{
            const res = await request(app)
            .get('/api/v1/randomCodes')
            .expect(200)
            token = res.body.accessToken;
        }catch(err){
            console.log(err)
        }
    });
    
    it('testing winner calculations', ()=>{
        request(app)
        .put('/api/v1/rateCode')
        .type('json')
        .send({
            'winner': 1,
            'codeId1': '55dfc162f8163243c9c7e155e9a9a26b9528be73',
            'codeId2': '489e8fe91b2db73cc0f8f78b831fabb1b927d2b5',
            'codeRatingEngineToken': token
        })
        .expect(200)
    })

    it('search the users', ()=>{
        request(app)
        .get('/api/v1/searchUser')
        .query({username: 'GauravWalia19'})
        .send({'codeRatingEngineToken': token})
        .expect(200)
        .end((err, res)=>{
            if(err) console.log(err)
        })
    })
});