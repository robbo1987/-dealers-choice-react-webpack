import React from "react";

const BodyHTML = (props) => {
  return (
    <div>
      <h1>Robby's Guitar List</h1>
      <h2>Lets Start with a List of Some Cool Guitarists!</h2>
      <ul>
        {props.guitarists.map((guitarist) => (
          <li key={guitarist.id}> {guitarist.name} </li>
        ))}
      </ul>
      <h2> Can YOU Guess what bands these guitarists come from??</h2>
      <h2> Lets Start With a List of the BANDS!</h2>
      <ul>
        {props.bands.map((band) => (
          <li key={band.id}>
            {band.name}
            
          </li>
        ))}
      </ul>
      <h2> Maybe the above List Helped?</h2>
      <h2>Here are the Answers:</h2>
      <ul>
        {props.guitarists.map((guitarist) => (
          <li key={guitarist.id}>
            {guitarist.name} --- {guitarist.band.name}
          </li>
        ))}
      </ul>
      <h2>Let's Add Some Bands</h2>
    </div>
  );
};

export default BodyHTML;
