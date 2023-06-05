import { useEffect, useState } from "react"
import { httpService } from "../../services/httpService"
import { TasksEntity } from "../../types"
import { Button } from "../UI/Button"

export const OpenCard = ({ cardId, closeModal }: { cardId: number, closeModal: () => void }) => {
    const [state, setState] = useState<TasksEntity | null>(null)
    const [loading, setLoading] = useState(true)
    const [newState, setNewState] = useState<TasksEntity | null>(null)

    function compareObjects(obj1: TasksEntity, obj2: TasksEntity) {

        const keys1 = Object.keys(obj1) as Array<keyof TasksEntity>;
        const keys2 = Object.keys(obj2) as Array<keyof TasksEntity>;

        if (keys1.length !== keys2.length) {
            return false;
        }

        for (let key of keys1) {
            if (obj1[key] !== obj2[key]) {
                return false;
            }
        }

        return true;
    }
    useEffect(() => {
        const fetchCard = async () => {
            const { data } = await httpService.get('/card', {
                params: {
                    cardId
                }
            })
            setState(data)
            setNewState(data)
            setLoading(false)
        }
        fetchCard()

    }, [])
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                const objectsAreEqual = compareObjects(state!, newState!);
                console.log(objectsAreEqual)
                if (!objectsAreEqual) {
                    const confirmed = window.confirm(`Changes not saved. Are you sure you want to leave ?`);
                    if (confirmed) {
                        // TODO: PUT /newState
                        closeModal();
                    }
                }
                closeModal();

            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [closeModal, state, newState]);

    if (loading) {
        return (
            <div>...Loading</div>
        )
    }
    if (state && newState) {
        return (
            <div className="w-auto max-h-screen overflow-y-scroll h-auto rounded-md p-4  flex  flex-col gap-4 bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-dark-text">
                <div className="flex justify-start">
                    {state.title}
                </div>
                <hr />
                <div className="flex" >
                    <div className="flex flex-col gap-4 ">
                        <span className="text-lg items-start flex font-semibold" >Description</span>
                        <textarea value={newState.description} onChange={(e) => {
                            setNewState(() => ({ ...newState, description: e.target.value }))
                        }}
                            className="border-2 border-light-primary rounded-md w-full" cols={80} rows={5} />
                    </div>
                </div>
                <div className="flex">
                    <div>
                        <Button>Save</Button>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>Error Fetching Card</div>
        )
    }

}