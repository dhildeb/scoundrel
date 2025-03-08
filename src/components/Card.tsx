import { Card } from "../App"

const CardComponent = (card: Card) => {
  const handleCardClick = () => {
    console.log(card)
  }
  return (
    <>
    <div className={card.type} onClick={() => handleCardClick()}>

    {card.value}
    </div>
    </>
  )
}

export default CardComponent
