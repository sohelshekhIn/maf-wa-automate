// Supports ES6
// import { create, Whatsapp } from "@wppconnect-team/wppconnect";
const wppconnect = require("@wppconnect-team/wppconnect");
const axios = require("axios");
wppconnect
  .create()
  .then((client) => start(client))
  .catch((error) => console.log(error));

// take input from user
const fromNumber = "918780775601";

const url = "http://localhost:5000/wa-upload"; // Replace with your API endpoint URL

function start(client) {
  // on connect greet user with message
  client.onStateChange((state) => {
    console.log("state changed", state);
    if (state == "CONNECTED") {
      // throws error
      setTimeout(() => {
        client.sendText(fromNumber, "Start sending images to upload");
      }, 5000);
    }
  });

  client.onMessage(async (message) => {
    if (message.type == "image" && message.from.split("@")[0] == fromNumber) {
      image = await client.downloadMedia(message.id);
      try {
        caption = message.caption.split(",");
        data = {
          // image: image,
          //   send first 50 characters of image
          image: image.toString("base64"),
          name: caption[0],
          price: caption[1],
          discounted_price: caption[2],
        };
        axios
          .post(url, data, {
            headers: {
              "Content-Type": "application/json", // Set the Content-Type header to indicate JSON data
            },
          })
          .then((response) => {
            client.reply(message.from, response.data, message.id.toString());
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        await client.reply(
          message.from,
          "To be Done Later \n Please send image with caption in format: name,price,discounted_price",
          message.id.toString()
        );
        return;
      }
    }
  });
}
