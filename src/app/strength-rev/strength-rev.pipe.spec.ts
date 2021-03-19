import { StrengthRevPipe } from "./strength-rev.pipe"

describe('test strength ',()=>{
    //91 -- more than 4
    it('',()=>{
        //1
        let pipe = new StrengthRevPipe()
        //2
        let result = pipe.transform(91)
        //3
        expect(result).toBeGreaterThan(4)
    })
    //90 -- less than 5
    //75 -- less than 5

})