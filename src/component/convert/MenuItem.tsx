import React, { useContext, useMemo, useEffect } from 'react';
import { menuContext } from './Main';
import { MENU_LIST } from './Menu';

interface IMenuItemProps {
  name: string;
  id: number;
  currentId?: number;
  parent?: number;
  children?: IMenuItemProps[];
  currentParent?: number;
}

export default function MenuItem(props: IMenuItemProps) {
  const { name, id, currentId, children, parent } = props;
  const { onMenuItemClick, showing } = useContext(menuContext);
  const menuItemClasses = useMemo(() => {
    return children ? 'menu-noline' : parent ? ' menu-sub' : 'menu-item';
  }, [parent]);

  useEffect(() => {
    console.log(333, currentId);
  }, [currentId]);

  function onClickHandler() {
    onMenuItemClick(id);

    console.log('11111', id);
  }

  function getChildren() {
    if (children) {
      const classes = showing.includes(id) ? 'show-menu menu-children' : 'hidden-menu menu-children';
      return (
        <div className={classes}>
          {children.map((menu) => {
            return <MenuItem currentId={currentId} key={menu.id} {...menu} />;
          })}
        </div>
      );
    } else {
      return null;
    }
  }

  function bgcolor() {
    return (
      (currentId === id && MENU_LIST.some((e) => e.id === currentId)) ||
      MENU_LIST.find((e) => e.id === id)?.children?.some((item) => item.id === currentId)
    );
  }

  function menuFontcolor() {
    return parent > 0 && currentId === id;
  }

  return (
    <React.Fragment>
      <div
        className={menuItemClasses}
        onClick={onClickHandler}
        style={{
          backgroundColor: bgcolor() ? '#5fb3eb' : '',
          color: (menuFontcolor() ? '#1382cb' : '') || (bgcolor() ? 'white' : ''),
        }}
      >{`${name}`}</div>
      {getChildren()}
    </React.Fragment>
  );
}
