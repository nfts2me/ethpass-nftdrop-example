import styles from '../styles/Theme.module.css';
import Navbar from '../components/Nav';
import {
  useContract,
  useOwnedNFTs,
  useAddress,
  useSigner,
} from '@thirdweb-dev/react';
import NftCard from '../components/NftCard';
import { contractAddress } from '../utils/contractDetails';

const Dashboard = () => {
	// Exposes the contract's interface
  const { contract } = useContract(contractAddress);
  // Obtain the address of the connected wallet.
  const walletAddress = useAddress();
	// Gets all the NFTs owned by the connected wallet's address
  const { data: nfts, isLoading: loading } = useOwnedNFTs(
    contract,
    walletAddress
  );

  const ownedNfts = nfts?.map((nft, index) => {
    return <NftCard key={`nft_${index}`} nft={nft} />;
  });

  return (
    <div className={styles.container}>
      <Navbar />
      <main>
        {!walletAddress ? 'Connect your wallet to generate a pass' : null}
        {!loading && nfts && walletAddress ? (
          <div className={styles.dashboard_nfts}>{ownedNfts}</div>
        ) : (
          <span> Loading... </span>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
