import React, { useEffect, useState } from 'react';
import { Form, Grid } from 'semantic-ui-react';

import { useSubstrate } from './substrate-lib';
import { TxButton } from './substrate-lib/components';

import KittyCards from './KittyCards';

export default function Kitties (props) {
  const { api, keyring } = useSubstrate();
  // const accounts = keyring.getPairs();
  const { accountPair } = props;

  const [kittyCnt, setKittyCnt] = useState(0);
  const [kitties, setKitties] = useState([]);
  // The transaction submission status
  const [status, setStatus] = useState('');

  const fetchKittyCnt = () => {
    api.query.kittiesModule.kittiesCount(cnt => {
      const cntNum = cnt.toNumber();
      setKittyCnt(cntNum);
    });
  };

  const fetchKitties = () => {
    const asyncFetch = async () => {
      const kittyIndices = [...Array(kittyCnt).keys()];

      const results = await Promise.all([
        api.query.kittiesModule.kitties.multi(kittyIndices),
        api.query.kittiesModule.kittyOwners.multi(kittyIndices),
        api.query.kittiesModule.kittyPrices.multi(kittyIndices)
      ]);

      const [kittyDnas, kittyOwners, kittyPrices] = results;

      setKitties(kittyDnas.map((dna, ind) => ({
        id: kittyIndices[ind],
        dna: dna.value.toU8a(),
        owner: kittyOwners[ind].toHuman(),
        price: kittyPrices[ind].isSome && kittyPrices[ind].toHuman()
      })));
    };

    asyncFetch();
  };

  useEffect(fetchKittyCnt, [api, keyring]);
  useEffect(fetchKitties, [api, kittyCnt]);

  useEffect(() => {
    console.log('kitties updated', kitties);
  }, [api, kitties]);

  return <Grid.Column width={16}>
    <h1>小毛孩</h1>
    <KittyCards kitties={kitties} />
    <Form style={{ margin: '1em 0' }}>
      <Form.Field style={{ textAlign: 'center' }}>
        <TxButton
          accountPair={accountPair} label='创建小毛孩' type='SIGNED-TX' setStatus={setStatus}
          attrs={{
            palletRpc: 'kittiesModule',
            callable: 'create',
            inputParams: [],
            paramFields: []
          }}
        />
      </Form.Field>
    </Form>
    <div style={{ overflowWrap: 'break-word' }}>{status}</div>
  </Grid.Column>;
}
