import React, { useState, useEffect } from "react";
import {
  FiTrash2,
  FiXCircle,
  FiCheckCircle,
  FiEdit,
  FiList,
  FiSearch,
} from "react-icons/fi";
import { toast } from "react-toastify";
import Modal from "../../components/Modal";
import api from "../../services/api";
import { connect } from "react-redux";
import * as actions from "../../Store/actions/actionCreators";
import "./styles.css";

import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import { Brightness4, Brightness7, Home, Info } from "@material-ui/icons";
import { Tooltip } from "@material-ui/core";

import TodoChips from "../../components/todo-chips";

import { Box, Chip } from "@material-ui/core";
import { pink } from "@material-ui/core/colors";
import todos from "../../Store/reducers/todos";

function Tasks(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [editId, setEditId] = useState(null);

  const total = props.todos.length;
  console.log(props.todos);
  const pending = props.todos.filter((conc) => conc.concluido === 0).length;
  const done = props.todos.filter((conc) => conc.concluido === 1).length;
  // const done = todos.filter((done) => done.concluido === 1).length;

  useEffect(() => {
    api.get("/tarefas").then((response) => {
      props.setTodos(response.data);
    });
  }, []);

  function handleEditTask(id) {
    setEditId(id);
    setIsModalVisible(true);
  }

  async function handleDeleteTask(id) {
    try {
      await api.delete(`/tarefas/${id}`);

      props.deleteTodo(id);
      toast.success("Excluído com sucesso!");
    } catch (err) {
      console.log(err);
      toast.error("Erro! Tente novamente.");
    }
  }

  return (
    <>
      {isModalVisible ? (
        <Modal
          id={editId}
          onClose={() => {
            setIsModalVisible(false);
            setEditId(null);
          }}
        />
      ) : null}
      <div className="task-container">
        <h1>
          <FiList className="list" size={28} color="#FF1493" />
          Lista de Tarefas
          <a
            className="icone-search"
            onClick={() => setIsSearchVisible(!isSearchVisible)}
          >
            <FiSearch size={24} color="#FF1493" />
          </a>
          <AppBar position="fixed">
            <Toolbar>
              <IconButton color="inherit" aria-label="open drawer" edge="start">
                <MenuIcon />
              </IconButton>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <Typography variant="h6" noWrap>
                  Todo app
                </Typography>

                <IconButton onClick={props.changeTheme}>
                  <Tooltip arrow title={"Alterar entre tema escuro e claro"}>
                    {props.type === "dark" ? <Brightness7 /> : <Brightness4 />}
                  </Tooltip>
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
        </h1>

        {isSearchVisible && (
          <section>
            <input
              className="search-input"
              placeholder="Buscar..."
              onChange={(e) => props.todoSearch(e.target.value)}
            />
          </section>
        )}

        <Box style={{display: 'inline'}} p={1}>
          <Box style={{display: 'inline'}} p={0.2}>
            <Chip
              style={{ backgroundColor: pink[700], color: "white" }}
              label={`total: ${total}`}
            />
          </Box>

          <Box style={{display: 'inline'}} p={0.2}>
            <Chip
              style={{ backgroundColor: pink[700], color: "white" }}
              label={`concluido: ${done}`}
            />
          </Box>

          <Box style={{display: 'inline'}} p={0.2}>
            <Chip
              style={{ backgroundColor: pink[700], color: "white" }}
              label={`pendente: ${pending}`}
            />
          </Box>
        </Box>

        <ul>
          {props.todos.map((task) => (
            <li key={task.id}>
              <strong>Título:</strong>
              <p>{task.titulo}</p>

              <strong>Descrição:</strong>
              <p>{task.descricao}</p>

              <strong>Concluído:</strong>
              <p>
                {task.concluido === 0 ? (
                  <FiXCircle size={18} color="#FF0000" />
                ) : (
                  <FiCheckCircle size={18} color="#32CD32" />
                )}
              </p>

              <button
                className="edit"
                onClick={() =>
                  handleEditTask(`${task.id}`, {
                    // id: task.id,
                    title: task.titulo,
                    description: task.descricao,
                    status: task.concluido,
                  })
                }
                // onClick={() =>
                //   push(`/editar/${task.id}`, {
                //     title: task.titulo,
                //     description: task.descricao,
                //     status: task.concluido,
                //   })
                // }
              >
                <FiEdit size={18} color="#FF1493" />
              </button>

              <button onClick={() => handleDeleteTask(task.id)} type="button">
                <FiTrash2 size={18} color="#FF1493" />
              </button>
            </li>
          ))}
        </ul>

        <footer>
          <a className="button" onClick={() => setIsModalVisible(true)}>
            Nova tarefa
          </a>
        </footer>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  console.log("mapStateToProps", state);
  return {
    todos: !state.todos.search
      ? state.todos.data
      : state.todos.data.filter((item) => {
          return (
            item.titulo.includes(state.todos.search) ||
            item.descricao.includes(state.todos.search)
          );
        }),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setTodos(todos) {
      dispatch(actions.addTodo(todos));
    },
    deleteTodo(id) {
      dispatch(actions.deleteTodo(id));
    },
    todoSearch(value) {
      dispatch(actions.todoSearch(value));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
