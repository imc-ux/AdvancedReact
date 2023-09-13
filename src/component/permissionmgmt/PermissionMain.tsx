import React, { useState } from 'react';
import RoleList from '@/component/permissionmgmt/RoleList';
import PermissionInfo from '@/component/permissionmgmt/PermissionInfo';
import { PermissionInfo as PermissionType } from '@/vo/Permission';
// import PermissionInfoProps from '@/component/permissionmgmt/PermissionInfo';

export default function PermissionMain() {
  const [display, setDisplay] = useState('none');
  const [listInfo, setInfo] = useState('');
  const [gridInfo, setGridInfo] = useState<PermissionType | PermissionType[]>(null);

  function onListDropCallbackHandler(state: string) {
    setDisplay(state);
  }

  function onListInfoChangeHandler(listInfo: string) {
    setInfo(listInfo);
  }

  function onGridInfoChangeHandler(gridInfo: PermissionType | PermissionType[]) {
    setGridInfo(gridInfo);
  }

  return (
    <div className="dis-flex">
      <RoleList onListDropCallback={onListDropCallbackHandler} listInfo={listInfo} gridInfo={gridInfo} />
      <PermissionInfo onDataBinState={display} onListInfoChange={onListInfoChangeHandler} onGridInfoChange={onGridInfoChangeHandler} />
    </div>
  );
}
