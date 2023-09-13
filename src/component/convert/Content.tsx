import React from 'react';
import TimeStamp from './fragments/TimeStamp';
import MD5 from './fragments/MD5';
import SHA from './fragments/SHA-256';
import Base64 from './fragments/Base64';
import JSON from './fragments/JSON';
import UnicodeConverter from './fragments/UnicodeConverter';

interface IContentProps {
  id?: number;
}

export default function Content(props: IContentProps) {
  const { id = '' } = props;

  function getView() {
    if (id === 3) {
      return <TimeStamp />;
    } else if (id === 5) {
      return <MD5 />;
    } else if (id === 6) {
      return <SHA />;
    } else if (id === 2) {
      return <Base64 />;
    } else if (id === 1) {
      return <JSON />;
    } else if (id === 7) {
      return <UnicodeConverter />;
    }
  }

  return <div className="content">{getView()}</div>;
}
