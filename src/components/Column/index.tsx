import { useDrop } from "react-dnd"
import { Card } from "../Card";
import { ItemTypes } from "../../pages/Dashboard";
import { CardInterface, ColumnInterface } from "../../types";
import { useData } from "../../contexts/DataContext";


export const Column = ({ cards, name, id }: ColumnInterface) => {
  const { moveCardToColum } = useData()
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      drop: async (data: CardInterface) => {
        console.log('Here')
        return await moveCardToColum({
          cardId: data.id,
          columnId: id
        })
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