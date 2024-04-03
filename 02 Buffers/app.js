const { Buffer } = require("buffer");

const memoryContainer = Buffer.alloc(4);

console.log(memoryContainer);
console.log(memoryContainer[0]);

memoryContainer[0] = 0xF4;

console.log(memoryContainer);
console.log(memoryContainer[0]);
