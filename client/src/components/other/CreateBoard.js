import React, {useContext, useState} from 'react';
import {Modal, TextField, Button} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from '../../utils/modalStyles';
import {BoardContext} from "../../contexts/boardStore";

const CreateBoard = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const {addBoard} = useContext(BoardContext);

    const onSubmit = (e) => {
        e.preventDefault();
        addBoard({title});
    };

    const onChange = (e) => {
        setTitle(e.target.value)
    }

    const body = (
        <div className={`${classes.paper} ${classes.createBoardModal}`}>
            <div className={classes.modalTop}>
                <h1>Create new board</h1>
                <Button onClick={() => setOpen(false)}>
                    <CloseIcon/>
                </Button>
            </div>
            <form onSubmit={onSubmit}>
                <TextField
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    label='Add board title'
                    autoFocus
                    value={title}
                    onChange={onChange}
                />
                <Button type='submit' fullWidth variant='contained' color='primary'>
                    Create Board
                </Button>
            </form>
        </div>
    );

    return (
        <div>
            <button className='board-card create-board-card' onClick={() => setOpen(true)}>
                Create new board
            </button>
            <Modal open={open} onClose={() => setOpen(false)}>
                {body}
            </Modal>
        </div>
    );
};

export default CreateBoard;
