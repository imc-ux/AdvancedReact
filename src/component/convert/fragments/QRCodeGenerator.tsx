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
  const [showQRcode, setShowQRcode] = useState('');
  const [hidden, setHidden] = useState(false);
  const [bghidden, setBgHidden] = useState(false);
  const [sizeHidden, setSizeHidden] = useState(false);
  const [chsize, setChSize] = useState(220);
  const [menu, setMenu] = useState('link');
  const [showSpin, setShowSpin] = useState(false);

  const { TextArea } = Input;
  const defaultValue = 220;

  useEffect(() => {
    if (showQRcode && hidden && chsize) {
      setShowQRcode('');
    }
  }, [showQRcode, hidden, chsize]);

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
        message.error('The size cannot be minus！');
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
  }

  function onBGColorChangeHandler(color: { hex: string }) {
    setBgColor(color.hex);
    setBgHidden(false);
  }

  function onTextAreaValueChangeHandler(textareaValue: React.ChangeEvent<HTMLTextAreaElement>) {
    setAreaText(textareaValue.target.value);
  }

  function onInputValueChangeHandler(linkValue: React.ChangeEvent<HTMLInputElement>) {
    setText(linkValue.target.value);
  }

  function onMenuItemClickHandler(menuItem: { key: string }) {
    setMenu(menuItem.key);
    setShowQRcode('');
    setHidden(false);
    setBgHidden(false);
  }

  function onSizeChangeHandler(e) {
    setShowQRcode('');
    setChSize(e.target.value);
    if (e.target.value === '') {
      setChSize(220);
      setShowQRcode('');//input type为数字时 监听值的类型是什么
    }
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
        message.error('Invalid download type.');
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
          console.error('Error gernerating ${extension}:', error);
        });
    }
  }

  return (
    <div className="wrap-grid">
      <div>
        <Menu mode="vertical" selectedKeys={[menu]} onClick={onMenuItemClickHandler}>
          <Menu.Item key="link" className="text-c menu-item-bg">
            <LinkOutlined />
            <label className="margin-l5">Link</label>
          </Menu.Item>
          <Menu.Item key="text" className="text-c menu-item-bg">
            <AlignLeftOutlined />
            <label className="margin-l5">Text</label>
          </Menu.Item>
        </Menu>
      </div>
      <div>
        {menu === 'link' && (
          <div className="content-bg">
            <h2>Link</h2>
            <div className="margin-b10">
              <label>URL</label>
              <Input placeholder="type a http://" value={text} allowClear onChange={onInputValueChangeHandler} />
            </div>
          </div>
        )}
        {menu === 'text' && (
          <div className="content-bg">
            <h2>Text</h2>
            <div className="margin-b10">
              <label>Message</label>
              <TextArea placeholder="type some messages" value={areaText} allowClear onChange={onTextAreaValueChangeHandler} />
            </div>
          </div>
        )}
        <Button className="timestamp-button margin-b10 qrcode-btn qrcode-btn-p" onClick={handleConvert}>
          generate your new qrcode
        </Button>
        <Button onClick={() => setHidden(!hidden)}>Choose qrcode Color</Button>
        <div className="flex">
          <label>current fgcolor</label>
          <div className="colorbox colorbox-shadow pd5" style={{ backgroundColor: fgColor }}></div>
          {hidden && (
            <div className="subitem-bg position-a index20 pd10">
              <SketchPicker color={fgColor} onChange={onColorChangeHandler} display={hidden ? 'block' : 'none'}></SketchPicker>
            </div>
          )}
        </div>
        <Button onClick={() => setBgHidden(!bghidden)}>Choose qrcode bg Color</Button>
        <div className="flex">
          <label>current bgcolor</label>
          <div className="colorbox colorbox-shadow pd5" style={{ backgroundColor: bgColor }}></div>
          {bghidden && (
            <div className="subitem-bg position-a index20 pd10">
              <SketchPicker color={bgColor} onChange={onBGColorChangeHandler} display={bghidden ? 'block' : 'none'}></SketchPicker>
            </div>
          )}
        </div>
        <Button onClick={() => setSizeHidden(!sizeHidden)}>change size</Button>
        {sizeHidden && (
          <div className="subitem-bg pd10" style={{ width: 350 }}>
            <Input
              placeholder="type value(number) change size"
              value={defaultValue ? undefined : chsize}
              type="number"
              allowClear
              onChange={onSizeChangeHandler}
            />
            <div className="margin-t10">
              <Select
                defaultValue={defaultValue}
                onChange={onSelectChangeHandler}
                options={[
                  { value: defaultValue, label: ' 默认尺寸' },
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
        <div className="div-flex h-center v-middle qrcode-box" style={{ width: chsize + 20, height: chsize + 20 }}>
          {showSpin && <Spin indicator={antIcon} />}
          {showQRcode && (
            <QRCodeSVG
              className="pd10"
              id="qrcode-svg"
              style={{ maxHeight: '100%', maxWidth: '100%' }}
              value={showQRcode}
              size={chsize}
              bgColor={bgColor}
              fgColor={fgColor}
              level={'L'}
              includeMargin={false}
              imageSettings={{ src: '', x: 56, y: 0, height: 24, width: 24, excavate: true }}
            />
          )}
        </div>
        <div>
          <label className="fontSize12 c-red">注: 生成二维码的默认尺寸是 220*220</label>
        </div>
        <div>
          <Button
            className="qrcode-btn"
            style={{ marginRight: 8, marginTop: 8 }}
            value={'svg'}
            onClick={() => {
              onDownloadQRCodeImageHandler('svg');
            }}
          >
            Download SVG
          </Button>
          <Button
            className="qrcode-btn"
            value={'png'}
            onClick={() => {
              onDownloadQRCodeImageHandler('png');
            }}
          >
            Download PNG
          </Button>
        </div>
      </div>
    </div>
  );
}
