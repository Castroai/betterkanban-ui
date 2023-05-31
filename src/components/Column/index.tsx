import { useDrop } from "react-dnd"
import { Card } from "../Card";
import { ItemTypes } from "../../pages/Dashboard";
import { ColumnInterface } from "../../types";

interface Card {
  title: string;
  description: string;
  type: string;
  state: string
}

export const Column = ({ cards, name }: ColumnInterface) => {
  // const handleMove = (incomingCard: Card) => {
  //   setCardState((currentCards) => {
  //     return currentCards.map((card) => {
  //       if (card.title === incomingCard.title) {
  //         return {
  //           ...card,
  //           state: title
  //         }
  //       }
  //       return card
  //     })
  //   })
  // }
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      drop: (data: Card) => {
        console.log(data)
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver()
      })
    }),
    []
  )

  return (
    <div ref={drop}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }} className="bg-light-primary w-full h-auto p-4 rounded-md text-center overflow-y-auto">
      <span className="text-light-text dark:text-dark-text font-semibold">{name}</span>
      <hr />
      <div className="flex flex-col gap-5 pt-4">
        {cards.map((card) => {
          return (
            <Card {...card} key={card.title} />
          )
        })}
      </div>
    </div>
  )
}