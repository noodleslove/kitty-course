import React from 'react';
import { Card } from 'semantic-ui-react';
import KittyAvatar from './KittyAvatar';

const KittyCard = props => {
  const { kitty: { dna } } = props;

  return <Card>
    <KittyAvatar dna={dna} />
    <Card.Content>
      <Card.Header>some kitty ID</Card.Header>
      <Card.Meta>DNA: {dna}</Card.Meta>
      <span>kitty owner</span>
    </Card.Content>
    <Card.Content extra>
      <span>300 DOT</span>
    </Card.Content>
  </Card>;
};

const KittyCards = props => {
  const { kitties } = props;
  return <div className="ui stackable six column grid">{kitties.map((kitty, i) =>
    <KittyCard kitty={kitty} key={`kitty-${i}`} />
  )}</div>;
};

export default KittyCards;
