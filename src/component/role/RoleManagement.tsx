import React, { useState } from 'react';
import RolePart1 from '@/component/role/RolePart1';
import RolePart2 from '@/component/role/RolePart2';
import { DeleteOutlined } from '@ant-design/icons';

export default function RoleManagement() {
  const [block, setBlock] = useState('none');
  const [dropValue, setDropValue] = useState(null);
  const [roleValue, setRoleValue] = useState(0);

  function onClearOverHandler(ev: React.DragEvent<HTMLDivElement>) {
    ev.preventDefault();
  }

  function onRoleDragEndHandler() {
    setBlock('none');
  }

  function onRoleClearDropHandler(ev: React.DragEvent<HTMLDivElement>) {
    const value = JSON.parse(ev.dataTransfer.getData('text'));
    setDropValue(value);
    setBlock('none');
    setRoleValue(d => ++d);
  }

  function onDropCallbackHandler(state: string) {
    setBlock(state);
    console.log('state', state);
  }

  function onDataChangedHandler() {
    setRoleValue(d => ++d);
  }

  return (
    <div className="div-flex">
      <RolePart1 className="role-left-container" dropValue={dropValue} roleValue={roleValue} onDropCallback={onDropCallbackHandler} />
      <RolePart2 className="role-right-container" onDataChanged={onDataChangedHandler} />
      <div
        style={{ display: block }}
        className="clear-div"
        onDragOver={onClearOverHandler}
        onDrop={onRoleClearDropHandler}
        onDragEnd={onRoleDragEndHandler}
      >
        <DeleteOutlined className="DeleteOutlined" />
      </div>
    </div>
  );
}
