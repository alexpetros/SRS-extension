import React from 'react';
import ReactDOM from 'react-dom';

import './css/style.scss'

const App = () => {
  return <div className="test">Main react content</div>
};

ReactDOM.render(<App />, document.getElementById('main'))
