const fs = require('fs/promises');

(async () => {
  const createFile = async (path) => {
    try {
      const existingFileHandle = await fs.open(path, 'r');
      existingFileHandle.close();
      return console.log(`File ${path} already exists`);
    } catch (error) {
      const newFileHandler = await fs.open(path, 'w');
      console.log(`File ${path} created successfully`);
      newFileHandler.close();
    }
  };

  const deleteFile = async (path) => {
    try {
      const existingFileHandle = await fs.open(path, 'r');
      existingFileHandle.close();
      await fs.unlink(path);
      console.log(`File ${path} deleted successfully`);
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log(`File ${path} does not exist`);
      } else {
        console.log(`Error deleting file ${path}`);
        console.log(error);
      }
    }
  };

  const renameFile = async (oldPath, newPath) => {
    try {
      const existingFileHandle = await fs.open(oldPath, 'r');
      existingFileHandle.close();
      await fs.rename(oldPath, newPath);
      console.log(`File ${oldPath} renamed successfully`);
    } catch (error) {
      console.log(`File ${oldPath} does not exist`);
    }
  };

  const addToFile = async (path, text) => {
    try {
      if (path === 'command.txt') {
        return console.log(`You can't add to command.txt file`);
      }
      const existingFileHandle = await fs.open(path, 'r');
      existingFileHandle.close();
      const newFileHandler = await fs.open(path, 'a');
      newFileHandler.write(text);
      newFileHandler.close();
    } catch (error) {
      console.log(`File ${path} does not exist`);
    }
  };

  const CREATE_FILE = 'create a file';
  const DELETE_FILE = 'delete a file';
  const RENAME_FILE = 'rename a file';
  const ADD_TO_FILE = 'add to the file';

  const watcher = fs.watch('./command.txt');

  const commandFileHandler = await fs.open('./command.txt', 'r');

  commandFileHandler.on('change', async () => {
    const size = (await commandFileHandler.stat()).size;
    const buff = Buffer.alloc(size);
    const offset = 0;
    const length = buff.byteLength;
    const position = 0;

    await commandFileHandler.read(buff, offset, length, position);

    const command = buff.toString('utf-8');

    // create a file
    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1);
      console.log(filePath);
      createFile(filePath);
    }

    // delete a file
    if (command.includes(DELETE_FILE)) {
      const filePath = command.substring(DELETE_FILE.length + 1);
      console.log(filePath);
      deleteFile(filePath);
    }

    // rename a file
    if (command.includes(RENAME_FILE)) {
      const [oldPath, newPath] = command
        .substring(RENAME_FILE.length + 1)
        .split(' to ');
      console.log(oldPath, newPath);
      renameFile(oldPath, newPath);
    }

    // add to the file
    if (command.includes(ADD_TO_FILE)) {
      const [filePath, text] = command
        .substring(ADD_TO_FILE.length + 1)
        .split(' this content: ');
      console.log(filePath, text);
      addToFile(filePath, text);
    }
  });

  for await (const event of watcher) {
    if (event.eventType == 'change') {
      commandFileHandler.emit('change');
    }
  }
})();
