import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { mdiMenu } from '@mdi/js';
import { Input, Select, Option, Section, Subheader, Textarea, Button, Dialog, Content, Appbar, useScrollListener, Icon, Drawer, ListItem, Divider } from '../dist';
import { Box } from './box';
import './styles.css';

const App = () => {

    const y = useScrollListener();
    const [theme, setTheme] = React.useState('#0064b1');
    const [drawer, setDrawer] = React.useState(false);

    const [text, setText] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [number, setNumber] = React.useState<number>();
    const [longtext, setLongtext] = React.useState('');
    const [select, setSelect] = React.useState('foo');

    const [dialog, setDialog] = React.useState(false);

    return <div style={{ backgroundColor: 'rgb(235,235,235)' }}>

        <Appbar className="bar" shadow={y > 0}>
            <div className="start">
                <Icon path={mdiMenu} size={24} color="black" onClick={() => setDrawer(true)} />
                <h1>Examples</h1>
            </div>
        </Appbar>

        <Drawer width={360} open={drawer} onClose={() => setDrawer(false)}>
            {
                () => <>
                    <Subheader>Theme</Subheader>
                    <Content style={{ paddingTop: 0 }}>
                        <Select value={theme} onChange={setTheme} label="Primary Colour" color={theme}>
                            <Option value="green" displayAs="Green">Green</Option>
                            <Option value="#0064b1" displayAs="Blue">Blue</Option>
                            <Option value="purple" displayAs="Purple">Purple</Option>
                            <Option value="orange" displayAs="Orange">Orange</Option>
                        </Select>
                    </Content>
                    <div>
                        <Divider compact />
                        <Subheader>Components</Subheader>
                        <ListItem onClick={() => location.replace('#text-input')}>Text Input</ListItem>
                        <ListItem onClick={() => location.replace('#email-input')}>Email Input</ListItem>
                        <ListItem onClick={() => location.replace('#password-input')}>Password Input</ListItem>
                        <ListItem onClick={() => location.replace('#number-input')}>Number Input</ListItem>
                        <ListItem onClick={() => location.replace('#textarea')}>Textarea</ListItem>
                        <ListItem onClick={() => location.replace('#select')}>Select &amp; Option</ListItem>
                        <ListItem onClick={() => location.replace('#dialog')}>Dialog</ListItem>
                        <Divider compact />
                        <Subheader>hooks</Subheader>
                        <Divider compact />
                        <Subheader>Utils</Subheader>
                    </div>
                </>
            }
        </Drawer>

        <Section style={{ paddingTop: 96 }} width={800}>

            <Box id="text-input">
                <Subheader>Text Input</Subheader>
                <p className="description">Input for generic single line text.</p>
                <Input required type="text" label="Text" value={text} onChange={setText} color={theme} />
                <div className="value"><span>value</span><span>'{text}'</span></div>
            </Box>

            <Box id="email-input">
                <Subheader>Email Input</Subheader>
                <p className="description">Input for email addresses. It will show error if invalid.</p>
                <Input required type="email" label="Email" value={email} onChange={setEmail} color={theme} />
                <div className="value"><span>value</span><span>'{email}'</span></div>
            </Box>

            <Box id="password-input">
                <Subheader>Password Input</Subheader>
                <p className="description">Input for passwords.</p>
                <Input required type="password" label="Password" value={password} onChange={setPassword} color={theme} />
                <div className="value"><span>value</span><span>'{password}'</span></div>
            </Box>

            <Box id="number-input">
                <Subheader>Number Input</Subheader>
                <p className="description">Input for numbers. It will only fire the onChange event (passing a <span className="type">number</span>) when it has a valid value to ensure type safety.</p>
                <Input units="mm" required type="number" label="Number" value={number} onChange={setNumber} color={theme} precision={2} step={1} />
                <div className="value"><span>value</span><span>{number}</span></div>
            </Box>

            <Box id="textarea">
                <Subheader>Textarea</Subheader>
                <p className="description">Input for generic multi-line text.</p>
                <Textarea required label="Textarea" value={longtext} onChange={setLongtext} color={theme} />
                <div className="value"><span>value</span><span>'{longtext}'</span></div>
            </Box>

            <Box id="select">
                <Subheader>Select &amp; Option</Subheader>
                <p className="description">Choose from a selection of options.</p>
                <Select direction="up" margin value={select} onChange={setSelect} label="Select" color={theme}>
                    <Option value="foo" displayAs="Foo">Foo <span className="type">{'{'}value: 'foo', displayAs: 'Bar'{'}'}</span></Option>
                    <Option value="bar" displayAs="Bar">Bar <span className="type">{'{'}value: 'bar', displayAs: 'Bar'{'}'}</span></Option>
                    <Option value="clang" displayAs="Clang">Bar <span className="type">{'{'}value: 'clang', displayAs: 'Clang'{'}'}</span></Option>
                    <Option value="clop" displayAs="Clop">Bar <span className="type">{'{'}value: 'clop', displayAs: 'Clop'{'}'}</span></Option>
                </Select>
                <div className="value"><span>value</span><span>'{select}'</span></div>
            </Box>

            <Box id="dialog">
                <Subheader>Dialog</Subheader>
                <p className="description">Generic dialog components, content will be destroyed when not visible to minimise DOM entries.</p>
                <Button color={theme} onClick={() => setDialog(true)}>Open Dialog</Button>
                <Dialog open={dialog} width={400}>
                    {
                        () => <>
                            <Content style={{ paddingBottom: 0 }}>
                                <p>Dialog content</p>
                            </Content>
                            <Content style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button color={theme} onClick={() => setDialog(false)}>Close</Button>
                            </Content>
                        </>
                    }
                </Dialog>
            </Box>

        </Section>

    </div >;
};

ReactDOM.render(<App />, document.getElementById('root'));
