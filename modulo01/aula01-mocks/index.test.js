const File = require("./src/file");
const { error } = require("./src/constants");
const assert = require("assert");
(async () => {
  {
    const filePath = "./mocks/emptyFile-invalid.csv";
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await assert.rejects(result, expected);
  }
  {
    const filePath = "./mocks/header-invalid.csv";
    const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await assert.rejects(result, expected);
  }
  {
    const filePath = "./mocks/fiveItems-invalid.csv";
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await assert.rejects(result, expected);
  }
  {
    const filePath = "./mocks/threeItems-valid.csv";
    const expected = [
      {
        id: 1,
        name: "John",
        profession: "Dentist",
        age: 35,
      },
      {
        id: 2,
        name: "Lisa",
        profession: "Teacher",
        age: 28,
      },
      {
        id: 3,
        name: "Michael",
        profession: "Engineer",
        age: 42,
      },
    ];
    const result = await File.csvToJson(filePath);
    assert.deepEqual(result, expected);
  }
})();
