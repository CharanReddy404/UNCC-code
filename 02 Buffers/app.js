const { Buffer, constants } = require('buffer');

const memoryContainer = Buffer.alloc(4);

console.log(memoryContainer);

memoryContainer[0] = 0xf4;
memoryContainer[1] = 0x34;
// memoryContainer.writeInt8(-34, 2);
memoryContainer[2] = 0x00;
memoryContainer[3] = 0xff;

console.log(memoryContainer);
console.log(memoryContainer[0]);
console.log(memoryContainer[1]);
// console.log(memoryContainer.readInt8(2));
console.log(memoryContainer[2]);
console.log(memoryContainer[3]);

console.log(memoryContainer.toString('hex'));

const buff = Buffer.from([0x48, 0x69, 0x21]);

console.log(buff.toString('utf-8'));

console.log(constants.MAX_LENGTH);
