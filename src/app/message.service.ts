import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
  messages: string[] = [];

  constructor(){
  }
  add(message: string) {
    this.messages.push(message);
    this.printItem(message);
  }

  clear() {
    this.messages = [];
  }

  delete(){
    if(this.messages.length){
      this.messages.pop()
    }
  }

  printItem(item){
    console.log(item)
  }
}
