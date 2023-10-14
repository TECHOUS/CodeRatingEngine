const request = require('supertest')
const app = require('../api/app')

describe('testing the code rating engine APIs', () => {
    let token = ''
    let codeId1 = ''
    let codeId2 = ''
    const SEARCH_USER = 'GauravWalia19'
    beforeEach('get the random codes with token', async () => {
        console.log('getting the token')
        try {
            const res = await request(app)
                .get('/api/v1/randomCodes')
                .expect(200)
            token = res.body.accessToken
            codeId1 = res.body.codeObject1.codeId
            codeId2 = res.body.codeObject2.codeId
        } catch (err) {
            console.log('Error in getting random codes', err)
        }
    })

    it('testing winner calculations', (done) => {
        request(app)
            .put('/api/v1/rateCode')
            .type('json')
            .send({
                winner: 1,
                codeId1,
                codeId2,
                codeRatingEngineToken: token,
            })
            .expect(200)
            .end((err, res) => {
                if (err) done(err)
                else done()
            })
    })

    it('search the users', (done) => {
        request(app)
            .get('/api/v1/searchUser')
            .query({username: SEARCH_USER})
            .send({codeRatingEngineToken: token})
            .expect(200)
            .end((err, res) => {
                if (err) done(err)
                else done()
            })
    })
})
