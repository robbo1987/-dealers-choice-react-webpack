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
    const bandResponse = await axios.get("/api/bands");
    const guitaristResponse = await axios.get("/api/guitarists");
    this.setState({
      bands: bandResponse.data,
      guitarists: guitaristResponse.data,
    });
    console.log(guitaristResponse);
  }
  create() {
    console.log("create");
  }

  render() {
    const bands = this.state.bands;
    const guitarists = this.state.guitarists;
    return (
      <div id="body">
        <h1>Robby's Guitar List</h1>
        <h2>Lets Start with a List of Some Cool Guitarists!</h2>
        <ul>
          {guitarists.map((guitarist) => (
            <li key={guitarist.id}> {guitarist.name} </li>
          ))}
        </ul>
        <h2> Can YOU Guess what bands these guitarists come from??</h2>
        <h2> Lets Start With a List of the BANDS!</h2>
        <ul>
          {bands.map((band) => (
            <li key={band.id}> {band.name}</li>
          ))}
        </ul>
        <h2> Maybe the above List Helped?</h2>
        <h2>Here are the Answers:</h2>
        <ul>
          {guitarists.map((guitarist) => (
            <li key={guitarist.id}>
              {guitarist.name} --- {guitarist.band.name}
            </li>
          ))}
        </ul>
        <h2>Let's Add Some Bands</h2>
        <button onClick={this.create}> Create Band</button>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.querySelector("#root"));

//add some pictures? add a POST option//
//separate out files
