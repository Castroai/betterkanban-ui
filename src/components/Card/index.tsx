import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../pages/Dashboard';
import Modal from '../Modal';
import { OpenCard } from '../TaskDetails';
import { WithModal } from '../../hooks/modalHook';
import { TasksEntity } from '../../types';


export const Card = ({ description, title, columnId, id }: TasksEntity) => {
    const { closeModal, isOpen, openModal } = WithModal()
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.CARD,
        item: { description, title, columnId, id, },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))
    return (
        <div className=''>
            <div onClick={openModal} ref={drag}
                style={{
                    opacity: isDragging ? 0.5 : 1,
                    cursor: isDragging ? 'move' : 'pointer',

                }} className="dark:bg-dark-secondary bg-light-secondary max-h-40 min-h-max dark:text-dark-text p-4 rounded-md">
                <span>{title}</span>
                <div>
                    {description.substring(0, 15)} {description.length > 15 ? '......' : ''}
                </div>

            </div>
            <Modal isOpen={isOpen}>
                <OpenCard cardId={id} closeModal={closeModal} />
            </Modal>
        </div>
    )
}