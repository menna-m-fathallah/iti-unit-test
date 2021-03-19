// import { StrengthPipe } from './strength.pipe';

import { StrengthPipe } from "./strength.pipe"

// describe('StrengthPipe', () => {
//     it('should return weak if strength is 5', () => {
//         const pipe = new StrengthPipe();

//         const result = pipe.transform(5)

//         expect(result).toEqual('5bad');
//     });

//     it('should display strong when strength is 10', () => {
//         const pipe = new StrengthPipe();
        
//         const result = pipe.transform(10)

//         expect(result).toEqual('10good');
//     });

// });





fdescribe("testing strength pipe",()=>{
    let pipe ;
    beforeAll(()=>{
        console.log("beforeAll run only one time")
    })

    afterAll(()=>{
        console.log("afterAll run only one time")
    })

    beforeEach(()=>{
        pipe = new StrengthPipe();
        console.log('beforeEach run before every testcase')
    })

    afterEach(()=>{
        console.log('afterEach run after every testcase')
    })
    //5 --5bad
    it("test number less than 10 (5) it will return 5bad",()=>{
        //act
        console.log('testcase 1')

        //arr
        let result = pipe.transform(5);

        //result
        expect(result).toBe('5bad');
        expect(pipe.pipeName).toBe('bad');
    })

    //10 --10good

    it("test number 10 or more (10) it will return 10good",()=>{
        //act
        console.log('testcase 2')

        //arr
        expect(pipe.pipeName).toBe('');
        let result = pipe.transform(10)
        //result

        expect(result).toBe('10good');
        expect(pipe.pipeName).toBe('good');

    })

    //20 --20verygood

})


























