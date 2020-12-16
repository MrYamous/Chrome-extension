import React from "react";
import { Profile } from "../models/profile";
import "./App.scss";

const App: React.FunctionComponent<{}> = {} => {
  const [fullName, setFullName] = useState("Stéphane Jean");
  const [title, setTitle] = useState("Architect");
  const [country, setCountry] = useState("New York, USA");
  const [imageUrl, setImageUrl] = useState("https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png");

  useEffect(() => {
    if (chrome && chrome.tabs) {
      chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
        const tab = tabs[0];
        chrome.tabs.sendMessage(tab.id || 0, { from: "popup", subject: "getFullName" }, response => {
          setFullName(response.fullName);
          setTitle(response.title);
          setCountry(response.country);
          setImageUrl(response.imgeUrl);
        });
      });
    }
  });

  return (
    <div className="app">
      <User fullName={fullName} title={title} country={country} imageUrl={imageUrl}></User>
    </div>
    );
};

export default App;
