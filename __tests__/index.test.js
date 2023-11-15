// Import necessary modules and functions
const axios = require("axios");
const wppconnect = require("@wppconnect-team/wppconnect");
require("../src/setupTests");
const { start } = require("../src/index");

jest.mock("axios");
jest.mock("@wppconnect-team/wppconnect");

describe("Test Module", () => {
  let mockClient;

  beforeEach(() => {
    // Mock the create method of wppconnect
    wppconnect.create.mockResolvedValueOnce({
      onStateChange: jest.fn(),
      onMessage: jest.fn(),
      sendText: jest.fn(),
      downloadMedia: jest.fn(),
      reply: jest.fn(),
    });

    // Mock the axios post method
    axios.post.mockResolvedValueOnce({ data: "Mocked response" });

    // Create a mock client for each test case
    mockClient = {
      onStateChange: jest.fn(),
      onMessage: jest.fn(),
      sendText: jest.fn(),
      downloadMedia: jest.fn(),
      reply: jest.fn(),
    };
  });

  it("should send a greeting message when the state changes to CONNECTED", async () => {
    await start(mockClient);

    // Simulate the state change to CONNECTED
    mockClient.onStateChange("CONNECTED");

    // Check if sendText was called with the correct parameters
    expect(mockClient.sendText).toHaveBeenCalledWith(
      process.env.TARGET_WA_MOBILE,
      "Start sending images to upload"
    );
  });

  it("should process an image message and send data to the API endpoint", async () => {
    await start(mockClient);

    // Simulate an image message
    const mockMessage = {
      type: "image",
      from: process.env.TARGET_WA_MOBILE + "@s.whatsapp.net",
      id: "mockedMessageId",
      caption: "Mocked Name,Mocked Price,Mocked Discount",
    };

    // Mock the downloadMedia method
    mockClient.downloadMedia.mockResolvedValueOnce("MockedImageData");

    // Simulate receiving an image message
    await mockClient.onMessage(mockMessage);

    // Check if axios.post was called with the correct parameters
    expect(axios.post).toHaveBeenCalledWith(
      process.env.DATA_ENTRY_API,
      {
        image: "MockedImageData",
        name: "Mocked Name",
        price: "Mocked Price",
        discounted_price: "Mocked Discount",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Check if client.reply was called
    expect(mockClient.reply).toHaveBeenCalledWith(
      mockMessage.from,
      "Mocked response",
      "mockedMessageId"
    );
  });

  it("should handle errors when processing an image message", async () => {
    await start(mockClient);

    // Simulate an image message with an incorrect format
    const mockMessage = {
      type: "image",
      from: process.env.TARGET_WA_MOBILE + "@s.whatsapp.net",
      id: "mockedMessageId",
      caption: "IncorrectCaptionFormat",
    };

    // Mock the downloadMedia method
    mockClient.downloadMedia.mockResolvedValueOnce("MockedImageData");

    // Simulate receiving an image message
    await mockClient.onMessage(mockMessage);

    // Check if axios.post was not called
    expect(axios.post).not.toHaveBeenCalled();

    // Check if client.reply was called with the correct error message
    expect(mockClient.reply).toHaveBeenCalledWith(
      mockMessage.from,
      "To be Done Later \n Please send image with caption in format: name,price,discounted_price",
      "mockedMessageId"
    );
  });
});
