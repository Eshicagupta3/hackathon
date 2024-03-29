import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Web3Modal from 'web3modal';
import Image from 'next/image';

import Styles from './marketplace.module.css';

import { marketplaceAddress } from '../config';

import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json';

// const rpcEndpointUrl = 'http://127.0.0.1:8545';
const rpcEndpointUrl = "https://rpc-mumbai.maticvigil.com";

export default function MarketPlace() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState('not-loaded');
  useEffect(() => {
    loadNFTs();
  }, []);
  async function loadNFTs() {
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.JsonRpcProvider(rpcEndpointUrl);
    // const provider = new ethers.providers.JsonRpcProvider();
    const contract = new ethers.Contract(
      marketplaceAddress,
      NFTMarketplace.abi,
      provider
    );
    const data = await contract.fetchMarketItems();

    /*
     *  map over items returned from smart contract and format
     *  them as well as fetch their token metadata
     */
    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await contract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        // const meta = await axios.get(`/api/proxy?url=${encodeURIComponent(tokenUri)}`);
        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState('loaded');
  }
  async function buyNft(nft) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      marketplaceAddress,
      NFTMarketplace.abi,
      signer
    );

    /* user will be prompted to pay the asking proces to complete the transaction */
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');
    const transaction = await contract.createMarketSale(nft.tokenId, {
      value: price,
    });
    await transaction.wait();
    loadNFTs();
  }
  if (loadingState === 'loaded' && !nfts.length)
    return <h1 className='px-20 py-10 text-3xl'>No items in marketplace</h1>;
  return (
    <div className='flex justify-center'>
      <div className='p-24 ' style={{ maxWidth: '1600px' }}>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pt-4'>
          {nfts.map((nft, i) => (
            <div key={i} className={Styles.card}>
              <Image src={nft.image} width={600} height={800} />
              <div className='p-4'>
                <p className='text-4xl text-white font-semibold'>{nft.name}</p>
                <div>
                  <p className='text-gray-400'>{nft.description}</p>
                </div>
              </div>
              <div className='p-4 bg-black'>
                <p className='text-2xl font-bold text-white'>{nft.price} ETH</p>
                <button
                  className={`mt-4 w-full text-white font-bold py-2 px-12 rounded ${Styles.button}`}
                  onClick={() => buyNft(nft)}
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
