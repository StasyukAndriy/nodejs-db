import app from "..";
import supertest from "supertest";

describe('GET /', ()=>{
    it('bla bloss', async()=>{
        const res =  await supertest(app).get('/').expect(200)
    
        expect(res.body.messege).toBe('hello')
    })
    
    
    
})