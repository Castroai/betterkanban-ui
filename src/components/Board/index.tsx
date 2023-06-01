import React from 'react';
import { Column } from '../Column';
import { Button } from '../UI/Button';
import { useModalContext } from '../../contexts/ModalContext';
import Modal from '../Modal';
import { CreateStory } from '../CreateStory';
import { useData } from '../../contexts/DataContext';



// An Item is an object:  { cardId: 42 }
// A type is a string 'Card'
// monitors: the state of the component
// monitor state: drag //inprogress ? yer or no
// monitor state: is current type and current item ? yes or no
// Connectors: a drag source, a drag preview, or a drop target 

export const Board: React.FC = () => {
    const { data } = useData()
    const columns = data.length > 0 ? data[0].columns : []
    const { openModal } = useModalContext()
    const handleButtonClick = () => {
        openModal()
    };
    return (
        <div className=' p-4 flex flex-1 flex-col gap-4 dark:bg-dark-secondary bg-light-secondary rounded-md'>
            <div className='flex justify-between items-center'>
                <div>
                    SPRINT INFO GOES HERE
                </div>
                <div><Button onClick={handleButtonClick}>Create Card</Button></div>
            </div>
            <div className='flex gap-4'>
                {
                    columns.map((column) => {
                        return <Column  {...column} key={column.id} />
                    })
                }
            </div>
            <Modal title='Create a new card' >
                <CreateStory />
            </Modal>
        </div>
    );
};
