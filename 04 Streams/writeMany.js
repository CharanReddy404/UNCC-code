// Method - 1

// const fs = require('fs/promises');

// (async () => {
//   const path = './test.txt';
//   try {
//     const existingFileHandle = await fs.open(path, 'r');
//     existingFileHandle.close();
//   } catch (error) {
//     if (error.code === 'ENOENT') {
//       const newFileHandler = await fs.open(path, 'w');
//       newFileHandler.close();
//     }
//   }

//   const writeTextToFile = await fs.open(path, 'a');
//   console.time('writeMany');
//   for (let index = 0; index < 1000000; index++) {
//     await writeTextToFile.write(`${index} `);
//   }
//   console.timeEnd('writeMany');
//   writeTextToFile.close();
// })();

// Method - 2

// const fs = require('fs');

// (async () => {
//   fs.open('text2.txt', 'a', (error, fd) => {
//     console.time('writeMany');
//     for (let index = 0; index < 1000000; index++) {
//       fs.writeSync(fd, `${index} `);
//     }
//     console.timeEnd('writeMany');
//   });
// })();

// Method - 3

// const fs = require('fs');

// (async () => {
//   fs.open('text2.txt', 'a', (error, fd) => {
//     console.time('writeMany');
//     for (let index = 0; index < 100000; index++) {
//       fs.write(fd, `${index} `, () => {});
//     }
//     console.timeEnd('writeMany');
//   });
// })();

// Method - 4

// const fs = require('fs');

// (async () => {
//   fs.open('text2.txt', 'a', (error, fd) => {
//     console.time('writeMany');
//     for (let index = 0; index < 1000000; index++) {
//       const buff = Buffer.from(` ${index}`, 'utf-8');
//       fs.writeSync(fd, buff);
//     }
//     console.timeEnd('writeMany');
//   });
// })();

// Method - 1 Strams
// Don't do it this way

const fs = require('fs/promises');

(async () => {
  const path = './streamTest.txt';
  try {
    const existingFileHandle = await fs.open(path, 'r');
    existingFileHandle.close();
  } catch (error) {
    if (error.code === 'ENOENT') {
      const newFileHandler = await fs.open(path, 'w');
      newFileHandler.close();
    }
  }

  console.time('writeMany');
  const fileHandle = await fs.open(path, 'w');

  const stream = fileHandle.createWriteStream();

  for (let index = 0; index < 1000000; index++) {
    const buff = Buffer.from(` ${index}`, 'utf-8');
    stream.write(buff);
  }
  console.timeEnd('writeMany');
})();
