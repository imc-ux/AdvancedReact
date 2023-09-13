import React from 'react';
import { IRow } from '../JSON';

function combinedValueClasses(element: IRow): string {
  return element.type === 'string' ? 'color-string' : element.type === 'number' ? 'color-number' : 'color-other';
}

export default function Row(props: IRow) {
  const { level, propsKey, propsValue, comma } = props;

  return (
    <div style={{ display: 'flex', height: 22 }}>
      <div className="row-back" style={{ marginLeft: level * 30 }}>
        <span>{propsKey}</span>
        <span className={combinedValueClasses(props)}>{propsValue}</span>
        <span>{comma ? ',' : ''}</span>
      </div>
    </div>
  );
}
