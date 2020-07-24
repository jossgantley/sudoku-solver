/*
 *
 *
 *       FILL IN EACH UNIT TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require("chai");
const assert = chai.assert;

const { JSDOM } = require("jsdom");
global.document = JSDOM;
let solver;

suite("UnitTests", () => {
  suiteSetup(() => {
    // Mock the DOM for testing and load Solver
    return JSDOM.fromFile("./views/index.html").then(dom => {
      global.window = dom.window;
      global.document = dom.window.document;

      solver = require("../public/sudoku-solver.js");
    });
  });

  // Only the digits 1-9 are accepted
  // as valid input for the puzzle grid
  suite("Function ____()", () => {
    test('Valid "1-9" characters', done => {
      let input = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
      let result = solver.mapSudokuToText(input, "");

      assert.equal(
        result,
        "123456789........................................................................"
      );

      done();
    });

    // Invalid characters or numbers are not accepted
    // as valid input for the puzzle grid
    test('Invalid characters (anything other than "1-9") are not accepted', done => {
      const input = ["!", "a", "/", "+", "-", "0", "10", 0, "."];
      let result = solver.mapSudokuToText(input, "");

      assert.equal(
        result,
        "................................................................................."
      );
      done();
    });
  });

  suite("Function ____()", () => {
    test("Parses a valid puzzle string into an object", done => {
      const input =
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      let sudokuInput = document.getElementsByClassName("sudoku-input");

      solver.mapTextToSudoku(input, sudokuInput);
      let A3 = document.getElementById("A3").value;
      let B1 = document.getElementById("B1").value;
      let C1 = document.getElementById("C1").value;
      let D1 = document.getElementById("D1").value;
      let E3 = document.getElementById("E3").value;
      let F4 = document.getElementById("F4").value;
      let G3 = document.getElementById("G3").value;
      let H1 = document.getElementById("H1").value;
      let I3 = document.getElementById("I3").value;

      assert.equal(A3, input[2]);
      assert.equal(B1, input[9]);
      assert.equal(C1, input[18]);
      assert.equal(D1, input[27]);
      assert.equal(E3, "");
      assert.equal(F4, input[48]);
      assert.equal(G3, "");
      assert.equal(H1, input[63]);
      assert.equal(I3, "");

      done();
    });

    // Puzzles that are not 81 numbers/periods long show the message
    // "Error: Expected puzzle to be 81 characters long." in the
    // `div` with the id "error-msg"
    test("Shows an error for puzzles that are not 81 numbers long", done => {
      const shortStr = "83.9.....6.62.71...9......1945....4.37.4.3..6..";
      const longStr =
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6...";
      const errorMsg = "Error: Expected puzzle to be 81 characters long.";
      const errorDiv = document.getElementById("error-msg");

      solver.checkLength(shortStr);
      assert.equal(errorDiv.innerText, errorMsg);

      errorDiv.innerText = "";

      solver.checkLength(longStr);
      assert.equal(errorDiv.innerText, errorMsg);
      done();
    });
  });

  suite("Function ____()", () => {
    // Valid complete puzzles pass
    test("Valid puzzles pass", done => {
      const input =
        "827549163531672894649831527496157382218396475753284916962415738185763249374928651";
      let pass = solver.checkValid(input);
      assert.isNotFalse(pass);

      done();
    });

    // Invalid complete puzzles fail
    test("Invalid puzzles fail", done => {
      const input =
        "779235418851496372432178956174569283395842761628713549283657194516924837947381625";
      let pass = solver.checkValid(input);
      assert.isFalse(pass);

      done();
    });
  });

  suite("Function ____()", () => {
    // Returns the expected solution for a valid, incomplete puzzle
    test("Returns the expected solution for an incomplete puzzle", done => {
      const input =
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      const output =
        "769235418851496372432178956174569283395842761628713549283657194516924837947381625";
      solver.checkLength(input);
      let result = document.getElementById("text-input").value;
      assert.equal(result, output);
      done();
    });
  });
});
