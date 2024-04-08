const fs = require('fs/promises');

(async () => {
  const path = './fixMem.txt';

  console.time('writeMany');
  const fileHandle = await fs.open(path, 'w');

  const stream = fileHandle.createWriteStream();
  console.log(stream.writableHighWaterMark);
  const buff = Buffer.alloc(1242134, 'a');

  //   for (let index = 0; index < 1000000; index++) {
  //     const buff = Buffer.from(` ${index}`, 'utf-8');
  //     stream.write(buff);
  //   }
  //   console.timeEnd('writeMany');
})();
