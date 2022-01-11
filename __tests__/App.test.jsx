import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({adapter: new Adapter()});

import App from "../src/App";

// Test data
const getResponse = [
  { name: "Ted Mosby", details: "He is the main protagonist of the series..."},
  { name: "Barney Stinson", details: "He is best friend of the protagonist..."},
  { name: "Marshall Eriksen", details: "He is also the best friend of the protagonist..."},
]
const postResponse = { done: true }
const fetchError = "Some random error"

// Util
//jest.useFakeTimers("modern");
jest.setTimeout(10000)
const seconds = _seconds => new Promise(resolve => setTimeout(resolve, _seconds*1000))
global.fetch = jest.fn(() => {})
const setMock = (res1, res2) => {
  fetch
    .mockImplementationOnce(async () => {
      await seconds(5)
      if (!res1) {
        return Promise.reject(fetchError)
      }
      return Promise.resolve({ json: () => Promise.resolve(res1) })
    })
    .mockImplementationOnce(async () => {
      await seconds(5)
      if (!res2) {
        return Promise.reject(fetchError)
      }
      return Promise.resolve({ json: () => Promise.resolve(res2) })
    })
}

describe("App tests", () => {
  beforeEach(() => fetch.mockClear())
  
  it("displays the app with title", async () => {

    // Given
    setMock(getResponse, postResponse)
    
    // When
    const app = mount( <App /> )

    // Then
    expect(app.text().includes("Series Api")).toEqual(true)
    await seconds(1)
    //jest.advanceTimersByTime(1000);
    expect(app.text().includes("Loading")).toEqual(true)
    await seconds(5)
    //jest.advanceTimersByTime(5000);
    expect(app.text().includes("Loading")).toEqual(false)
  });

});