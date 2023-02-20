import * as user from '../user';
describe('user handler',()=>{
    it('create user', async()=>{
        const req = {
            username: 'tass',
            password:'adds'
        }
        const res = {
            json({token}){
                expect(token).toBeDefined()
            }
        }
        await user.createUser(req,res,()=>{})
    })
})