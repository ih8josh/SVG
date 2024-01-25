import { promises as fs } from "fs";
import inquirer from "inquirer";
import { Circle, Square, Triangle } from "./shape.js";

class Svg {
  constructor() {
    this.textElement = "";
    this.shapeElement = "";
  }

  render() {
    return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`;
  }

  setTextElement(text, color) {
    this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`;
  }

  setShapeElement(shape) {
    this.shapeElement = shape.render();
  }
}

const questions = [
  { type: "input", name: "text", message: "TEXT: Enter up to (3) Characters:" },
  {
    type: "input",
    name: "textColor",
    message: "TEXT COLOR: Enter a color keyword (OR a hexadecimal number):",
  },
  {
    type: "list",
    name: "pixelImage",
    message: "Choose which Pixel Image you would like?",
    choices: ["Circle", "Square", "Triangle"],
  },
  {
    type: "input",
    name: "shapeColor",
    message: "SHAPE COLOR: Enter a color keyword (OR a hexadecimal number):",
  },
];

async function writeToFile(fileName, data) {
  console.log(`Writing to file: ${fileName}`);
  try {
    await fs.writeFile(fileName, data);
    console.log("Generated logo.svg");
  } catch (err) {
    console.error(err);
  }
}

async function init() {
  console.log("Starting init");
  const svg = new Svg();

  try {
    const answers = await inquirer.prompt(questions);
    console.log("User answers:", answers);

    const userText = answers.text.slice(0, 3);
    const userFontColor = answers.textColor;
    const userShapeType = answers.pixelImage.toLowerCase();
    const userShapeColor = answers.shapeColor;

    let userShape;
    switch (userShapeType) {
      case "square":
        userShape = new Square();
        console.log("User selected Square shape");
        break;
      case "circle":
        userShape = new Circle();
        console.log("User selected Circle shape");
        break;
      case "triangle":
        userShape = new Triangle();
        console.log("User selected Triangle shape");
        break;
      default:
        console.log("Invalid shape!");
        return;
    }

    userShape.setColor(userShapeColor);
    console.log("User shape details:", userShape);

    svg.setTextElement(userText, userFontColor);
    svg.setShapeElement(userShape);

    const svgString = svg.render();
    console.log(`Displaying shape:\n\n${svgString}`);

    console.log("Shape generation complete!");
    console.log("Writing shape to file...");

    await writeToFile("logo.svg", svgString);
  } catch (error) {
    console.error("Error during initialization:", error);
  }
}

init();
