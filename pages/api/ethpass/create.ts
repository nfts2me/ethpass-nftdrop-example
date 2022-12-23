import type { NextApiRequest, NextApiResponse } from 'next';
import { CreatePassPayload } from '../../../features/ethpass/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      const {
        chainId,
        contractAddress,
        image,
        platform,
        signedMessage,
        signatureMessage,
        tokenId,
      } = req.body as CreatePassPayload;

      try {
        // Customize Pass
        const appleWalletOptions = {
          primaryFields: [
            {
              label: 'omg bro',
              textAlignment: 'PKTextAlignmentNatural',
              key: 'field1',
              value: 'string',
            },
          ],
          secondaryFields: [
            {
              label: 'Hello test',
              textAlignment: 'PKTextAlignmentNatural',
              key: 'field2',
              value: 'string',
            },
          ],
          description: 'My Event Name',
          logoText: 'Ethpass API demo',
          labelColor: 'rgb(58,73,202)',
          backgroundColor: 'rgb(255,255,255)',
          foregroundColor: 'rgb(161,160,160)',
        };

        const googleWalletOptions = {
          messages: [],
        };

        // Request to create pass
        const payload = await fetch(
          `${
            process.env.ETHPASS_API_HOST || 'https://api.ethpass.xyz'
          }/api/v0/passes`,
          {
            method: 'POST',
            body: JSON.stringify({
              barcode: {
                message:
                  'The contents of this message will be returned in the response payload after the pass has been scanned',
              },
              chain: {
                name: 'evm',
                network: chainId,
              },
              nft: {
                contractAddress,
                tokenId,
              },
              image,
              pass:
                platform === 'apple' ? appleWalletOptions : googleWalletOptions,
              platform,
              signature: signedMessage,
              signatureMessage,
            }),
            headers: new Headers({
              'content-type': 'application/json',
              'x-api-key': process.env.ETHPASS_API_KEY as string,
            }),
          }
        );

        if (payload.status === 200) {
          const json = await payload.json();
          return res.status(200).json(json);
        } else {
          const json = await payload.json();
          console.log('error', json);
          return res.status(payload.status).send(json.message);
        }
      } catch (err) {
        return res.status(400).send(err);
      }
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
