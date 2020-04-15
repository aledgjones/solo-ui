import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Input, Select, Option, Section, Subheader, Textarea } from '../dist';

const App = () => {

  const [value, setValue] = React.useState('');
  const [value1, setValue1] = React.useState(100);
  const [value2, setValue2] = React.useState('foo');
  const [value3, setValue3] = React.useState('foo');

  return <>

    <Section width={800}>
      <Subheader>Inputs</Subheader>
      <div style={{ border: '1px solid rgb(235,235,235)', marginBottom: 20, padding: 20 }}>
        <Input required type="email" label="Email" value={value} onChange={setValue} color="blue" />
        <p>value: {value}</p>
      </div>

      <div style={{ border: '1px solid rgb(235,235,235)', marginBottom: 20, padding: 20 }}>
        <Input units="mm" required type="number" label="Number" value={value1} onChange={setValue1} color="blue" precision={2} step={1} />
        <p>value: {value1}</p>
      </div>

      <div style={{ border: '1px solid rgb(235,235,235)', marginBottom: 20, padding: 20 }}>
        <Select value={value2} onChange={setValue2} label="Select" color="blue">
          <Option value="foo" displayAs="Foo">Foo</Option>
          <Option value="bar" displayAs="Bar">Bar</Option>
        </Select>
        <p>value: {value2}</p>
      </div>

      <div style={{ border: '1px solid rgb(235,235,235)', marginBottom: 20, padding: 20 }}>
        <Textarea label="Textarea" value={value3} onChange={setValue3} color="blue" />
        <p>value: {value2}</p>
      </div>
    </Section>

  </>;
};

ReactDOM.render(<App />, document.getElementById('root'));
