import fs from "fs";
import inquirer from "inquirer";

class License {
  constructor() {
    this.licenses = ["apache-2.0", "mit"];
  }

  select() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "code",
          message: "License:",
          choices: this.licenses,
        },
        {
          type: "input",
          name: "year",
          message: "Year:",
        },
        {
          type: "input",
          name: "name",
          message: "Name:",
        },
      ])
      .then((license) => {
        this.create(license);
      });
  }

  create(license) {
    fs.readFile(
      `src/licenses/${license.code}.txt`,
      "utf8",
      function (_err, data) {
        fs.writeFile(
          "LICENSE",
          data
            .replaceAll("[year]", license.year)
            .replaceAll("[name]", license.name),
          "utf8",
          () => {
            console.log("License created ✅");
          }
        );
      }
    );
  }
}

export default License;
