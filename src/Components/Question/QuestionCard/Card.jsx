import React, { useContext, useRef, useState } from "react";
import Person3Icon from "@mui/icons-material/Person3";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import classes from "./questioncard.module.css";
import { Link, useParams } from "react-router-dom";
import Images from "../../Constant/Images/Images";
import { propics } from "../../Constant/Images/Images";
// console.log(propics[1])
import { GoTrash } from "react-icons/go";
import { MdEdit } from "react-icons/md";
import { CiShoppingTag } from "react-icons/ci";
import { AppState } from "../../../Router";
import axios from "../../../Utility/axios";
import ans from "../../../assets/Image/businessman-holds-house-keys_1401-31.jpg";
import { ThreeDots } from 'react-loader-spinner'

const Card = ({ info, questionId, ansCount, Tag }) => {
  // console.log(info)
  const { title, username, answer, questionid, answerid, num_answers } = info;
  let index = Math.floor(Math.random() * 2);
  const { answerdetail } = useParams();
  const { user } = useContext(AppState);
  const menuRef = useRef(null);
  const [updatedanswer, setUpdatedAnswer] = useState(answer);
  const [updatedAns, setUpdatedAnsFlag] = useState(false);
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const ansUpdateRef = useRef(null);
  const [warn, setWarning] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [spin, setSpin] = useState(false);

  const urlUpdate = `/answers/update/${answerdetail}`;

  //   console.log(urlVariable)
  //   console.log(updatedanswer)
  //   console.log(urlVariable)
  // console.log('legeba nw')
  async function UpdateAnswer(e) {
    // console.log(answerid)
    // console.log('first')
    e.preventDefault();

    if (!updatedanswer) {
      ansUpdateRef.current.placeholder = "Bado Meles masgebat atchelem Lol";
      ansUpdateRef.current.style.border = "2px inset lightcoral";
      return;
    }

    //    console.log('updated answer on the way')
    try {
      setSpin(true);
      await axios.put(
        urlUpdate,
        {
          newAnswer: updatedanswer,
          AID: answerid,
        },

        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setTimeout(() => {
      window.location.reload(); 
      setSpin(false);

      }, 3000);
    } catch (error) {
      console.log(error);
      setSpin(false);
    }
  }

  const DeleteAnswer = async () => {
    //     console.log(answerid)
    //     console.log('first')

    try {
      setSpin(true);
      setWarning(false)
      const urlDelete = `/answers/delete/${answerdetail}/${answerid}`;

      await axios.delete(urlDelete, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setTimeout(() => {
        window.location.reload();
        setSpin(false);
      }, 5000);
    } catch (error) {
      setSpin(false);
      console.log(error);
    }
  };

  //TODO Event Handlers
  const displayMenu = () => {
    menuRef.current.classList.toggle(`${classes.disp}`);
    setOpen(!open);
  };

  const zega = () => {
    menuRef.current.classList.remove(`${classes.disp}`);
    setOpen(false);
  };

  const updateMels = () => {
    setUpdatedAnsFlag((prevState) => !prevState);
    menuRef.current.classList.remove(`${classes.disp}`);
    setOpen(false);
  };

  const terkem = () => {
    setUpdatedAnsFlag(false);
  };

  const DeleteWarnMessage = () => {
    menuRef.current.classList.remove(`${classes.disp}`);
    setWarning(true);
    setIsOpen(true);
  };

  const closeMenu = () => {
    // menuRef.current.classList.remove(`${classes.disp}`)
    setIsOpen(false);
    setWarning(false);
  };

  return (
    <>
      <Link to={questionid} className={classes.question_card_container}>
        <div className={classes.question_container}>
          <div className={classes.asked_by}>
            <div className={classes.svg_container}>
              <img src={propics[index]} />
              {ansCount && (
                <>
                  {" "}
                  <span>{num_answers}</span>
                  <img src={ans} title={`ANS: ${num_answers}`} />
                </>
              )}
            </div>
            <div>
              <code>{username}</code>
            </div>
          </div>

          <div>
            <div>{answer ? answer : title}</div>

            <div onClick={displayMenu} className={classes.arrowrighticon}>
              <KeyboardArrowRightIcon />
            </div>
            <div className={classes.three_dots_menu_lists} ref={menuRef}>
              <button>
                <CiShoppingTag size={20} /> tag{" "}
              </button>
              {username == user.username && (
                <>
                  <button onClick={updateMels}>
                    <MdEdit size={20} /> Edit
                  </button>
                  <button onClick={DeleteWarnMessage}>
                    <GoTrash size={20} /> Dele{" "}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
      {updatedAns && (
        <form action="" onSubmit={UpdateAnswer} className={classes.upd_answer}>
          <textarea
            name=""
            value={updatedanswer}
            ref={ansUpdateRef}
            onChange={(e) => setUpdatedAnswer(e.target.value)}
          ></textarea>
          <button type="submit">Update Your Answer</button>
          <button type="button" onClick={terkem}>
            cancel
          </button>
        </form>
      )}

      {open && <div className={classes.open_closed} onClick={zega}></div>}

      {warn && (
        <div className={classes.warning}>
          <p>Are you sure you want to delete your answer?</p>
          <div>
            <button onClick={DeleteAnswer}>Yes</button>
            <button onClick={() => setWarning(false)}>NO</button>
          </div>
        </div>
      )}

      {spin && (
        <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#FF8500"
        radius="6"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass={classes.aligncenter}
        />
      )}

      {isOpen && <div className={classes.backdrop} onClick={closeMenu}></div>}
    </>
  );
};

export default Card;
