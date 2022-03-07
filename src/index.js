import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import BodyHTML from "../public/BodyHTML.js"

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      bands: [],
      guitarists: [],
    };
    this.create = this.create.bind(this);
  }
  async componentDidMount() {
    const bandResponse = await axios.get("/api/bands");
    const guitaristResponse = await axios.get("/api/guitarists");
    this.setState({
      bands: bandResponse.data,
      guitarists: guitaristResponse.data,
    });
  }
  async create() {
    const response = await axios.post("/api/bands");
    const newBand = response.data;
    const bands = [...this.state.bands, newBand];
    this.setState({ bands });
  }

  destroy(band) {
    console.log(band);
  }

  render() {
    return (
      <div id="body">
        <BodyHTML guitarists={this.state.guitarists} bands={this.state.bands} />
        <button onClick={this.create}> Create Band</button>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.querySelector("#root"));

//having issues with destory
//add some pictures?
//separate out files
// deployed https://robs-guitar-app.herokuapp.com/
//need to work on delete
