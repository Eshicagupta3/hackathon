import Styles from './index.module.css';
import Image from 'next/image'

const Home = () => {
  return (
    <div>
      <div className={Styles.main}>
        <div className={Styles.left}>
          <h1 className={`${Styles.heading} `}>
            Experience the Next Evolution of Collectibles
          </h1>
          <h1 className={`${Styles.heading} ${Styles.extra}`}>
            Extraordinary NFTs
          </h1>
          <p className={Styles.text}>Buy, Sell, and Trade NFTs</p>
        </div>
        <div className={Styles.right}>
          <Image src='./heroImg.png' />
        </div>
      </div>
      <Image className={Styles.featuresImg} src='./features.png' />
    </div>
  );
};

export default Home;
