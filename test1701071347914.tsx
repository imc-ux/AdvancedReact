import React, { useState, useEffect, useMemo } from 'react';
import QRCodeSVG from 'qrcode.react';
import { LinkOutlined, AlignLeftOutlined } from '@ant-design/icons';
import { Input, Button, message, Menu } from 'antd';
import { SketchPicker } from 'react-color';

export default function qrCodeGenerator() {
  const [text, setText] = useState('');
  const [color, setColor] = useState('#000000');
  const [showQRcode, setShowQRcode] = useState('');
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState('link');

  useEffect(() => {
    if (showQRcode && hidden) {
      setShowQRcode('');
    }
  }, [showQRcode, hidden]); //

  function handleConvert() {
    if (text.trim() === '') {
      message.error('请在URL框输入转换内容！');
      setShowQRcode('');
    }
    setShowQRcode(text);
    setHidden(false);
  }

  function onColorChangeHandler(color: { hex: string }) {
    setColor(color.hex);
    setHidden(false);
    console.log('color', color);
  }

  function onTextValueChangeHandler(value: string) {
    setText(value);
  }

  function onMenuItemClickHandler(menuItem: { key: string }) {
    setMenu(menuItem.key);
    setShowQRcode('');
  }

  return (
    <div className="wrap-grid">
      <div>
        <Menu mode="vertical" selectedKeys={[menu]} onClick={onMenuItemClickHandler}>
          <Menu.Item key="link" style={{ backgroundColor: '#F8F8F8', textAlign: 'center' }}>
            <LinkOutlined />
            <label className="margin-l5">Link</label>
          </Menu.Item>
          <Menu.Item key="text" style={{ backgroundColor: '#F8F8F8', textAlign: 'center' }}>
            <AlignLeftOutlined />
            <label className="margin-l5">Text</label>
          </Menu.Item>
        </Menu>
      </div>
      <div>
        <Converter menu={menu} text={text} onChange={onTextValueChangeHandler} />

        <Button
          style={{
            color: '#FFFFFF',
            paddingLeft: 10,
            paddingTop: 2,
            backgroundColor: '#2196e3',
            border: '#2196e3',
            borderRadius: 5,
            textAlign: 'center',
          }}
          className="timestamp-button"
          onClick={handleConvert}
        >
          generator
        </Button>
        <Button onClick={() => setHidden(!hidden)}>Choose Color</Button>

        <div style={{ width: 24, height: 24, backgroundColor: color }}></div>
        {hidden && (
          <div style={{ position: 'absolute' }}>
            <SketchPicker color={color} onChange={onColorChangeHandler} display={hidden ? 'block' : 'none'}></SketchPicker>
          </div>
        )}

        <div className="div-flex h-center v-middle" style={{ border: '1px solid #2196e3', backgroundColor: '#f2f8fd', width: 156, height: 156 }}>
          {showQRcode && (
            <QRCodeSVG
              key={color}
              value={showQRcode}
              size={128}
              bgColor={'#ffffff'}
              fgColor={color}
              level={'L'}
              includeMargin={false}
              imageSettings={{
                // src: 'https://static.zpao.com/favicon.png',
                x: 37,
                y: 53,
                height: 24,
                width: 24,
                excavate: true,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

interface ConverterProps {
  menu: 'text' | 'link';
  text: string;
  onChange: (v: string) => void;
}

function Converter(props: ConverterProps) {
  const { TextArea } = Input;
  const [textValue, setTextValue] = useState(props.text ?? '');
  const [type, setType] = useState(props.menu ?? 'text');

  useEffect(() => {
    setTextValue(props.text);
  }, [props.text]);

  useEffect(() => {
    setType(props.menu);
  }, [props.menu]);

  function onInputValueChangeHandler(linkValue: React.ChangeEvent<HTMLInputElement>) {
    setTextValue(linkValue.target.value);
  }
  function onTextAreaValueChangeHandler(textareaValue: React.ChangeEvent<HTMLTextAreaElement>) {
    setTextValue(textareaValue.target.value);
  }

  function onBlurHandler() {
    props?.onChange(textValue);
  }

  if (type === 'link')
    return (
      <div style={{ backgroundColor: '#f5f5ff' }}>
        <h2>Link</h2>
        <div>
          <label>URL</label>
          <Input placeholder="http://" value={textValue} allowClear onBlur={onBlurHandler} onChange={onInputValueChangeHandler} />
        </div>
      </div>
    );
  else {
    return (
      <div style={{ backgroundColor: '#f5f5ff' }}>
        <h2>Text</h2>
        <div>
          <label>Message</label>
          <TextArea placeholder="type some messages" value={textValue} allowClear onBlur={onBlurHandler} onChange={onTextAreaValueChangeHandler} />
        </div>
      </div>
    );
  }
}
