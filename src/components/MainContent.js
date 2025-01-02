import React from 'react';
import HomePage from './HomePage';
import Branches from './Branches';
import Help from './Help';

function MainContent({ activeContent }) {
  switch (activeContent) {
    case 'Branches':
      return <Branches />;
    case 'Help':
      return <Help />;
    default:
      return <HomePage />;
  }
}

export default MainContent;