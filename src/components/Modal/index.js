import React, {useState} from "react";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";

import api from "../../services/api";
import * as actions from '../../Store/actions/actionCreators';


import "./styles.css";

import { connect } from "react-redux";
import { addTodo } from '../../Store/actions/actionCreators';

   
const Modal = ({id = "modal", onClose = () => {}, children, todo, ...props }) => {
 
  console.log(todo)
  const [title, setTitle] = useState(todo ? todo.titulo : '');
  const [description, setDescription] = useState(todo ? todo.descricao : '');
  const [status, setStatus] = useState(todo ? todo.concluido : '');

  const handleOutsideClose = (e) => {
    if (e.target.id === id) onClose();
  };

  async function handleNewTask(e) {
    e.preventDefault();

      const dataToSendApi = {
        titulo: title,
        descricao: description,
        concluido: status,
      }


    try {
      if (id){
        await api.put(`/tarefas/${id}`);
        props.editTodo(dataToSendApi, id)
        toast.success("Tarefa Alterada com sucesso!");
      } else {
        const {data} = await api.post("/tarefas", dataToSendApi);
        props.addTodo(data)
        toast.success("Tarefa cadastrada com sucesso!");
      }
    } catch (err) {
      console.log(err)
      toast.error("Erro! Tente novamente.");
    }
    onClose();
  }

    return (
      <div className="new-task-container" id={id} onClick={handleOutsideClose}>
        <div className="content">
          <button className="close" onClick={onClose}>
            <FiX size={32} color="#FF1493" />
            {children}
          </button>

          <form onSubmit={handleNewTask}>
            <input
              placeholder="Título"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />

            <textarea
              placeholder="Descrição"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />

            {/* RADIO BUTTON */}

             <FormControl component="fieldset">
              <FormLabel component="legend">Concluido</FormLabel>
              <RadioGroup value={String(status)} onChange={(e) => setStatus(e.target.value)}>
                <FormControlLabel value="1" control={<Radio />} label="Sim" />
                <FormControlLabel value="0" control={<Radio />} label="Não" />
              </RadioGroup>
            </FormControl>

            {/* <SELECT></SELECT> */}

            {/* <select onChange={(e) => setStatus(e.target.value)}>
              <option value="" >Concluido</option>
              <option value="1">
                Sim
              </option>
              <option value="0">
                Não
              </option>
            </select> */}


              <button className="button">
                {id ? 'Salvar alterações' : 'Cadastrar'}
              </button>

          </form>
        </div>
      </div>
    );
  };

function mapStateToProps(state, props){
  return { 
    todo: state.todos.data.find(task => task.id === Number(props.id))
  }
}

function mapDispatchToProps(dispatch) { 
  return { 
    addTodo(todo){
      dispatch(actions.addTodo([todo]))
    },
    editTodo(todo, id){
      dispatch(actions.editTodo(todo, id))
    },

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
