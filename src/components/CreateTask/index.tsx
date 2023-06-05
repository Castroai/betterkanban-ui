import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Input } from "../UI/Input"
import { Button } from "../UI/Button"
import { useData } from "../../contexts/DataContext"
import { httpService } from "../../services/httpService"
import { PromptResponse } from "../../types"


export const CreateStory = ({ closeModal }: { closeModal: () => void }) => {
    const { data, createNewCard, taskTypes } = useData()
    const [generating, setGenerating] = useState(false)
    const [state, setState] = useState({
        title: '',
        description: '',
        typeId: 0,
        columnId: 0
    })
    const [promptResponse, setPromptResponse] = useState<PromptResponse | null>(null)


    const [prompt, setPrompt] = useState('As a customer I want to create signup page so that new customer can create an account')

    const columns = data && data[0].columns || []
    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await createNewCard({
            ...state,
            description: promptResponse && promptResponse.choices[0].message.content || ""
        })
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



    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [closeModal]);

    const placeHolderPrompt =
        `As a [type of user], 
    I want [a feature] 
    so that [a goal or benefit].
`
    const submitPrompt = async () => {
        setGenerating(true)
        const { data } = await httpService.post('/openai', {
            prompt
        })
        setPromptResponse(data)
        setGenerating(false)

    }
    return (
        <div className="w-1/3 h-auto bg-light-secondary dark:bg-dark-secondary rounded-md">
            <form onSubmit={submitHandler} className="p-4 flex flex-col justify-between gap-4 h-full ">
                <div className="flex justify-between items-center">
                    <div>Create a new Task</div>
                    <div className="cursor-pointer" onClick={closeModal}>X</div>
                </div>
                <div>
                    <Input required onChange={(e) => {
                        setState((current) => ({
                            ...current,
                            title: e.target.value
                        }))
                    }} label="title" placeholder="title" value={state.title} name="title" />
                </div>
                <span>Prompt</span>
                <textarea placeholder={placeHolderPrompt} className="border-2 border-gray-200 rounded-md w-full" value={prompt} onChange={(e) => {
                    setPrompt(e.target.value)
                }} />

                <Button type="button" onClick={submitPrompt}>Generate</Button>
                <hr />
                <div>
                    {generating ? 'Using AI Magic....' : <div className="flex flex-col" >
                        <span>Details</span>
                        <textarea aria-placeholder={placeHolderPrompt} rows={5} cols={40} onChange={(e) => {
                            setState((current) => ({
                                ...current,
                                description: e.target.value
                            }))
                        }} className="border-2 border-gray-200 rounded-md w-full h-auto" value={promptResponse && promptResponse.choices[0].message.content || ""} name="description" required />
                    </div>}

                </div>
                <div>
                    <select required className="bg-gray-100 p-2 rounded-md border-4 w-full" value={state.typeId} onChange={handleSelectTypeChange}>
                        <option value="">Select Task Type</option>
                        {taskTypes && taskTypes.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <select required className="bg-gray-100 p-2 rounded-md border-4 w-full" value={state.columnId} onChange={handleSelectColumnChange}>
                        <option value="">Select an Column</option>
                        {columns.map((column) => (
                            <option key={column.id} value={column.id}>
                                {column.title}
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