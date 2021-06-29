import { useState, useEffect } from 'react';
import { AppBar } from '@material-ui/core';
import {
  Help as HelpIcon,
  Info as InfoIcon,
  Stars as StarsIcon,
} from '@material-ui/icons';

import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';

const navData = [
  {
    label: 'Ranking',
    href: '/ranking',
    icon: StarsIcon,
  },
  {
    label: '¿Quienes somos?',
    href: '/about-us',
    icon: InfoIcon,
  },
  {
    label: 'Preguntas frecuentes',
    href: '/faq',
    icon: HelpIcon,
  },
];

const Header = () => {
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 960
        ? setMobileView(true)
        : setMobileView(false);
    };
    setResponsiveness();
    window.addEventListener('resize', () => setResponsiveness());
  }, []);

  return (
    <AppBar position="relative">
      {mobileView ? (
        <MobileHeader navData={navData} />
      ) : (
        <DesktopHeader navData={navData} />
      )}
    </AppBar>
  );
};

export default Header;
