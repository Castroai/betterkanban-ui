import { ChangeEvent, FormEvent, useState } from "react"
import { Input } from "../UI/Input"
import { Button } from "../UI/Button"
import { useModalContext } from "../../contexts/ModalContext"

export const CreateStory = () => {
    const { closeModal } = useModalContext()
    const [state, setState] = useState({
        title: '',
        description: '',
        type: 'BUG'
    })
    const submitHandler = (e: FormEvent) => {
        e.preventDefault()
    }
    const [selectedOption, setSelectedOption] = useState('');
    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedOption(value);
        // onSelect(value);
    };

    const options = ['BUG', 'STORY', 'SPIKE']

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
                    <select className="bg-gray-100 p-2 rounded-md border-4 w-full" value={selectedOption} onChange={handleSelectChange}>
                        <option value="">Select an option</option>
                        {options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex gap-4 justify-between">
                    <Button type="submit">Save</Button>
                    <Button type="submit">Generate</Button>
                </div>
            </form>
        </div>
    )
}