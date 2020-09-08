// Import the js file to test
import { handleSubmit } from "../src/client/js/formHandler"


window.Client = {
    checkForSentence: jest.fn() //(sentence) => { return true; }
}

window.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
    })
);

// The describe() function takes two arguments - a string description, and a test suite as a callback function.
// A test suite may contain one or more related tests
describe("Testing the submit functionality", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.
    test("Testing the handleSubmit() function", () => {
        const preventDefault = jest.fn();
        document.body.innerHTML = '<input id="name" type="text" name="input" value="Main dishes were quite good, but desserts were too sweet for me.">';

        expect(handleSubmit).toBeDefined();
        handleSubmit({ preventDefault });
    })

    test("Call handleSubmit", () => {

    });
});