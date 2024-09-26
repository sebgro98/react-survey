import { useState } from "react";
import AnswersList from "./AnswersList";

function Survey() {
  const [open, setOpen] = useState(false); //Ignore this state

  const [editingAnswer, setEditingAnswer] = useState(null);

  const [userData, setUserData] = useState({
    color: "",
    spendTime: [],
    review: "",
    name: "",
    email: "",
  });
  
  const [savedAnswers, setSavedAnswers] = useState([]);

function handleEdit(answerItem) {
    setUserData({
        color: answerItem.color,
        spendTime: answerItem.spendTime,
        review: answerItem.review,
        name: answerItem.name,
        email: answerItem.email,
    });
    setEditingAnswer(answerItem);
}


  function handleChange(event) {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    const inputType = event.target.type;
    const inputChecked = event.target.checked;


    if (inputName === "color") {
      setUserData({
        ...userData,
        color: inputValue,
      });
    }
    if (inputName === "spend-time" && inputType === "checkbox") {
      const exists = userData.spendTime.find(
        (item) => item.text === inputValue
      );

      if (exists) {
        const updatedSpendTime = userData.spendTime.map((item) =>
          item.text === inputValue ? { ...item, checked: inputChecked } : item
        );
        console.log(updatedSpendTime);

        setUserData({
          ...userData,
          spendTime: updatedSpendTime,
        });
      } else {
        setUserData({
          ...userData,
          spendTime: [
            ...userData.spendTime,
            { text: inputValue, checked: inputChecked },
          ],
        });
      }
    }
    if (inputName === "review") {
      setUserData({
        ...userData,
        review: inputValue,
      });
    }
    if (inputName === "username") {
      setUserData({
        ...userData,
        name: inputValue,
      });
    }
    if (inputName === "email") {
      setUserData({
        ...userData,
        email: inputValue,
      });
    }
    
  }

  function handleSubmit(event) {
    event.preventDefault();
    const filteredSpendTime = userData.spendTime.filter((item) => item.checked);
    
    const newUserData = {
        ...userData,
        spendTime: filteredSpendTime,
    };

    if (editingAnswer) {
        setSavedAnswers(prevAnswers =>
            prevAnswers.map(answer => 
                answer === editingAnswer ? newUserData : answer
            )
        );
        setEditingAnswer(null);
    } else {
        setSavedAnswers(prevAnswers => [...prevAnswers, newUserData]);
    }

    console.log("Form submitted:", { newUserData });
}

  return (
    <main className="survey">
      <section className={`survey__list ${open ? "open" : ""}`}>
        <h2>Answers list</h2>

        <AnswersList answersList={savedAnswers} onEdit={handleEdit} />

      </section>
      <section className="survey__form">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Tell us what you think about your rubber duck!</h2>
          <div className="form__group radio">
            <h3>How do you rate your rubber duck color?</h3>
            <ul>
              <li>
                <input
                  id="color-one"
                  type="radio"
                  name="color"
                  value="1"
                  checked={userData.color === "1"}
                  onChange={handleChange}
                />
                <label htmlFor="color-one">1</label>
              </li>
              <li>
                <input
                  id="color-two"
                  type="radio"
                  name="color"
                  value="2"
                  onChange={handleChange}
                  checked={userData.color === "2"}
                />
                <label htmlFor="color-two">2</label>
              </li>
              <li>
                <input
                  id="color-three"
                  type="radio"
                  name="color"
                  value="3"
                  onChange={handleChange}
                  checked={userData.color === "3"}
                />
                <label htmlFor="color-three">3</label>
              </li>
              <li>
                <input
                  id="color-four"
                  type="radio"
                  name="color"
                  value="4"
                  onChange={handleChange}
                  checked={userData.color === "4"}
                />
                <label htmlFor="color-four">4</label>
              </li>
            </ul>
          </div>
          <div className="form__group">
            <h3>How do you like to spend time with your rubber duck</h3>
            <ul>
              <li>
                <label>
                  <input
                    name="spend-time"
                    type="checkbox"
                    value="swimming"
                    onChange={handleChange}
                    checked={
                      userData.spendTime.find(
                        (item) => item.text === "swimming"
                      )?.checked || false
                    }
                  />
                  Swimming
                </label>
              </li>
              <li>
                <label>
                  <input
                    name="spend-time"
                    type="checkbox"
                    value="bathing"
                    onChange={handleChange}
                    checked={
                      userData.spendTime.find((item) => item.text === "bathing")
                        ?.checked || false
                    }
                  />
                  Bathing
                </label>
              </li>
              <li>
                <label>
                  <input
                    name="spend-time"
                    type="checkbox"
                    value="chatting"
                    onChange={handleChange}
                    checked={
                      userData.spendTime.find(
                        (item) => item.text === "chatting"
                      )?.checked || false
                    }
                  />
                  Chatting
                </label>
              </li>
              <li>
                <label>
                  <input
                    name="spend-time"
                    type="checkbox"
                    value="noTime"
                    onChange={handleChange}
                    checked={
                      userData.spendTime.find((item) => item.text === "noTime")
                        ?.checked || false
                    }
                  />
                  I don't like to spend time with it
                </label>
              </li>
            </ul>
          </div>
          <label>
            What else have you got to say about your rubber duck?
            <textarea
              name="review"
              cols="30"
              rows="10"
              onChange={handleChange}
              value={userData.review}
            ></textarea>
          </label>
          <label>
            Put your name here (if you feel like it):
            <input
              type="text"
              name="username"
              value={userData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Leave us your email pretty please??
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          </label>
          <input
            className="form__submit"
            type="submit"
            value="Submit Survey!"
          />
        </form>
      </section>
    </main>
  );
}

export default Survey;
