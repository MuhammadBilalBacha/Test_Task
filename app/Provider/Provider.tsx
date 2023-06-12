'use client';

import React from 'react';
import  {Provider}  from 'react-redux';
import { Store } from '../../Redux/Store';
`'use client'`;
const Providers = ({ children } : { children: React.ReactNode}) => {
  return (
    <Provider store={Store} >
     {children}
    </Provider>
  );
};

export default Providers;
