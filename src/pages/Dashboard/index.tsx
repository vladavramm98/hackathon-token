import * as React from 'react';
import axios from 'axios';
import Actions from './Actions';
import TopInfo from './TopInfo';
import Transactions from './Transactions';

const Dashboard = () => {
  // GET TOKENS
  // const address =
  //   'erd1aglumftu3zm6dmvktvxm39dzt06q38ja5ng9sz7evrymxrc6k4gsudm2hd';
  // const data = axios.get(
  //   `https://devnet-api.elrond.com/accounts/${address}/tokens`
  // );
  // data.then((res) => console.log(res)).catch((err) => console.log(err));

  // SEND TRANSACTION
  const fs = require('fs');
  const core = require('@elrondnetwork/elrond-core-js');

  const keyFileJson = fs
    .readFileSync('myWallet.json', { encoding: 'utf8' })
    .trim();
  const keyFileObject = JSON.parse(keyFileJson);

  const account = new core.account();
  account.loadFromKeyFile(keyFileObject, 'passwordOfMyWallet');

  const transaction = new core.transaction(
    42, // nonce
    'erd1...', // sender
    'erd1...', // receiver
    '100000000000000000', // value
    1000000000, // gas price
    70000, // gas limit
    'food for cats', // data (not encoded)
    '1', // chain ID
    1 // tx version
  );

  const serializedTransaction = transaction.prepareForSigning();
  transaction.signature = account.sign(serializedTransaction);
  const signedTransaction = transaction.prepareForNode();
  const signedTransactionJson = JSON.stringify(signedTransaction, null, 4);

  const payload = {
    sender: 'erd1aglumftu3zm6dmvktvxm39dzt06q38ja5ng9sz7evrymxrc6k4gsudm2hd',
    receiver: 'erd1n0pgm04lp7hl2zx5jqrre26dj4wuge94vp4pz665q3lhh5qpm3sqkdlyvh',
    chainID: 'D',
    nonce: 1,
    value: '1',
    gasPrice: 0,
    gasLimit: 0,
    version: 1
    // signature:
  };
  const test = axios.post(
    'https://gateway.elrond.com/transaction/send',
    payload
  );

  test.then((res) => console.log(res)).catch((err) => console.log(err));

  return (
    <div className='container py-4'>
      <div className='row'>
        <div className='col-12 col-md-10 mx-auto'>
          <div className='card shadow-sm rounded border-0'>
            <div className='card-body p-1'>
              <div className='card rounded border-0 bg-primary'>
                <div className='card-body text-center p-4'>
                  <TopInfo />
                  <Actions />
                </div>
              </div>
              <Transactions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
