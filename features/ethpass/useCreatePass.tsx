import { useCallback, useState } from 'react';
import { CreatePassPayload, GeneratedPass, Platform } from './types';
import toast from 'react-hot-toast';
import { useSigner } from '@thirdweb-dev/react';
import { chainId, contractAddress } from '../../utils/contractDetails';
import { NFT } from '@thirdweb-dev/sdk';

export function useCreatePass() {
  const [error, setError] = useState<boolean>(false);
  const signer = useSigner();

  const createPass = useCallback(
    async (nft: NFT, platform: Platform) => {
      const signatureToast = toast.loading('Waiting for signature...');
      const signatureMessage = `Sign this message to generate a pass with ethpass.xyz\n${Date.now()}`;

      try {
        if (!signer) return;

        const signedMessage = await signer.signMessage(signatureMessage);
        toast.dismiss(signatureToast);

        const payload: CreatePassPayload = {
          contractAddress,
          signedMessage,
          signatureMessage,
          tokenId: nft.metadata.id,
          image: nft.metadata.image,
          chainId: chainId,
          platform: platform,
        };

        const pendingToast = toast.loading('Generating pass...');

        const response = await fetch('/api/ethpass/create', {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: new Headers({
            'content-type': 'application/json',
          }),
        });
        toast.dismiss(pendingToast);

        if (response.status === 200) {
          const json = await response.json();
          return {
            id: json.id,
            fileUrl: json.fileURL,
            platform: json.platform,
          } as GeneratedPass;
        } else if (response.status === 401) {
          toast.error('Unable to verify NFT ownership');
          setError(true);
        }
      } catch (err) {
        toast.error(`Unable to create pass: ${err}`);
        setError(true);
      } finally {
      }
    },
    [signer]
  );

  return { createPass, error };
}
