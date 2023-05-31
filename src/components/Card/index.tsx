import { FaBug } from 'react-icons/fa'
import { BsFillLightbulbFill, BsBack } from 'react-icons/bs'
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../pages/Dashboard';
interface CardProps {
    card: {
        title: string;
        description: string;
        type: string;
        state: string
    }
}
export const Card = ({ card }: CardProps) => {
    const { title, description, type } = card
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.CARD,
        item:card,
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
            {type === 'BUG' ? <FaBug /> : type === 'SPIKE' ? <BsFillLightbulbFill /> : type === 'STORY' ? <BsBack /> : null}
        </div>

    )
}