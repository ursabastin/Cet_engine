import React from 'react';
import { useLocation } from 'react-router-dom';
import TopBar from './TopBar';
import NavRail from './NavRail';
import ContentArea from './ContentArea';

export default function ShellLayout({ children }) {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  // If we are on test interface, we might also want to hide the shell 
  // since TestInterface has its own fixed header. Let's do that.
  const isTest = location.pathname.startsWith('/test/');

  if (isLanding || isTest) {
    return <div style={{ height: '100vh', overflow: 'hidden' }}>{children}</div>;
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopBar />
      <NavRail />
      <ContentArea>
        {children}
      </ContentArea>
    </div>
  );
}
