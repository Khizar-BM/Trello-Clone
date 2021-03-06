import React, {useContext, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {CircularProgress, Box} from '@material-ui/core';
import BoardTitle from '../board/BoardTitle';
import BoardDrawer from '../board/BoardDrawer';
import List from '../list/List';
import CreateList from '../board/CreateList';
import Members from '../board/Members';
import Navbar from '../other/Navbar';
import {BoardContext} from "../../contexts/boardStore";
import {AuthContext} from "../../contexts/authStore";

const Board = () => {
    const params = useParams();
    const {board: {board}, getBoard, moveCard, moveList} = useContext(BoardContext);
    const {auth: {isAuthenticated}} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        getBoard(params.id);
    }, [params.id]);

    useEffect(() => {
        if (board?.title) document.title = board.title + ' | TrelloClone';
    }, [board?.title]);

    useEffect(() => {
            if (!isAuthenticated) {
                navigate("/");
            }
        }, [isAuthenticated]
    )

    const onDragEnd = (result) => {
        const {source, destination, draggableId, type} = result;
        if (!destination) {
            return;
        }
        if (type === 'card') {
            moveCard(draggableId, {
                fromId: source.droppableId,
                toId: destination.droppableId,
                toIndex: destination.index,
            });
        } else {
            moveList(draggableId, {toIndex: destination.index});
        }
    };

    return !board ? (
        <>
            <Navbar/>
            <Box className='board-loading'>
                <CircularProgress/>
            </Box>
        </>
    ) : (
        <div
            className='board-and-navbar'
            style={{
                backgroundImage:
                    'url(' +
                    (board.backgroundURL
                        ? board.backgroundURL
                        : 'https://images.unsplash.com/photo-1598197748967-b4674cb3c266?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2689&q=80') +
                    ')',
            }}
        >
            <Navbar/>
            <section className='board'>
                <div className='board-top'>
                    <div className='board-top-left'>
                        <BoardTitle board={board}/>
                        <Members/>
                    </div>
                    <BoardDrawer/>
                </div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId='all-lists' direction='horizontal' type='list'>
                        {(provided) => (
                            <div className='lists' ref={provided.innerRef} {...provided.droppableProps}>
                                {board.lists.map((listId, index) => (
                                    <List key={listId} listId={listId} index={index}/>
                                ))}
                                {provided.placeholder}
                                <CreateList/>
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </section>
        </div>
    );
};

export default Board;
