import React from 'react';
import Locations from './components/locations.jsx';

// Renders the main react component
// passing the bootstrapped locations as props updates react and keeps it from
// re-rendering
React.render(
  <Locations locations={ bootstrapData.locations } />,
  document.getElementById('container')
);
