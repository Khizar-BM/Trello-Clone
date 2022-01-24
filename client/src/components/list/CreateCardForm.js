import React, {useRef, useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import {Card, CardContent, TextField, Button} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {BoardContext} from "../../contexts/boardStore";

const CreateCardForm = ({listId, setAdding}) => {
    const [title, setTitle] = useState('');
    const {addCard} = useContext(BoardContext);

    const formRef = useRef(null);
    useEffect(() => {
        formRef && formRef.current && formRef.current.scrollIntoView();
    }, [title]);

    const onSubmit = (e) => {
        e.preventDefault();
        addCard({title, listId});
        setTitle('');
    };

    return (<form ref={formRef} className='create-card-form' onSubmit={onSubmit}>
        <Card>
            <CardContent className='card-edit-content'>
                <TextField
                    margin='normal'
                    fullWidth
                    multiline
                    required
                    label='Enter a title for this card'
                    autoFocus
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && onSubmit(e)}
                />
            </CardContent>
        </Card>
        <div className='card-actions'>
            <Button type='submit' variant='contained' color='primary'>
                Add Card
            </Button>
            <Button
                onClick={() => {
                    setAdding(false);
                    setTitle('');
                }}
            >
                <CloseIcon/>
            </Button>
        </div>
    </form>);
};

CreateCardForm.propTypes = {
    listId: PropTypes.string.isRequired, setAdding: PropTypes.func.isRequired,
};

export default CreateCardForm;
