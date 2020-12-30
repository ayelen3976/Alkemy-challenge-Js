import React from "react";
import { Modal } from "react-bootstrap";
import { MDBInput, MDBBtn } from "mdbreact";
import "mdbreact/dist/css/mdb.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ModalEdit.scss";
function FormEdit(props) {
  return (
    <div>
      <Modal
        size="sm"
        {...props}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Edit Operation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>you can only edit the concept and amount!</p>
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
          <MDBBtn
            color="primary"
            className="button-add"
            onClick={props.editbalance}
          >
            Edit Operation
          </MDBBtn>
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default FormEdit;
