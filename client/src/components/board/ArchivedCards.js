import React, {useContext} from 'react';

import {Card, List, ListItem, CardContent, Button} from '@material-ui/core';
import {BoardContext} from "../../contexts/boardStore";

const ArchivedCards = () => {
    const {board: {board: {cardObjects, listObjects}}, deleteCard, archiveCard} = useContext(BoardContext);

    const onDelete = (listId, cardId) => deleteCard(listId, cardId);


    const onSendBack = (cardId) => archiveCard(cardId, false);

    return (<div>¬
        <List>
            {cardObjects
                .filter((card) => card.archived)
                .map((card, index) => (<ListItem key={index} className='archived-card'>
                    <Card>
                        <CardContent>{card.title}</CardContent>
                    </Card>
                    <div>
                        <Button
                            color='secondary'
                            onClick={() => onDelete(listObjects.find((list) => list.cards.includes(card._id))._id, card._id)}
                        >
                            Delete Card
                        </Button>
                        <Button onClick={() => onSendBack(card._id)}>Send to List</Button>
                    </div>
                </ListItem>))}
        </List>
    </div>);
};

export default ArchivedCards;
