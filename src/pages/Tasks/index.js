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

import { connect } from 'react-redux';
import { addTodo } from '../../Store/actions/actionCreators';

import "./styles.css";

function Tasks() {
  const [listTasks, setListTasks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [editData, setEditData] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    setFiltered(listTasks)
  }, [listTasks]);

  useEffect(() => {
    api.get("/tarefas").then((response) => {
      setListTasks(response.data);
    });


  }, [isModalVisible]);

  function todasTasks(palavra) {
    listTasks.map((listTask) => {
      console.log(listTask.titulo.includes(palavra));
    });
  }

  function handleNewTask() {
    setEditData([]);
    setIsModalVisible(true);
  }

  function handleEditTask(id, data) {
    setEditData({ id, ...data });
    setIsModalVisible(true);
  }

  async function handleDeleteTask(id) {
    try {
      await api.delete(`/tarefas/${id}`);
      toast.success("Excluído com sucesso!");

      setListTasks(listTasks.filter((task) => task.id !== id));
    } catch (err) {
      toast.error("Erro! Tente novamente.");
    }
  }

  return (
    <>
      {isModalVisible ? (
        <Modal dados={editData} onClose={() => setIsModalVisible(false)} />
      ) : null}
      <div className="task-container">
        <h1>
          <FiList className="list" size={28} color="#FF1493" />
          Lista de Tarefas
          <a
            className="icone-search"
            onClick={() => setIsSearchVisible(!isSearchVisible)}
          >
            <FiSearch size={24} color="#FF1493"/>
          </a>
        </h1>

        {isSearchVisible && (
          <section>
            <input
              className="search-input"
              placeholder="Buscar..."
              onChange={(e) => todasTasks(e.target.value)}
            />
          </section>
        )}

        <ul>
          {filtered.map((task) => (
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
          <a className="button" onClick={() => handleNewTask()}>
            Nova tarefa
          </a>
        </footer>
      </div>
    </>
  );
}
 
function mapStateToProps(state) { 
  console.log(state)
  return {
    Modal: state.tabela,
  }
}

function mapDispatchToProps(dispatch) { 
  return { 
    addTodosLista(novoNumero) {
      //action creator => action
      const action = addTodo(novoNumero)
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);