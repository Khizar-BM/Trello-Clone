import React, {useContext, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import CreateBoard from '../other/CreateBoard';
import Navbar from '../other/Navbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import {AuthContext} from "../../contexts/authStore";
import {BoardContext} from "../../contexts/boardStore";

const Dashboard = () => {
    const {auth: {isAuthenticated}, user} = useContext(AuthContext);
    const {board: {boards, dashboardLoading}, getBoards} = useContext(BoardContext);
    const navigate = useNavigate();

    useEffect(() => {
        getBoards();
    }, []);

    useEffect(() => {
        document.title = 'Your Boards | TrelloClone';
    }, []);

    useEffect(() => {
        if (!isAuthenticated) navigate("/");
    }, [isAuthenticated])

    return (<div className='dashboard-and-navbar'>
        <Navbar/>
        <section className='dashboard'>
            <h1>Welcome {user && user.name}</h1>
            <h2>Your Boards</h2>
            {dashboardLoading && <CircularProgress className='dashboard-loading'/>}
            <div className='boards'>
                {boards.map((board) => (<Link key={board._id} to={`/board/${board._id}`} className='board-card'>
                    {board.title}
                </Link>))}
                <CreateBoard/>
            </div>
        </section>
    </div>);
};

export default Dashboard;
