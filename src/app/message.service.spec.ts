// import { MessageService } from './message.service';

import { MessageService } from "./message.service"

// describe('MessageService', () => {
//     let message: MessageService;

//     it('should have no messages to start', () => {
//         // arrange
//         message = new MessageService();

//         // assert
//         expect(message.messages.length).toBe(0);
//     });

//     it('should add a message when add is called', () => {
//         // arrange
//         message = new MessageService();

//         // act
//         message.add('message1');

//         // assert
//         expect(message.messages.length).toBe(1);
//     });

//     it('should remove all message when clear is called', () => {
//         // arrange
//         message = new MessageService();
//         message.add('message1');

//         // act
//         message.clear();

//         // assert
//         expect(message.messages.length).toBe(0);
//     });
// });




fdescribe('test message service', () => {
    // at the start length equal 0
    it(" at the start length equal 0", () => {
        //1
        let service = new MessageService()
        //2

        //3
        expect(service.messages.length).toBe(0);
    })
    // add method increase length of array
    it("add method increase length of array and printitem ", () => {
        //1
        let service = new MessageService();
        let length = service.messages.length;
        let newMessage = 'test'
        spyOn(service,"printItem")
        //2
        service.add(newMessage);
        //3
        expect(service.messages.length).toBe(length + 1);
        // expect(service.printItem).toHaveBeenCalled();
        expect(service.printItem).toHaveBeenCalledWith(newMessage);
    })

    //clear method clear array 0
    it("clear method clear array 0", () => {
        //1
        let service = new MessageService();
        //2
        service.clear();
        //3
        expect(service.messages.length).toBe(0);
    })

    describe("delete method", () => {
        //delete method lenght decrease
        it("delete method decrease lenght by 1 if array has items", () => {
            //1
            let service = new MessageService();
            // service.messages = ["nnnn","mmm" ,"gggg"]
            service.add = function (message){
                this.messages.push(message);
            }
            service.add('hhhhhh')
            let lenght = service.messages.length

            //2
            service.delete()
            //3
            expect(service.messages.length).toBe(lenght - 1);
        })

        it("delete method if array empty length 0", () => {
            //1
            let service = new MessageService();
            let lenght = service.messages.length
            //2
            service.delete()
            //3
            expect(service.messages.length).toBe(0);
        })
    })

})


























