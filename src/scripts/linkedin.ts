import { Result } from "../models/result";

chrome.runtime.onMessage.addListener(async (msg, sender, response) => {
  const result: Result = {
    message: "Hello"
  };

  response(result.message);
  return true;
});
