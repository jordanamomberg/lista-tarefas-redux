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

import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function Tasks(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [editId, setEditId] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    api.get("/tarefas").then((response) => {
      props.setTodos(response.data);
    });
  }, []);

  function handleEditTask(id) {
    setEditId(id);
    setIsModalVisible(true);
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
      {/* <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Lista Tarefas
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={(e) => props.todoSearch(e.target.value)}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Toolbar>
      </AppBar> */}

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
        </h1>

        {isSearchVisible && (
          <section>
            <input
              className="search-input"
              placeholder="Buscar..."
              // onChange={(e) => todasTasks(e.target.value)}
              onChange={(e) => props.todoSearch(e.target.value)}
            />
          </section>
        )}

        {/* {isSearchVisible && (
          <section>
            <input
              className="search-input"
              placeholder="Buscar..."
              onChange={(e) => todasTasks(e.target.value)}
            />
          </section>
        )} */}

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
