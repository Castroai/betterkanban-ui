import { useDrop } from "react-dnd"
import { Card } from "../Card";
import { ItemTypes } from "../../pages/Dashboard";
import { useData } from "../../contexts/DataContext";
import { ColumnsEntity, TasksEntity } from "../../types";


export const Column = ({ tasks, title, id }: ColumnsEntity) => {
  const { moveCardToColum } = useData()
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      drop: async (data: TasksEntity) => {
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
      }} className="w-full h-auto p-4 rounded-md text-center overflow-y-auto">
      <span className="text-light-text font-semibold">{title}</span>
      <hr />
      <div className="flex flex-col gap-5 pt-4">
        {tasks && tasks.map((task) => {
          if (task) {
            return (
              <Card {...task} key={task.id} />
            )
          } else
            return null
        })}
      </div>
    </div>
  )
}