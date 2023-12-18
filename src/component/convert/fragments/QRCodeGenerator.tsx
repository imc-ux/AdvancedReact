import React, { useState, useEffect } from 'react';
import QRCodeSVG from 'qrcode.react';
import { LinkOutlined, AlignLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { Input, Button, message, Menu, Spin, Select } from 'antd';
import { SketchPicker } from 'react-color';
import * as htmlToImage from 'html-to-image';

export default function qrCodeGenerator() {
  const [text, setText] = useState('');
  const [areaText, setAreaText] = useState('');
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFF');
  const [showQRcode, setShowQRcode] = useState(''); //show qrcode
  const [hidden, setHidden] = useState(false); //show color picker
  const [bghidden, setBgHidden] = useState(false); //show color picker
  const [shidden, setSHidden] = useState(false); //show size change
  const [chsize, setChSize] = useState(220); //size
  const [menu, setMenu] = useState('link');
  const [showSpin, setShowSpin] = useState(false); //show spin
  const [imageSettings, setImageSettings] = useState({
    src: '',
    x: 56,
    y: 0,
    height: 24,
    width: 24,
    excavate: true,
  });

  const { TextArea } = Input;

  useEffect(() => {
    if (showQRcode && hidden && chsize && imageSettings) {
      setShowQRcode('');
    }
  }, [showQRcode, hidden, chsize, imageSettings]);

  const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

  function handleConvert() {
    setShowSpin(true);
    if (menu === 'link' && text.trim() === '') {
      message.error('请在URL框输入转换内容！');
      setShowQRcode('');
      setShowSpin(false);
      return;
    }
    if (menu === 'text' && areaText.trim() === '') {
      message.error('请在Message框输入转换内容！');
      setShowQRcode('');
      setShowSpin(false);
      return;
    }
    if (menu === 'link') {
      if (chsize < 0) {
        setShowQRcode(text);
        message.error('size cannot be minus！');
      } else if (chsize > 0 && chsize <= 30) {
        setShowQRcode(text);
        message.warning('Generate QR code size is too small.You need modify a more appropriate value!');
      } else {
        setShowQRcode(text);
      }
      setHidden(false);
      setBgHidden(false);
      setShowSpin(false);
    }
    if (menu === 'text') {
      setShowQRcode(areaText);
      setHidden(false);
      setBgHidden(false);
      setShowSpin(false);
    }
  }

  function onColorChangeHandler(color: { hex: string }) {
    setFgColor(color.hex);
    setHidden(false);
    console.log('color', color);
  }

  function onBGColorChangeHandler(color: { hex: string }) {
    setBgColor(color.hex);
    setBgHidden(false);
    console.log('BGcolor', color);
  }

  function onTextAreaValueChangeHandler(textareaValue: React.ChangeEvent<HTMLTextAreaElement>) {
    console.log(textareaValue.target);
    setAreaText(textareaValue.target.value);
  }

  function onInputValueChangeHandler(linkValue: React.ChangeEvent<HTMLInputElement>) {
    console.log(linkValue.target.value);
    setText(linkValue.target.value);
  }

  function onMenuItemClickHandler(menuItem: { key: string }) {
    setMenu(menuItem.key);
    setShowQRcode('');
    setHidden(false);
    setBgHidden(false);
  }

  function onBlurHandler(e) {
    console.log('blur->', e);
  }

  function onSizeChangeHandler(e) {
    setShowQRcode('');
    setChSize(e.target.value);
    if (e.target.value === '') {
      setChSize(220);
      setShowQRcode('');
    } //default & empty = 220
    console.log('sizechange->', e.target.value, chsize);
  }

  function onSelectChangeHandler(value: number) {
    setChSize(value);
  }

  const svgElement = document.getElementById('qrcode-svg');
  if (svgElement) {
    htmlToImage.toSvg(svgElement);
  }

  function onDownloadQRCodeImageHandler(type) {
    if (!showQRcode) {
      message.error('Generate QR code first.');
      return;
    }

    const qrcodeImage = document.getElementById('qrcode-svg');
    if (qrcodeImage) {
      let downloadFunc: any;
      let extension: string;

      if (type === 'svg') {
        downloadFunc = htmlToImage.toSvg;
        extension = 'svg';
      } else if (type === 'png') {
        downloadFunc = htmlToImage.toPng;
        extension = 'png';
      } else {
        message.error('Invalid download type');
        return;
      }
      downloadFunc(qrcodeImage)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = `qrcode.${extension}`;
          link.click();
        })
        .catch((error) => {
          console.error('Error gernarating ${extension}:', error);
        });
    }
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
        {menu === 'link' && (
          <div style={{ backgroundColor: '#f5f5ff' }}>
            <h2>Link</h2>
            <div className="margin-b10">
              <label>URL</label>
              <Input placeholder="type a http://" value={text} allowClear onBlur={onBlurHandler} onChange={onInputValueChangeHandler} />
            </div>
          </div>
        )}
        {menu === 'text' && (
          <div style={{ backgroundColor: '#f5f5ff' }}>
            <h2>Text</h2>
            <div className="margin-b10">
              <label>Message</label>
              <TextArea placeholder="type some messages" value={areaText} allowClear onChange={onTextAreaValueChangeHandler} />
            </div>
          </div>
        )}
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
          className="timestamp-button margin-b10"
          onClick={handleConvert}
        >
          generate your new qrcode
        </Button>
        <Button onClick={() => setHidden(!hidden)}>Choose qrcode Color</Button>
        <div style={{ display: 'flex' }}>
          <label>current fgcolor</label>
          <div
            className="colorbox-shadow"
            style={{ width: 24, height: 24, backgroundColor: fgColor, border: '1px solid #ccc', display: 'inline-block', padding: '5px' }}
          ></div>
          {hidden && (
            <div className="subitem-bg" style={{ position: 'absolute', zIndex: '20' }}>
              <SketchPicker color={fgColor} onChange={onColorChangeHandler} display={hidden ? 'block' : 'none'}></SketchPicker>
            </div>
          )}
        </div>
        <Button onClick={() => setBgHidden(!bghidden)}>Choose qrcode bg Color</Button>
        <div style={{ display: 'flex' }}>
          <label>current bgcolor</label>
          <div
            className="colorbox-shadow"
            style={{ width: 24, height: 24, backgroundColor: bgColor, border: '1px solid #ccc', display: 'inline-block' }}
          ></div>
          {bghidden && (
            <div className="subitem-bg" style={{ position: 'absolute', zIndex: '20' }}>
              <SketchPicker color={bgColor} onChange={onBGColorChangeHandler} display={bghidden ? 'block' : 'none'}></SketchPicker>
            </div>
          )}
        </div>
        <Button onClick={() => setSHidden(!shidden)}>change size</Button>
        {shidden && (
          <div className="subitem-bg" style={{ width: 350 }}>
            <Input
              placeholder="type value(number) change size"
              value={220 ? undefined : chsize}
              type="number"
              allowClear
              onChange={onSizeChangeHandler}
            />
            <div className="margin-t10">
              <Select
                defaultValue={220}
                onChange={onSelectChangeHandler}
                options={[
                  { value: 220, label: ' 默认尺寸' },
                  { value: 50, label: 50 },
                  { value: 100, label: 100 },
                  { value: 200, label: 200 },
                  { value: 300, label: 300 },
                  { value: 400, label: 400 },
                  { value: 500, label: 500 },
                ]}
              ></Select>
            </div>
          </div>
        )}
        <div
          className="div-flex h-center v-middle"
          style={{ border: '1px solid #2196e3', backgroundColor: '#f2f8fd', width: chsize + 20, height: chsize + 20 }}
        >
          {showSpin && <Spin indicator={antIcon} />}
          {showQRcode && (
            <QRCodeSVG
              id="qrcode-svg"
              style={{ maxHeight: '100%', maxWidth: '100%', padding: 10 }}
              value={showQRcode}
              size={chsize}
              bgColor={bgColor}
              fgColor={fgColor}
              level={'L'}
              includeMargin={false}
              imageSettings={imageSettings}
            />
          )}
        </div>
        <div>
          <label style={{ fontSize: 12, color: 'red' }}>注: 生成二维码的默认尺寸是 220*220</label>
        </div>
        <div>
          <Button
            style={{ backgroundColor: '#2196e3', marginRight: 8, marginTop: 8, color: '#fff' }}
            value={'svg'}
            onClick={() => {
              onDownloadQRCodeImageHandler('svg');
            }}
          >
            Download SVG
          </Button>
          <Button
            style={{ backgroundColor: '#2196e3', color: '#fff' }}
            value={'png'}
            onClick={() => {
              onDownloadQRCodeImageHandler('png');
            }}
          >
            Download PNG
          </Button>
          {/* <Button onClick={onDownloadQRCodeImageHandler}>download qrcode</Button> */}
        </div>
      </div>
    </div>
  );
}
