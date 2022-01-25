import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Menu, MenuItem} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import MoveList from './MoveList';
import {BoardContext} from "../../contexts/boardStore";

const ListMenu = ({listId}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const {archiveList} = useContext(BoardContext);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const archive = () => archiveList(listId, true);

    return (
        <div>
            <Button onClick={handleClick}>
                <MoreHorizIcon/>
            </Button>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>
                    <MoreHorizIcon/>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        archive();
                        handleClose();
                    }}
                >
                    Archive This List
                </MenuItem>
                <MenuItem>
                    <MoveList listId={listId} closeMenu={handleClose}/>
                </MenuItem>
            </Menu>
        </div>
    );
};

ListMenu.propTypes = {
    listId: PropTypes.string.isRequired,
};

export default ListMenu;
