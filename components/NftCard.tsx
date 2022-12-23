import { NFT } from '@thirdweb-dev/sdk';
import { useSigner } from '@thirdweb-dev/react';

import { contractAddress, chainId } from '../utils/contractDetails';
import styles from '../styles/NftCard.module.css';
import { useCreatePass } from '../features/ethpass/useCreatePass';
import {
  CreatePassPayload,
  GeneratedPass,
  Platform,
} from '../features/ethpass/types';
import { useState } from 'react';
import { Modal } from './Modal';

interface NftCardProps {
  nft: NFT;
}

const NftCard = ({ nft }: NftCardProps) => {
  const { createPass } = useCreatePass();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [generatedPass, setGeneratedPass] = useState<GeneratedPass | null>(null);

  const handleCreatePass = async (platform: Platform) => {
    try {
      const createdPass = await createPass(nft, platform);

      if (createdPass) {
        setGeneratedPass(createdPass);
        setModalOpen(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.nft_card}>
      {generatedPass ? (
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setModalOpen(false);
            setGeneratedPass(null);
          }}
          generatedPass={generatedPass}
        />
      ) : null}
      <div className={styles.nft_image_container}>
        <img
          className={styles.nft_image}
          src={nft.metadata.image as string}
          alt={`${nft.metadata.name} preview image`}
        />
      </div>
      <span className={'text-2xl font-bold'}>
        {nft.metadata.name} #{nft.metadata.id}
      </span>
      <div className={styles.wallets_container}>
        <div
          onClick={() => {
            handleCreatePass('apple');
          }}
          className={styles.wallet_button}
        >
          <img
            className={styles.wallet_image}
            src={'apple_wallet_badge.svg'}
            alt='Apple wallet logo'
          />
        </div>

        <div
          onClick={() => {
            handleCreatePass('google');
          }}
          className={styles.wallet_button}
        >
          <img
            className={styles.wallet_image}
            src={'google_wallet_badge.svg'}
            alt='Google wallet logo'
          />
        </div>
      </div>
    </div>
  );
};

export default NftCard;
