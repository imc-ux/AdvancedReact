import React, { useState } from 'react';
import Menu from './Menu';
import Content from './Content';
import { MENU_LIST } from './Menu';

interface IMenuContext {
  onMenuItemClick: (id: number) => void;
  showing: number[];
}

export const menuContext = React.createContext<IMenuContext>(null);

export default function Main() {
  const [id, setId] = useState(1);
  const [currentId, setCurrentId] = useState(0);
  const [showingMenu, setShowingMenu] = useState<number[]>([]);

  function onMenuClickHandler(id: number) {
    setCurrentId(id);
    if (MENU_LIST.find((item) => item.id === id)?.children) {
      if (showingMenu.includes(id)) {
        setShowingMenu((s) => {
          const result = [...s];
          result.splice(
            result.findIndex((i) => i === id),
            1
          );
          return result;
        });
      } else {
        setShowingMenu((s) => {
          return [...s, id];
        });
      }
    } else {
      setId(id);
    }
  }

  return (
    <div className="menu-height">
      <div className="main-content">
        <menuContext.Provider value={{ onMenuItemClick: onMenuClickHandler, showing: showingMenu }}>
          <Menu currentId={currentId} />
        </menuContext.Provider>
        <Content id={id} />
      </div>
    </div>
  );
}
