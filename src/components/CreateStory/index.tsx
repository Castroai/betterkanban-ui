import { ChangeEvent, FormEvent, useState } from "react"
import { Input } from "../UI/Input"
import { Button } from "../UI/Button"
import { useModalContext } from "../../contexts/ModalContext"
import { useData } from "../../contexts/DataContext"

export const CreateStory = () => {
    const { closeModal } = useModalContext()
    const { data, createNewCard } = useData()
    const [state, setState] = useState({
        title: '',
        description: '',
        typeId: 0,
        columnId: 0
    })
    const columns = data[0].columns || []
    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await createNewCard(state)
        closeModal()
    }
    const handleSelectTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setState(current => ({
            ...current,
            typeId: parseInt(value)
        }))
    };
    const handleSelectColumnChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setState(current => ({
            ...current,
            columnId: parseInt(value)
        }))
    };

    const options = data[0].cardTypes || []

    return (
        <div className="w-1/3 h-1/2 bg-light-secondary dark:bg-dark-secondary rounded-md">
            <form onSubmit={submitHandler} className="p-4 flex flex-col justify-between gap-4 h-full ">
                <div className="flex justify-between items-center">
                    <div>Create a new Task</div>
                    <div className="cursor-pointer" onClick={closeModal}>X</div>
                </div>
                <div>
                    <Input onChange={(e) => {
                        setState((current) => ({
                            ...current,
                            title: e.target.value
                        }))
                    }} label="title" placeholder="title" value={state.title} name="title" required />
                </div>
                <div>
                    <textarea rows={5} cols={40} onChange={(e) => {
                        setState((current) => ({
                            ...current,
                            description: e.target.value
                        }))
                    }} className="border-2 border-gray-200 rounded-md w-full" placeholder="description" value={state.description} name="description" required />
                </div>
                <div>
                    <select className="bg-gray-100 p-2 rounded-md border-4 w-full" value={state.typeId} onChange={handleSelectTypeChange}>
                        <option value="">Select an option</option>
                        {options.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <select className="bg-gray-100 p-2 rounded-md border-4 w-full" value={state.columnId} onChange={handleSelectColumnChange}>
                        <option value="">Select an Column</option>
                        {columns.map((column) => (
                            <option key={column.id} value={column.id}>
                                {column.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex gap-4 justify-between">
                    <Button type="submit">Save</Button>
                    {/* <Button type="button">Generate</Button> */}
                </div>
            </form>
        </div>
    )
}