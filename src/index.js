import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import BodyHTML from "../public/BodyHTML.js";

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

  async destroy(band) {
    await axios.delete(`/api/bands/${band.id}`);
    const bands = this.state.bands.filter((_band) => _band.id !== band.id);
    this.setState({ bands });
  }

  render() {
    return (
      <div id="body">
        <BodyHTML guitarists={this.state.guitarists} bands={this.state.bands} />
        <button onClick={this.create}> Create Band</button>
        <h2>Now Let's Remove Some Bands</h2>
        <ul>
          {this.state.bands.map((band) => {
            return (
              <li key={band.id}>
                
                {band.name}
                <button onClick={() => this.destroy(band)}>
                  
                  Remove Band
                </button>
              </li>
            );
          })}
        </ul>
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
