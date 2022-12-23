import QRCode from 'qrcode';
import { GeneratedPass } from '../features/ethpass/types';
import { useEffect, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  generatedPass: GeneratedPass;
}

export const Modal = ({ isOpen, onClose, generatedPass }: ModalProps) => {
  const [qrCode, setQrCode] = useState<string>('');

  // Generate QR code from URL
  useEffect(() => {
    QRCode.toDataURL(generatedPass.fileUrl, (err, url) => {
      if (!err) setQrCode(url);
    });
  }, []);
  return (
    <>
      {isOpen ? (
        <>
          <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none'>
            <div className='relative my-6 mx-auto w-auto max-w-3xl'>
              {/*content*/}
              <div className='relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none'>
                {/*header*/}
                <div className='flex items-start justify-between rounded-t p-5'>
                  <h3 className='text-2xl font-semibold text-black'>
                    Here is your pass
                  </h3>
                </div>
                {/*body*/}
                <div className='relative flex-auto p-6'>
                  <img src={qrCode} alt='QR Code' width={250} height={250} />;
                </div>
                {/*footer*/}
                <div className='flex items-center justify-end rounded-b  p-6'>
                  <button
                    className='background-transparent mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none'
                    type='button'
                    onClick={() => onClose()}
                  >
                    Close
                  </button>
                  <button
                    className='mr-1 mb-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600'
                    type='button'
                    onClick={() => onClose()}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='fixed inset-0 z-40 bg-black opacity-25'></div>
        </>
      ) : null}
    </>
  );
};
