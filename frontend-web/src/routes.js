import React from 'react';
const Live = React.lazy(() => import('./views/Device/Live'));
const Upload = React.lazy(() => import('./views/Device/Upload'));
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [  
  { path: '/auth/live',exact: true, name:'Live', component: Live},
  { path: '/auth/upload',exact: true, name:'Upload', component: Upload},
  { path: '/',exact: true, name:'Live', component: Live},
];

export default routes;
