import { ConnectWallet } from '@thirdweb-dev/react';
import styles from '../styles/Theme.module.css';
import Link from 'next/link';

const Navbar = () => {
  return (
    <>
      <nav className={styles.navbar}>
        <Link href={'/'}>
          <span className={styles.navbar_item}>Homepage</span>
        </Link>
        <Link href={'/dashboard'}>
          <span className={styles.navbar_item}>Dashboard</span>
        </Link>
        <div className={styles.navbar_connect_button}>
          <ConnectWallet
            // Some customization of the button style
            colorMode='dark'
            accentColor='#6366F1'
          />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
