import React from 'react';
import {Box, Chip} from '@material-ui/core';
import {pink} from '@material-ui/core/colors';
import {connect} from "react-redux";
import Tasks from '../../../src/pages/Tasks'


const TodoChips = () => {
    const {todos} = todos;
    const total = todos.length;
    const pending = todos.filter((t) => !t.concluido).length;
    const done = todos.filter((t) => t.concluido).length;
    return (
        <Box style={{display: 'inline'}} p={1}>
            <Box style={{display: 'inline'}} p={0.2}>
                <Chip color="secondary" label={`total: ${total}`}/>
            </Box>
            <Box style={{display: 'inline'}} p={0.2}>
                <Chip
                    style={{backgroundColor: pink[700], color: 'white'}}
                    color="secondary"
                    label={`pendente: ${pending}`}
                />
            </Box>
            <Box style={{display: 'inline'}} p={0.2}>
                <Chip color="primary" label={`concluido: ${done}`}/>
            </Box>

        </Box>
    );
};


function mapStateToProps(state) {
    return {
    todos: state.todoReducer.search === '' ? state.todoReducer.todos : state.todoReducer.todoSearchResult }
};

export default connect(mapStateToProps)(TodoChips);
