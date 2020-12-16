import React from "react";
import { Profile } from "../models/profile";
import "./App.scss";

interface State extends Profile {}

export class App extends React.Component<{}, State> {
  state = {} as State;

  public componentDidMount() {
    if (chrome && chrome.tabs) {
      chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
        const tab = tabs[0];
        chrome.tabs.sendMessage(tab.id || 0, { from: "popup", subject: "getFullName" }, response => {
          this.setState({
            fullName: response.fullName,
            title: response.title,
            country: response.country,
            image: response.image,
          });
        });
      });
    }
  }

  render() {
    return (
    <div className="app">
      <div>{this.state.fullName}</div>
      <div>{this.state.title}</div>
      <div>{this.state.country}</div>
      <img src={this.state.image} alt="Image profile"></img>
    </div>;
    );
  }
}

export default App;
