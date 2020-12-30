import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.scss";
import FormEdit from "./ModalEdit";
import FormAdd from "./ModalAdd";
import { FaDollarSign } from "react-icons/fa";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

function Home() {
  const [smShow, setSmShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
// -----------------states---------------------
  const [balance, setBalance] = useState([]);
  const [add, setAdd] = useState({ concept: "", amount: "", type: "" });
  const [id, setId] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/balance`)
      .then((response) => {
        const totalAmount = response.data.reduce(
          (accumalator, currVal) =>
            currVal.type === "2" ? accumalator + parseInt(currVal.amount) : Math.abs(accumalator - parseInt(currVal.amount)), 0
        );

        const lastTen = response.data.slice(-10);
        setBalance(lastTen);
        setNumber(totalAmount);
      })
      .catch((err) => {
        console.log(err, "este error");
      });
  }, [balance]);
// -----------------onchange---------------------
  function onChange(e) {
    setAdd({
      ...add,
      [e.target.name]: e.target.value,
    });
  }


// -----------------delete---------------------
  const deletebalance = (id) => {
    const arrayFiltrado = balance.filter((item) => item.id !== id);
    const url = `http://localhost:4000/balance/${id}`;
    axios
      .delete(url)
      .then(() => {
        setBalance(arrayFiltrado);
      })
      .catch(console.log("erroor"));
  };
// -----------------take edit---------------------
  const edit = (item) => {
    setAdd({ concept: item.concept, amount: item.amount });
    setId(item.id);
    setSmShow(true);
  };
// -----------------edit final---------------------
  const editbalance = () => {
    var val = {
      concept: add.concept,
      amount: add.amount,
    };
    var pro = balance;
    const url = `http://localhost:4000/balance/${id}`;
    balance.map((pros, i) => {
      if (pros.id === id) {
        pro.splice(i, 1, val);
        axios
          .put(url, {
            concept: add.concept,
            amount: add.amount,
          })
          .then(() => {
            setId("");
            setAdd({ concept: "", amount: ""});
            setSmShow(false);
          })
          .catch(console.log('erroredit'));
      }
      return 0;
    });
  };

  return (
    <div className="Home">
      <div className="home-balance">
        <div className="home-amount">
          <FaDollarSign className="icon-dollar" />
          <p>{number}</p>
        </div>
        <p>Your balance</p>
      </div>
      <MDBContainer>
        {balance.map((b) => (
          <MDBRow key={b.id}>
            <MDBCol size="12" className="list-home-col">
              <div className="list-home-div">
                {b.type === "1" ? (
                  <BsArrowUp className="arrow-up-icon" />
                ) : (
                  <BsArrowDown className="arrow-down-icon" />
                )}

                <FiEdit onClick={() => edit(b)} className="detail-icon" />
                <AiFillDelete
                  className="delete-icon"
                  onClick={() => deletebalance(b.id)}
                />
                <p className="date">{b.createdAt}</p>

                <MDBRow>
                  <MDBCol>
                    <h5>{b.concept}</h5>
                  </MDBCol>
                  <MDBCol>
                    <h5>$ {b.amount}</h5>
                  </MDBCol>
                </MDBRow>
              </div>
            </MDBCol>
          </MDBRow>
        ))}
      </MDBContainer>
      <div className="button-div-add">
        <MDBBtn
          color="primary"
          className="button-add"
          onClick={() => setModalShow(true)}
        >
          Add Operation
        </MDBBtn>
      </div>
{/* -------------------Modals---------------------------    */}
      <FormEdit
        show={smShow}
        onHide={() => setSmShow(false)}
        editbalance={editbalance}
        onChange={onChange}
        add={add}
      />
      <FormAdd
        show={modalShow}
        onHide={() => setModalShow(false)}
        onChange={onChange}
        add={add}
        setModalShow={setModalShow}
      />
    </div>
  );
}
export default Home;
