// Components don't need to be separeted into individual files
// Here we have a smaller component that helps compose the AnswersItem below
const answersSet = {
  swimming: "Swimming",
  bathing: "Bathing",
  chatting: "Chatting",
  noTime: "I don't like to spend time with it"
};

function ItemsList({ list }) {
  return (
    <ul>
      {list.map((item) => (
        <li key={item}>{answersSet[item.text]}</li>
      ))}
    </ul>
  );
}

export default function AnswersItem({ answerItem, onEdit }) {
  const { color, spendTime, review, name } = answerItem;
  return (
    <li>
      <article className="answer">
        <h3>{name || "Anon"} said:</h3>
        <p>
          <em>How do you rate your rubber duck colour?</em>
          <span className="answer__line">{color}</span>
        </p>
        <p>
          <em>How do you like to spend time with your rubber duck?</em>
          <ItemsList list={spendTime} />
        </p>
        <p>
          <em>What else have you got to say about your rubber duck?</em>
          <span className="answer__line">{review}</span>
        </p>
        <button onClick={() => onEdit(answerItem)}>Edit</button>
      </article>
    </li>
  );
}
