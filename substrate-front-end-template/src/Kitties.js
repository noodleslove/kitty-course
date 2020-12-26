import React, { useEffect, useState } from 'react';
import { Form, Input, Grid, Label, Icon } from 'semantic-ui-react';

import { useSubstrate } from './substrate-lib';
import KittyCards from './KittyCards';

export default function Kitties (props) {
  const { api, keyring } = useSubstrate();
  const accounts = keyring.getPairs();

  const [kittyCnt, setKittyCnt] = useState(0);
  const [kitties, setKitties] = useState([]);

  const fetchKittyCnt = () => {
    api.query.kittiesModule.kittiesCount(cnt => {
      const cntNum = cnt.toNumber();
      setKittyCnt(cntNum);
    });
  };

  const fetchKitties = () => {
    const kittyIndices = [...Array(kittyCnt).keys()];
    api.query.kittiesModule.kitties.multi(kittyIndices, kitties => {
      setKitties(kitties.map((kitty, ind) => ({
        id: ind,
        dna: kitty.toU8a()
      })));
    });
  };

  useEffect(fetchKittyCnt, [api, keyring]);
  useEffect(fetchKitties, [api, kittyCnt]);

  useEffect(() => {
    console.log('kitties:', kitties);
  }, [kitties]);

  return <Grid.Column width={16}>
    <h1>小毛孩</h1>
    <KittyCards kitties={kitties} />
  </Grid.Column>;
}
