import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Input } from '../dist';

const App = () => {

  const [value, setValue] = React.useState(100);

  return <div style={{padding: 40}}>
    <Input required type="number" label="Number" value={value} onChange={setValue} color="blue" precision={2} step={1} />
    <br />
    <p>value: {value}</p>
  </div>;
};

ReactDOM.render(<App />, document.getElementById('root'));
