import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../pages/Dashboard';
import { CardInterface } from '../../types';


export const Card = ({ description, title, assignee, columnId, createdDate, dueDate, id }: CardInterface) => {


    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.CARD,
        item: { description, title, columnId, id, createdDate, assignee, dueDate },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    return (
        <div ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',

            }} className="dark:bg-dark-secondary bg-light-secondary max-h-40 min-h-max dark:text-dark-text p-4 rounded-md">
            <span>{title} {description}</span>
        </div>
    )
}