import TextArea from 'antd/lib/input/TextArea';
import React, { useEffect, useRef, useState } from 'react';
import { Checkbox, Typography, Button, notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import {
  base64ToString,
  decimalToString,
  decNumberToHTMLNameCode,
  GBCodeToString,
  htmlCodeToString,
  htmlNameCodeToDecString,
  stringToBase64,
  stringToDecimal,
  stringToGBEncode,
  stringToHTMLCode,
  stringToUnicode,
  stringToURLCode,
  stringToUTF16,
  stringToUTF32,
  stringToUTF8,
  unicodeToString,
  urlCodeToString,
  uTF16ToString,
  utf32ToString,
  uTF8ToString,
} from './helper/UnicodeHelper';
import iconv from 'iconv-lite';

const { Title } = Typography;

enum InputType {
  C = 'Common',
  UC = 'Unicode',
  U8 = 'UTF-8 Text',
  U8H = 'UTF-8 Hex',
  U16 = 'UTF-16',
  U32 = 'UTF-32',
  B64 = 'Base64',
  URL = 'URL',
  DEC = 'Decimal',
  HC = 'Html Code',
  HN = 'Html Name Code',
  GB4 = 'GB2312',
  GBK = 'GBK',
  GB5 = 'GB18130',
}

export default function UnicodeConverter() {
  const [inputValue, setInputValue] = useState('');
  const [refresh, setRefresh] = useState(Math.random());
  const inputTypeRef = useRef(InputType.C);
  const u8RemoveFlag = useRef(false);
  const u16RemoveFlag = useRef(false);
  const u32RemoveFlag = useRef(false);

  let commonText = '';
  let unicodeText = '';
  let utf8HexText = '';
  let utf16Text = '';
  let utf32Text = '';
  let base64Text = '';
  let urlText = '';
  let decimalText = '';
  let htmlCodeText = '';
  let htmlNameCodeText = '';
  let gb2312CodeText = '';
  let gbkCodeText = '';
  let gb18130CodeText = '';

  switch (inputTypeRef.current) {
    case InputType.UC:
      unicodeConverter();
      break;
    case InputType.U8H:
      utf8Converter();
      break;
    case InputType.U16:
      utf16Converter();
      break;
    case InputType.U32:
      utf32Converter();
      break;
    case InputType.B64:
      base64Converter();
      break;
    case InputType.URL:
      urlConverter();
      break;
    case InputType.DEC:
      decConverter();
      break;
    case InputType.HC:
      htmlCodeConverter();
      break;
    case InputType.HN:
      htmlNameCodeConverter();
      break;
    case InputType.GB4:
    case InputType.GBK:
    case InputType.GB5:
      gbCodeConverter();
      break;
    default:
      commonTextConvert();
      break;
  }

  function unicodeConverter() {
    unicodeText = inputValue;
    commonText = unicodeToString(inputValue);
    utf8HexText = stringToUTF8(commonText, u8RemoveFlag.current);
    utf16Text = stringToUTF16(commonText, u16RemoveFlag.current);
    utf32Text = stringToUTF32(commonText, u32RemoveFlag.current);
    base64Text = stringToBase64(commonText);
    urlText = stringToURLCode(commonText);
    decimalText = stringToDecimal(commonText);
    htmlCodeText = stringToHTMLCode(commonText);
    htmlNameCodeText = decNumberToHTMLNameCode(decimalText);
    gb2312CodeText = stringToGBEncode(commonText, 'GB2312');
    gbkCodeText = stringToGBEncode(commonText, 'GBK');
    gb18130CodeText = stringToGBEncode(commonText, 'GB18030');
  }

  function utf8Converter() {
    utf8HexText = inputValue;
    commonText = uTF8ToString(inputValue);
    unicodeText = stringToUnicode(commonText);
    utf16Text = stringToUTF16(commonText, u16RemoveFlag.current);
    utf32Text = stringToUTF32(commonText, u32RemoveFlag.current);
    base64Text = stringToBase64(commonText);
    urlText = stringToURLCode(commonText);
    decimalText = stringToDecimal(commonText);
    htmlCodeText = stringToHTMLCode(commonText);
    htmlNameCodeText = decNumberToHTMLNameCode(decimalText);
    gb2312CodeText = stringToGBEncode(commonText, 'GB2312');
    gbkCodeText = stringToGBEncode(commonText, 'GBK');
    gb18130CodeText = stringToGBEncode(commonText, 'GB18030');
  }

  function utf16Converter() {
    utf16Text = inputValue;
    commonText = uTF16ToString(inputValue, u16RemoveFlag.current);
    unicodeText = stringToUnicode(commonText);
    utf8HexText = stringToUTF8(commonText, u8RemoveFlag.current);
    utf32Text = stringToUTF32(commonText, u32RemoveFlag.current);
    base64Text = stringToBase64(commonText);
    urlText = stringToURLCode(commonText);
    decimalText = stringToDecimal(commonText);
    htmlCodeText = stringToHTMLCode(commonText);
    htmlNameCodeText = decNumberToHTMLNameCode(decimalText);
    gb2312CodeText = stringToGBEncode(commonText, 'GB2312');
    gbkCodeText = stringToGBEncode(commonText, 'GBK');
    gb18130CodeText = stringToGBEncode(commonText, 'GB18030');
  }

  function utf32Converter() {
    utf32Text = inputValue;
    commonText = utf32ToString(inputValue, u32RemoveFlag.current);
    unicodeText = stringToUnicode(commonText);
    utf8HexText = stringToUTF8(commonText, u8RemoveFlag.current);
    utf16Text = stringToUTF16(commonText, u16RemoveFlag.current);
    base64Text = stringToBase64(commonText);
    urlText = stringToURLCode(commonText);
    decimalText = stringToDecimal(commonText);
    htmlCodeText = stringToHTMLCode(commonText);
    htmlNameCodeText = decNumberToHTMLNameCode(decimalText);
    gb2312CodeText = stringToGBEncode(commonText, 'GB2312');
    gbkCodeText = stringToGBEncode(commonText, 'GBK');
    gb18130CodeText = stringToGBEncode(commonText, 'GB18030');
  }

  function base64Converter() {
    base64Text = inputValue;
    commonText = base64ToString(inputValue);
    unicodeText = stringToUnicode(commonText);
    utf8HexText = stringToUTF8(commonText, u8RemoveFlag.current);
    utf16Text = stringToUTF16(commonText, u16RemoveFlag.current);
    utf32Text = stringToUTF32(commonText, u32RemoveFlag.current);
    urlText = stringToURLCode(commonText);
    decimalText = stringToDecimal(commonText);
    htmlCodeText = stringToHTMLCode(commonText);
    htmlNameCodeText = decNumberToHTMLNameCode(decimalText);
    gb2312CodeText = stringToGBEncode(commonText, 'GB2312');
    gbkCodeText = stringToGBEncode(commonText, 'GBK');
    gb18130CodeText = stringToGBEncode(commonText, 'GB18030');
  }

  function urlConverter() {
    urlText = inputValue;
    commonText = urlCodeToString(inputValue);
    unicodeText = stringToUnicode(commonText);
    utf8HexText = stringToUTF8(commonText, u8RemoveFlag.current);
    utf16Text = stringToUTF16(commonText, u16RemoveFlag.current);
    utf32Text = stringToUTF32(commonText, u32RemoveFlag.current);
    base64Text = stringToBase64(commonText);
    decimalText = stringToDecimal(commonText);
    htmlCodeText = stringToHTMLCode(commonText);
    htmlNameCodeText = decNumberToHTMLNameCode(decimalText);
    gb2312CodeText = stringToGBEncode(commonText, 'GB2312');
    gbkCodeText = stringToGBEncode(commonText, 'GBK');
    gb18130CodeText = stringToGBEncode(commonText, 'GB18030');
  }

  function decConverter() {
    decimalText = inputValue;
    commonText = decimalToString(inputValue);
    unicodeText = stringToUnicode(commonText);
    utf8HexText = stringToUTF8(commonText, u8RemoveFlag.current);
    utf16Text = stringToUTF16(commonText, u16RemoveFlag.current);
    utf32Text = stringToUTF32(commonText, u32RemoveFlag.current);
    base64Text = stringToBase64(commonText);
    urlText = stringToURLCode(commonText);
    htmlCodeText = stringToHTMLCode(commonText);
    htmlNameCodeText = decNumberToHTMLNameCode(inputValue);
    gb2312CodeText = stringToGBEncode(commonText, 'GB2312');
    gbkCodeText = stringToGBEncode(commonText, 'GBK');
    gb18130CodeText = stringToGBEncode(commonText, 'GB18030');
  }

  function htmlCodeConverter() {
    htmlCodeText = inputValue;
    commonText = htmlCodeToString(inputValue);
    unicodeText = stringToUnicode(commonText);
    utf8HexText = stringToUTF8(commonText, u8RemoveFlag.current);
    utf16Text = stringToUTF16(commonText, u16RemoveFlag.current);
    utf32Text = stringToUTF32(commonText, u32RemoveFlag.current);
    base64Text = stringToBase64(commonText);
    urlText = stringToURLCode(commonText);
    decimalText = stringToDecimal(commonText);
    htmlNameCodeText = decNumberToHTMLNameCode(decimalText);
    gb2312CodeText = stringToGBEncode(commonText, 'GB2312');
    gbkCodeText = stringToGBEncode(commonText, 'GBK');
    gb18130CodeText = stringToGBEncode(commonText, 'GB18030');
  }

  function htmlNameCodeConverter() {
    htmlNameCodeText = inputValue;
    decimalText = htmlNameCodeToDecString(inputValue);
    commonText = decimalToString(decimalText);
    unicodeText = stringToUnicode(commonText);
    utf8HexText = stringToUTF8(commonText, u8RemoveFlag.current);
    utf16Text = stringToUTF16(commonText, u16RemoveFlag.current);
    utf32Text = stringToUTF32(commonText, u32RemoveFlag.current);
    base64Text = stringToBase64(commonText);
    urlText = stringToURLCode(commonText);
    htmlCodeText = stringToHTMLCode(commonText);
    gb2312CodeText = stringToGBEncode(commonText, 'GB2312');
    gbkCodeText = stringToGBEncode(commonText, 'GBK');
    gb18130CodeText = stringToGBEncode(commonText, 'GB18030');
  }

  function gbCodeConverter() {
    switch (inputTypeRef.current) {
      case InputType.GB4:
        {
          gb2312CodeText = inputValue;
          commonText = GBCodeToString(inputValue, 'GB2312');
          gbkCodeText = stringToGBEncode(commonText, 'GBK');
          gb18130CodeText = stringToGBEncode(commonText, 'GB18030');
        }
        break;
      case InputType.GBK:
        {
          gbkCodeText = inputValue;
          commonText = GBCodeToString(inputValue, 'GBK');
          gb2312CodeText = stringToGBEncode(commonText, 'GB2312');
          gb18130CodeText = stringToGBEncode(commonText, 'GB18030');
        }
        break;
      case InputType.GB5:
        {
          gb18130CodeText = inputValue;
          commonText = GBCodeToString(inputValue, 'GB18030');
          gb2312CodeText = stringToGBEncode(commonText, 'GB2312');
          gbkCodeText = stringToGBEncode(commonText, 'GBK');
        }
        break;
    }
    unicodeText = stringToUnicode(commonText);
    utf8HexText = stringToUTF8(commonText, u8RemoveFlag.current);
    utf16Text = stringToUTF16(commonText, u16RemoveFlag.current);
    utf32Text = stringToUTF32(commonText, u32RemoveFlag.current);
    base64Text = stringToBase64(commonText);
    urlText = stringToURLCode(commonText);
    decimalText = stringToDecimal(commonText);
    htmlCodeText = stringToHTMLCode(commonText);
    htmlNameCodeText = decNumberToHTMLNameCode(decimalText);
  }

  function commonTextConvert() {
    commonText = inputValue;
    unicodeText = stringToUnicode(inputValue);
    utf8HexText = stringToUTF8(inputValue, u8RemoveFlag.current);
    utf16Text = stringToUTF16(inputValue, u16RemoveFlag.current);
    utf32Text = stringToUTF32(inputValue, u32RemoveFlag.current);
    base64Text = stringToBase64(inputValue);
    urlText = stringToURLCode(inputValue);
    decimalText = stringToDecimal(inputValue);
    htmlCodeText = stringToHTMLCode(inputValue);
    htmlNameCodeText = decNumberToHTMLNameCode(decimalText);
    gb2312CodeText = stringToGBEncode(inputValue, 'GB2312');
    gbkCodeText = stringToGBEncode(inputValue, 'GBK');
    gb18130CodeText = stringToGBEncode(inputValue, 'GB18030');
  }

  function onCommonTextChangedHandler(data: string, type: InputType) {
    setInputValue(data);
    inputTypeRef.current = type;
  }

  function onCheckboxChangedHandler(data: boolean, type: InputType) {
    removeOrAddSymbol(data, type);
  }

  function removeOrAddSymbol(removeFlag: boolean, type: InputType) {
    if (removeFlag) {
      switch (type) {
        case InputType.U8H:
          u8RemoveFlag.current = removeFlag;
          inputTypeRef.current = type;
          setInputValue(utf8HexText.replace(/\\x/g, ''));
          break;
        case InputType.U16:
          u16RemoveFlag.current = removeFlag;
          inputTypeRef.current = type;
          setInputValue(utf16Text.replace(/\\u/g, ''));
          break;
        case InputType.U32:
          u32RemoveFlag.current = removeFlag;
          inputTypeRef.current = type;
          setInputValue(utf32Text.replace(/u\+/g, ''));
          break;
      }
    } else {
      switch (type) {
        case InputType.U8H:
          u8RemoveFlag.current = removeFlag;
          break;
        case InputType.U16:
          u16RemoveFlag.current = removeFlag;
          break;
        case InputType.U32:
          u32RemoveFlag.current = removeFlag;
          break;
      }
      inputTypeRef.current = InputType.C;
      setInputValue(commonText);
      setRefresh(Math.random());
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'auto' }}>
      <CustomTextArea title="Text ( Example: र Ю )" data={commonText} type={InputType.C} onTextAreaChanged={onCommonTextChangedHandler} />
      <CustomTextArea
        title="Unicode ( Example: u+930u+20u+42eu+22 )"
        data={unicodeText}
        type={InputType.UC}
        ristrict={/[^a-fA-F0-9u+]/g}
        key={refresh}
        onTextAreaChanged={onCommonTextChangedHandler}
      />
      <CustomTextArea
        title="UTF-8 ( Example: \xe0\xa4\xb0\x20\xd0\xae\x22 )"
        showCheckbox={true}
        checkboxLabel="Remove notation ( \x )"
        data={utf8HexText}
        type={InputType.U8H}
        ristrict={/[^a-fA-F0-9x\\]/g}
        onTextAreaChanged={onCommonTextChangedHandler}
        onCheckboxChanged={onCheckboxChangedHandler}
      />
      <CustomTextArea
        title="UTF-16 ( Example: \u0930\u0020\u042e\u0022 )"
        showCheckbox={true}
        checkboxLabel="Remove notation ( \u )"
        data={utf16Text}
        type={InputType.U16}
        ristrict={/[^a-fA-F0-9u\\]/g}
        onTextAreaChanged={onCommonTextChangedHandler}
        onCheckboxChanged={onCheckboxChangedHandler}
      />
      <CustomTextArea
        title="UTF-32 ( Example: u+00000930u+00000020u+0000042eu+00000022 )"
        showCheckbox={true}
        checkboxLabel="Remove notation ( u+ )"
        data={utf32Text}
        type={InputType.U32}
        ristrict={/[^a-fA-F0-9u+]/g}
        onTextAreaChanged={onCommonTextChangedHandler}
        onCheckboxChanged={onCheckboxChangedHandler}
      />
      <CustomTextArea
        title="Base64 ( Example: 4KSwINCuIg== )"
        data={base64Text}
        type={InputType.B64}
        onTextAreaChanged={onCommonTextChangedHandler}
      />
      <CustomTextArea
        title="URL(%) ( Example: %E0%A4%B0%20%D0%AE%22 )"
        data={urlText}
        type={InputType.URL}
        onTextAreaChanged={onCommonTextChangedHandler}
      />
      <CustomTextArea
        title="Decimal ( Example: 2352 32 1070 34 )"
        data={decimalText}
        type={InputType.DEC}
        ristrict={/[^0-9\s]/g}
        onTextAreaChanged={onCommonTextChangedHandler}
      />
      <CustomTextArea
        title="HTML Code ( Example: &#x26;#2352;&#x26;#32;&#x26;#1070;&#x26;#34; )"
        data={htmlCodeText}
        type={InputType.HC}
        onTextAreaChanged={onCommonTextChangedHandler}
      />
      <CustomTextArea
        title="Html Name Code ( Example: &#x26;quot; )"
        data={htmlNameCodeText}
        type={InputType.HN}
        onTextAreaChanged={onCommonTextChangedHandler}
      />
      <CustomTextArea
        title="GB2312 ( Example: ?\x20\xa7c0 )"
        data={gb2312CodeText}
        type={InputType.GB4}
        onTextAreaChanged={onCommonTextChangedHandler}
      />
      <CustomTextArea title="GBK ( Example: ?\x20\xa7c0 )" data={gbkCodeText} type={InputType.GBK} onTextAreaChanged={onCommonTextChangedHandler} />
      <CustomTextArea
        title="GB18130 ( Example: \x8131d136\x20\xa7c0 )"
        data={gb18130CodeText}
        type={InputType.GB5}
        onTextAreaChanged={onCommonTextChangedHandler}
      />
    </div>
  );
}

