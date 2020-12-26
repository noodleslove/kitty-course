import React from 'react';
import { Card, Grid, Message } from 'semantic-ui-react';
import KittyAvatar from './KittyAvatar';

const KittyCard = props => {
  const { kitty: { id, dna, owner, price } } = props;
  const displayDna = dna.join(', ');
  const displayPrice = price || '不出售';

  return <Card>
    <KittyAvatar dna={dna} />
    <Card.Content>
      <Card.Header>ID 号: {id}</Card.Header>
      <Card.Meta style={{ overflowWrap: 'break-word' }}>基因: {displayDna}</Card.Meta>
      <Card.Description>
        <p style={{ overflowWrap: 'break-word' }}>猫奴: {owner}</p>
        <p>{displayPrice}</p>
      </Card.Description>
    </Card.Content>
    <Card.Content extra>

    </Card.Content>
  </Card>;
};

const KittyCards = props => {
  const { kitties } = props;

  if (kitties.length === 0) {
    return <Message info>
      <Message.Header>现在连一只毛孩都木有，赶快创建一只&nbsp;
        <span role='img' aria-label='point-down'>👇</span>
      </Message.Header>
    </Message>;
  }

  return <Grid columns={3}>{kitties.map((kitty, i) =>
    <Grid.Column key={`kitty-${i}`}>
      <KittyCard kitty={kitty}/>
    </Grid.Column>
  )}</Grid>;
};

export default KittyCards;
