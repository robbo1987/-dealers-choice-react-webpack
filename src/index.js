import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      bands: [],
      guitarists: [],
    };
  }
  async componentDidMount() {
    const bandResponse = axios.get("/api/bands");
    const guitaristResponse = axios.get("/api/guitarists");
    this.setState({
      bands: bandResponse.data,
      guitarists: guitaristResponse.data,
    });
  }

  render() {
    return (
      <div>
        <h1>Robby's Guitar List</h1>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.querySelector("#root"));
