import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addList } from '../../actions/board';
import { TextField, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const CreateBoard = () => {
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(addList({ title }));
    setTitle('');
    setAdding(false);
  };

  return !adding ? (
    <div className='create-list-button'>
      <Button variant='contained' color='primary' onClick={() => setAdding(true)}>
        Add a list
      </Button>
    </div>
  ) : (
    <div className='create-list-form'>
      <form onSubmit={(e) => onSubmit(e)}>
        <TextField
          variant='outlined'
          margin='normal'
          required
          id='title'
          label='Enter list title'
          name='title'
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div>
          <Button type='submit' variant='contained' color='primary'>
            Add List
          </Button>
          <Button onClick={() => setAdding(false)}>
            <CloseIcon />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateBoard;