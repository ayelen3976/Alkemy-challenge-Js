import React from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { MDBInput, MDBBtn } from "mdbreact";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./ModalAdd.scss";

function FormAdd(props) {
  const addoperation = () => {
    axios({
      method: "post",
      url: `http://localhost:4000/balance`,
      data: {
        concept: props.add.concept,
        amount: props.add.amount,
        type: props.add.type,
      },
    })
      .then(() => {
      
        props.setAdd({ concept: "", amount: "", type: "" });
      })
      .catch(console.log);
  };

  function onClick() {
    addoperation();
    props.setModalShow(false);
  }
  return (
    <div>
      <Modal
        size="sm"
        {...props}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Add Operation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MDBInput
            label="Concept"
            name="concept"
            outline
            size="lg"
            onChange={props.onChange}
            value={props.add.concept}
          />
          <MDBInput
            label="Amount"
            name="amount"
            outline
            size="lg"
            onChange={props.onChange}
            value={props.add.amount}
          />
          <select
            className="browser-default custom-select select-input"
            name="type"
            onChange={props.onChange}
            value={props.add.type}
          >
            <option>Choose your option</option>
            <option value="1">deposit</option>
            <option value="2">receive</option>
          </select>
          <MDBBtn color="primary" className="button-add" onClick={onClick}>
            Add Operation
          </MDBBtn>
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default FormAdd;
