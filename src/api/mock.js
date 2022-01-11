const seconds = _seconds => new Promise(resolve => setTimeout(resolve, _seconds*1000))

export const setupMockApi = (opts) => {
  if (process.env.NODE_ENV != "test") {
    global.fetch = async (url, options) => {
      
      if (url === "https://seriescharacters.com/api/howimetyourmother") {
        await seconds(opts.getDelay)
        if (opts.getRequestShouldSucceed) {
          return Promise.resolve({
            json: () => Promise.resolve([
              { name: "Ted Mosby", details: "He is the main protagonist of the series..."},
              { name: "Barney Stinson", details: "He is best friend of the protagonist..."},
              { name: "Marshall Eriksen", details: "He is also the best friend of the protagonist..."},
            ]),
          })
        } else {
          return Promise.reject("Some random error")
        }
      }
      
      if (url === "https://seriescharacters.com/api/newsletter") {
        await seconds(opts.postDelay)
        if (opts.postRequestShouldSucceed) {
          return Promise.resolve({
            json: () => Promise.resolve({ done: true }),
          })
        } else {
          return Promise.reject("Some random error")
        }
      }
      
      return Promise.reject("Unhandled endpoint - mock does not handle " + url)
    }
  }
}