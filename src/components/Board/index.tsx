import React, { useState } from 'react';
import { Column } from '../Column';
import { Button } from '../UI/Button';
import { useModalContext } from '../../contexts/ModalContext';
import Modal from '../Modal';
import { CreateStory } from '../CreateStory';



// An Item is an object:  { cardId: 42 }
// A type is a string 'Card'
// monitors: the state of the component
// monitor state: drag //inprogress ? yer or no
// monitor state: is current type and current item ? yes or no
// Connectors: a drag source, a drag preview, or a drop target 

export const Board: React.FC = () => {
    const cards = [
        { title: 'B0001', description: 'Fix Something', type: 'BUG', state: 'Todo' },
        { title: 'B0002', description: 'Optimize Performance', type: 'BUG', state: 'Working on it' },
        { title: 'B0003', description: 'Refactor Codebase', type: 'BUG', state: 'InReview/QA' },
        { title: 'B0004', description: 'Fix Compatibility Issues', type: 'BUG', state: 'In Stage' },
        { title: 'B0005', description: 'Investigate Security Vulnerabilities', type: 'BUG', state: 'In Production' },
        { title: 'S0001', description: 'Implement New Feature', type: 'STORY', state: 'Todo' },
        { title: 'S0002', description: 'Design User Interface', type: 'STORY', state: 'Working on it' },
        { title: 'S0003', description: 'Write User Documentation', type: 'STORY', state: 'InReview/QA' },
        { title: 'S0004', description: 'Gather User Feedback', type: 'STORY', state: 'In Stage' },
        { title: 'S0005', description: 'Implement Backend API', type: 'STORY', state: 'In Production' },
        { title: 'SP0001', description: 'Research Market Trends', type: 'SPIKE', state: 'Todo' },
        { title: 'SP0002', description: 'Evaluate Performance Bottlenecks', type: 'SPIKE', state: 'Working on it' },
        { title: 'SP0003', description: 'Explore New Technologies', type: 'SPIKE', state: 'InReview/QA' },
        { title: 'SP0004', description: 'Prototype Proof of Concept', type: 'SPIKE', state: 'In Stage' },
        { title: 'SP0005', description: 'Assess Scalability Options', type: 'SPIKE', state: 'In Production' }
    ];

    const columns = ['Todo', 'Working on it', 'InReview/QA', 'In Stage', "In Production"]
    const [cardState, setCardState] = useState(cards)
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
                        const cardlist = cardState.filter((card) => card.state === column)
                        return <Column cards={cardlist} setCardState={setCardState} title={column} key={column} />
                    })
                }
            </div>
            <Modal title='Create a new card' >
                <CreateStory />
            </Modal>
        </div>
    );
};

