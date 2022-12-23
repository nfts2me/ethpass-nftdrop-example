export type Platform = 'apple' | 'google';
import { ChainId } from '@thirdweb-dev/react';

export type CreatePassPayload = {
  contractAddress: string;
  tokenId: string;
  signedMessage: string;
  signatureMessage: string;
  image: string | null | undefined;
  chainId: ChainId;
  platform: Platform;
};

export type GeneratedPass = {
  id: string;
  fileUrl: string;
  platform: string;
};
