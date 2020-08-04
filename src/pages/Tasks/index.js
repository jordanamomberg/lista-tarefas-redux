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

function Tasks(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    api.get("/tarefas").then((response) => {
      this.props.setTodos(response.data);
    });
  }, []);

  function handleEditTask(id) {
    setEditId(id);
    setIsModalVisible(true);
  }

  async function handleDeleteTask(id) {
    try {
      await api.delete(`/tarefas/${id}`);

      this.props.deleteTodo(id);
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
        </h1>

        {isSearchVisible && (
          <section>
            <input
              className="search-input"
              placeholder="Buscar..."
              onChange={(e) => this.props.todoSearch(e.target.value)}
            />
          </section>
        )}

        <ul>
          {this.props.todos.map((task) => (
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
