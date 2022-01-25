import React, {createContext, useContext, useReducer} from 'react';
import reducer, {initialState} from "../reducers/board";
import {
    ADD_BOARD,
    ADD_CARD,
    ADD_CARD_MEMBER,
    ADD_CHECKLIST_ITEM,
    ADD_LIST,
    ADD_MEMBER,
    ARCHIVE_CARD,
    ARCHIVE_LIST,
    BOARD_ERROR,
    CLEAR_BOARD,
    COMPLETE_CHECKLIST_ITEM,
    DELETE_CARD,
    DELETE_CHECKLIST_ITEM,
    EDIT_CARD,
    EDIT_CHECKLIST_ITEM,
    GET_ACTIVITY,
    GET_BOARD,
    GET_BOARDS,
    GET_CARD,
    GET_LIST,
    MOVE_CARD,
    MOVE_LIST,
    RENAME_BOARD,
    RENAME_LIST
} from "../actions/types";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "./authStore";

export const BoardContext = createContext({})

const BoardStore = (props) => {
    const [board, dispatch] = useReducer(reducer, initialState);
    const {setAlert} = useContext(AuthContext)
    const navigate = useNavigate();


    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const getBoards = async () => {
        try {
            dispatch({type: CLEAR_BOARD});

            const res = await axios.get('/api/boards');

            dispatch({
                type: GET_BOARDS,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: BOARD_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status},
            });
        }
    };
    const getBoard = async (id) => {
        try {
            const res = await axios.get(`/api/boards/${id}`);

            if (res) {
                axios.defaults.headers.common['boardId'] = id;
            } else {
                delete axios.defaults.headers.common['boardId'];
            }

            dispatch({
                type: GET_BOARD,
                payload: {...res.data, listObjects: [], cardObjects: []},
            });
        } catch (err) {
            dispatch({
                type: BOARD_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status},
            });
        }
    };
    const getActivity = async () => {
        try {
            const boardId = axios.defaults.headers.common['boardId'];

            const res = await axios.get(`/api/boards/activity/${boardId}`);

            dispatch({
                type: GET_ACTIVITY,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: BOARD_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status},
            });
        }
    };
    const addBoard = async (formData) => {
        try {

            const body = JSON.stringify(formData);

            const res = await axios.post('/api/boards', body, config);

            dispatch({
                type: ADD_BOARD,
                payload: res.data,
            });

            setAlert('Board Created', 'success');
            navigate(`/board/${res.data._id}`);

        } catch (err) {
            dispatch({
                type: BOARD_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status},
            });
        }
    };
    const renameBoard = async (boardId, formData) => {
        try {
            const res = await axios.patch(`/api/boards/rename/${boardId}`, formData, config);

            dispatch({
                type: RENAME_BOARD,
                payload: res.data,
            });

            await getActivity();
        } catch (err) {
            dispatch({
                type: BOARD_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status},
            });
        }
    };
    const getList = async (id) => {
        try {
            const res = await axios.get(`/api/lists/${id}`);

            dispatch({
                type: GET_LIST,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: BOARD_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status},
            });
        }
    };
    const addList = async (formData) => {
        try {
            const body = JSON.stringify(formData);

            const res = await axios.post('/api/lists', body, config);

            dispatch({
                type: ADD_LIST,
                payload: res.data,
            });

            await getActivity();
        } catch (err) {
            dispatch({
                type: BOARD_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status},
            });
        }
    };
    const renameList = async (listId, formData) => {
        try {
            const res = await axios.patch(`/api/lists/rename/${listId}`, formData, config);

            dispatch({
                type: RENAME_LIST,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: BOARD_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status},
            });
        }
    };
    const archiveList = async (listId, archive) => {
        try {
            const res = await axios.patch(`/api/lists/archive/${archive}/${listId}`);

            dispatch({
                type: ARCHIVE_LIST,
                payload: res.data,
            });

            await getActivity();
        } catch (err) {
            dispatch({
                type: BOARD_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status},
            });
        }
    };
    const getCard = async (id) => {
        try {
            const res = await axios.get(`/api/cards/${id}`);

            dispatch({
                type: GET_CARD,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: BOARD_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status},
            });
        }
    };
    const addCard = async (formData) => {
        try {
            const body = JSON.stringify(formData);

            const res = await axios.post('/api/cards', body, config);

            dispatch({
                type: ADD_CARD,
                payload: res.data,
            });

            await getActivity();
        } catch (err) {
            dispatch({
                type: BOARD_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status},
            });
        }
    };
    const editCard = async (cardId, formData) => {
        try {
            const res = await axios.patch(`/api/cards/edit/${cardId}`, formData, config);

            dispatch({
                type: EDIT_CARD,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: BOARD_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status},
            });
        }
    };
    const moveCard = async (cardId, formData) => {
        try {
            const body = JSON.stringify(formData);

            const res = await axios.patch(`/api/cards/move/${cardId}`, body, config);

            dispatch({
                type: MOVE_CARD,
                payload: res.data,
            });

            await getActivity();
        } catch (err) {
            dispatch({
                type: BOARD_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status},
            });
        }
    };
    const archiveCard = async (cardId, archive) => {
        try {
            const res = await axios.patch(`/api/cards/archive/${archive}/${cardId}`);

            dispatch({
                type: ARCHIVE_CARD,
                payload: res.data,
            });

            await getActivity();
        } catch (err) {
            dispatch({
                type: BOARD_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status},
            });
        }
    };
    const deleteCard = async (listId, cardId) => {
        try {
            const res = await axios.delete(`/api/cards/${listId}/${cardId}`);

            dispatch({
                type: DELETE_CARD,
                payload: res.data,
            });

            await getActivity();
        } catch (err) {
            dispatch({
                type: BOARD_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status},
            });
        }
    };
    const addMember = (userId) => async (dispatch) => {
        try {
            const res = await axios.put(`/api/boards/addMember/${userId}`);

            dispatch({
                type: ADD_MEMBER,
                payload: res.data,
            });

            await getActivity();
        } catch (err) {
            dispatch({
                type: BOARD_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status},
            });
        }
    };
    const moveList = async (listId, formData) => {
        const prevState = {...board}
        try {
            const body = JSON.stringify(formData);

            const tempState = [...board.board.lists]
            tempState.splice(tempState.indexOf(listId), 1);
            tempState.splice(formData.toIndex, 0, listId);

            dispatch({
                type: MOVE_LIST,
                payload: [...tempState],
            });
            const res = await axios.patch(`/api/lists/move/${listId}`, body, config);

        } catch (err) {
            setAlert('Could not move boards', 'error');
            dispatch({
                type: BOARD_ERROR,
                payload: {error: {msg: err.response.statusText, status: err.response.status}, prevState},
            });
        }
    };
    const addCardMember = async (formData) => {
        try {
            const {add, cardId, userId} = formData;

            const res = await axios.put(`/api/cards/addMember/${add}/${cardId}/${userId}`);

            dispatch({
                type: ADD_CARD_MEMBER,
                payload: res.data,
            });

            await getActivity();
        } catch (err) {
            dispatch({
                type: BOARD_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status},
            });
        }
    };
    const addChecklistItem = async (cardId, formData) => {
        try {
            const body = JSON.stringify(formData);

            const res = await axios.post(`/api/checklists/${cardId}`, body, config);

            dispatch({
                type: ADD_CHECKLIST_ITEM,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: BOARD_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status},
            });
        }
    };
    const editChecklistItem = async (cardId, itemId, formData) => {
        try {
            const body = JSON.stringify(formData);

            const res = await axios.patch(`/api/checklists/${cardId}/${itemId}`, body, config);

            dispatch({
                type: EDIT_CHECKLIST_ITEM,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: BOARD_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status},
            });
        }
    };
    const completeChecklistItem = async (formData) => {
        try {
            const {cardId, complete, itemId} = formData;

            const res = await axios.patch(`/api/checklists/${cardId}/${complete}/${itemId}`);

            dispatch({
                type: COMPLETE_CHECKLIST_ITEM,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: BOARD_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status},
            });
        }
    };
    const deleteChecklistItem = async (cardId, itemId) => {
        try {
            const res = await axios.delete(`/api/checklists/${cardId}/${itemId}`);

            dispatch({
                type: DELETE_CHECKLIST_ITEM,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: BOARD_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status},
            });
        }
    };

    return (<BoardContext.Provider
        value={{
            board,
            getBoards,
            getBoard,
            addBoard,
            renameBoard,
            getList,
            addList,
            renameList,
            archiveList,
            getCard,
            addCard,
            editCard,
            moveCard,
            archiveCard,
            deleteCard,
            addMember,
            moveList,
            addCardMember,
            addChecklistItem,
            editChecklistItem,
            completeChecklistItem,
            deleteChecklistItem
        }}>
        {props.children}
    </BoardContext.Provider>)

}

export default BoardStore;