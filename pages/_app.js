/* pages/_app.js */
import '../styles/globals.css';
import Link from 'next/link';

import Styles from './app.module.css';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav className='pl-28 pr-28 pt-8 flex items-center justify-between '>
        <Link href='/'>
          <div className='flex items-center '>
            <img className='w-16' alt='logo' src='./myx-log.webp' />
            <p className='text-4xl font-bold text-blue-100 ml-1'>MyxTokens</p>
          </div>
        </Link>
        <div className='flex mt-4'>
          <Link href='/marketplace'>
            <a className={Styles.link}>Explore</a>
          </Link>
          <Link href='/create-nft'>
            <a className={Styles.link}>Create</a>
          </Link>
          <Link href='/my-nfts'>
            <a className={Styles.link}>My NFTs</a>
          </Link>
          <Link href='/dashboard'>
            <a className={Styles.link}>Dashboard</a>
          </Link>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