interface CustomTextAreaProps {
  data: string;
  type: InputType;
  title: string;
  checkboxLabel?: string;
  showCheckbox?: boolean;
  ristrict?: RegExp | string;
  onTextAreaChanged: (data: string, type: InputType) => void;
  onCheckboxChanged?: (data: boolean, type: InputType) => void;
}

function CustomTextArea(props: CustomTextAreaProps) {
  const [value, setValue] = useState(props.data);

  const [api, contextHolder] = notification.useNotification();

  const { title = '', checkboxLabel = '', showCheckbox = false, type } = props;

  let placeholderText = '在这里输入字符';

  switch (type) {
    case InputType.UC:
      break;
    case InputType.U8:
      break;
    case InputType.U8H:
      break;
    case InputType.U16:
      break;
    case InputType.U32:
      break;
    case InputType.B64:
      break;
    case InputType.URL:
      break;
    case InputType.DEC:
      break;
    default:
      break;
  }

  useEffect(() => {
    setValue(props.data);
  }, [props]);

  function onTextAreaBlurHandler(event) {
    if (event.target.value !== props.data || !event.target.value) {
      props.onTextAreaChanged(event.target.value, props.type);
    }
  }

  function onTextAreaChangeHandler(event) {
    if (props.ristrict) {
      setValue(event.target.value.replace(props.ristrict, ''));
    } else {
      setValue(event.target.value);
    }
  }

  function onChange(event) {
    props.onCheckboxChanged(event.target.checked, type);
  }

  function onCopyBtnClickHandler() {
    if (!value) {
      return;
    }
    navigator.clipboard.writeText(value).then(() => {
      api.open({
        message: '复制成功!',
        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
      });
    });
  }

  function onClearBtnClickHandler() {
    setValue('');
    props.onTextAreaChanged('', props.type);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {contextHolder}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={5}>{title}</Title>
        {showCheckbox && <Checkbox onChange={onChange}>{checkboxLabel}</Checkbox>}
      </div>
      <TextArea value={value} onChange={onTextAreaChangeHandler} onBlur={onTextAreaBlurHandler} placeholder={placeholderText} />
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '5px' }}>
        <Button type="primary" shape="round" size="small" onClick={onCopyBtnClickHandler}>
          copy
        </Button>
        <Button style={{ marginLeft: '5px' }} type="primary" shape="round" size="small" onClick={onClearBtnClickHandler}>
          clear
        </Button>
      </div>
    </div>
  );
}
