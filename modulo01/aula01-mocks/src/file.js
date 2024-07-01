const { readFile } = require("fs/promises");
const { error } = require("./constants");
const DEFAULT_OPTIONS = {
  maxLines: 3,
  header: ["id", "name", "profession", "age"],
};
class File {
  static async csvToJson(filePath) {
    const content = await readFile(filePath, "utf8");
    const validation = this.isValid(content);
    if (!validation.valid) throw new Error(validation.error);
    const result = this.parseCsvToJson(content);
    return result;
  }
  static isValid(csvString, options = DEFAULT_OPTIONS) {
    const [header, ...content] = csvString.split(/\r?\n/);
    const isHeaderValid = header === options.header.join(",");
    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false,
      };
    }
    if (!content.length || content.length > options.maxLines) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false,
      };
    }
    return { valid: true };
  }
  static parseCsvToJson(csvString) {
    const lines = csvString.split(/\r?\n/);
    const firstLine = lines.shift();
    const header = firstLine.split(",");

    const users = lines.map((line) => {
      const user = {};
      const columns = line.split(",");
      for (const index in columns) {
        user[header[index]] = columns[index].trim();
      }
      return user;
    });
    return users;
  }
}

module.exports = File;
