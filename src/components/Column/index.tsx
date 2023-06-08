import { useDrop } from "react-dnd"
import { Card } from "../Card";
import { ItemTypes } from "../../pages/Dashboard";
import { useData } from "../../contexts/DataContext";
import { ColumnsEntity, TasksEntity } from "../../types";
import { SlOptionsVertical } from 'react-icons/sl'

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
    <div ref={drop} style={{ maxHeight: 'calc(100vh - 250px)', height: 'auto' }} className="w-full p-4 rounded-md text-center bg-light-secondary dark:bg-dark-primary dark:text-dark-text flex flex-col">
      <div className="font-semibold justify-between items-center flex p-2 sticky top-0 bg-light-secondary dark:bg-dark-primary z-10">
        {title} <span className="cursor-pointer" onClick={() => { alert('Clicked') }}> <SlOptionsVertical /> </span>
      </div>
      <div className="flex flex-col gap-5 pt-4 overflow-y-auto">
        {tasks && tasks.map((task) => {
          if (task) {
            return (
              <Card {...task} key={task.id} />
            )
          } else {
            return null;
          }
        })}
      </div>
    </div>


  )
}