import { MessageService } from './message.service';

describe('MessageService', () => {
    let message: MessageService;

    it('should have no messages to start', () => {
        // arrange
        message = new MessageService();

        // assert
        expect(message.messages.length).toBe(0);
    });

    it('should add a message when add is called', () => {
        // arrange
        message = new MessageService();

        // act
        message.add('message1');

        // assert
        expect(message.messages.length).toBe(1);
    });

    it('should remove all message when clear is called', () => {
        // arrange
        message = new MessageService();
        message.add('message1');

        // act
        message.clear();

        // assert
        expect(message.messages.length).toBe(0);
    });
});
