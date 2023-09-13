import ReactDOM from 'react-dom/client';
import React from 'react';
import Main from '@/component/convert/Main';
import '@/style.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import PermissionMain from '@/component/permissionmgmt/PermissionMain';
import RoleManagement from '@/component/role/RoleManagement';
import Share from './component/sharemgmt/ShareMain';
import 'antd/dist/antd.variable.css';
import { ConfigProvider } from 'antd';

ConfigProvider.config({
  theme: {
    primaryColor: 'green',
  },
});

const word = document.querySelector('.root');
const root = ReactDOM.createRoot(word);

// root.render(<Main />);
root.render(
  <React.StrictMode>
    <HashRouter>
      {/*<Main />*/}
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/permission" element={<PermissionMain />} />
        <Route path="/role" element={<RoleManagement />} />
        <Route path="/share" element={<Share />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
