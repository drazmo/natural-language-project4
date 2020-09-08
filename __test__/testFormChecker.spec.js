// Import the js file to test
import { checkForSentence } from "../src/client/js/formChecker"

window.alert = jest.fn();

describe("Testing the Form Validation", () => {
    test("Testing the checkForSentence() function", () => {
        expect(checkForSentence).toBeDefined();
        expect(checkForSentence("This is a good sentence.")).toEqual(true);
    })

    test("Testing the checkForSentence() for bad input", () => {
        expect(checkForSentence("a")).toEqual(false);
        expect(window.alert.mock.calls.length).toBe(1);
    })
});