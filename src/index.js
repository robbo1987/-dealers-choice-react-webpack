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
      console.log(guitaristResponse)
  }

  render() {
    const bands = this.state.bands;
    const guitarists = this.state.guitarists;
    return (
      <div>
        <h1>Robby's Guitar List</h1>
        <h2>Lets Start with a List of Some Cool Guitarists!</h2>
        <ul>{guitarists.map(guitarist=> <li> {guitarist.name} </li>)} </ul>
        <h2> Can YOU Guess what bands these guitarists come from??</h2>
        <h2> Lets Start With a List of the BANDS!</h2>
        <ul> {bands.map (band => <li> {band.name}</li>)}</ul>
        <h2> Maybe this List Will Help?</h2>
        <ul></ul>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.querySelector("#root"));

//add some pictures? add a POST option//
//add "keys"//