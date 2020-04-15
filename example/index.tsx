import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Input, Select, Option, Section, Subheader, Textarea } from '../dist';

const App = () => {

  const [text, setText] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [number, setNumber] = React.useState<number>();
  const [longtext, setLongtext] = React.useState('');
  const [select, setSelect] = React.useState('foo');

  return <>

    <Section width={800}>
      <div style={{ border: '1px solid rgb(235,235,235)', marginBottom: 20, padding: 20 }}>
        <Subheader>Text Input</Subheader>
        <Input required type="text" label="Text" value={text} onChange={setText} color="blue" />
        <p>value: {text}</p>
      </div>

      <div style={{ border: '1px solid rgb(235,235,235)', marginBottom: 20, padding: 20 }}>
        <Subheader>Email Input</Subheader>
        <Input required type="email" label="Email" value={email} onChange={setEmail} color="blue" />
        <p>value: {email}</p>
      </div>

      <div style={{ border: '1px solid rgb(235,235,235)', marginBottom: 20, padding: 20 }}>
        <Subheader>Password Input</Subheader>
        <Input required type="password" label="Password" value={password} onChange={setPassword} color="blue" />
        <p>value: {password}</p>
      </div>

      <div style={{ border: '1px solid rgb(235,235,235)', marginBottom: 20, padding: 20 }}>
        <Subheader>Number Input</Subheader>
        <Input units="mm" required type="number" label="Number" value={number} onChange={setNumber} color="blue" precision={2} step={1} />
        <p>value: {number}</p>
      </div>

      <div style={{ border: '1px solid rgb(235,235,235)', marginBottom: 20, padding: 20 }}>
        <Subheader>Textarea</Subheader>
        <Textarea label="Textarea" value={longtext} onChange={setLongtext} color="blue" />
        <p>value: {longtext}</p>
      </div>

      <div style={{ border: '1px solid rgb(235,235,235)', marginBottom: 20, padding: 20 }}>
        <Subheader>Select &amp; Option</Subheader>
        <Select value={select} onChange={setSelect} label="Select" color="blue">
          <Option value="foo" displayAs="Foo">Foo</Option>
          <Option value="bar" displayAs="Bar">Bar</Option>
        </Select>
        <p>value: {select}</p>
      </div>

    </Section>

  </>;
};

ReactDOM.render(<App />, document.getElementById('root'));
