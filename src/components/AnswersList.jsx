import AnswersItem from "./AnswersItem";

export default function AnswersList(props) {

  const { answersList }  = props
  const { onEdit } = props
  console.log("Inside AnswersList: ", answersList);

  return (
    <ul>
      {answersList.map((answerItem, i) => (
        <AnswersItem answerItem={answerItem} key={i} onEdit={onEdit} />
      ))}
    </ul>
  );

}
