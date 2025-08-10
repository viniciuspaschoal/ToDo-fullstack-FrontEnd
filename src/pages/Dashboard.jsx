import { useEffect, useState } from "react"
import { getTasks, createTask } from "../services/taskService"
import { FaPlus } from "react-icons/fa6";

export default function Dashboard() {

    const [tasks, setTasks] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [error, setError] = useState(null)
    const [create, setCreate] = useState(false)
    const [newDescription, setNewDescription] = useState("")

    useEffect(() => {
        let mounted = true

        const fetchTasks = async () => {
            try {
                const response = await getTasks()
                if (!mounted) return
                setTasks(response.data)
            } catch (err) {
                if (!mounted) return
                console.error('Erro ao buscar tasks', err)
                setError('Não foi possível obter tarefas')
            } finally {
                if (mounted) setCarregando(false)
            }
        }

        fetchTasks()

    }, [])

    function handleCreateTask() {
        setCreate(true)
    }

    function handleClosePopup() {
        setCreate(false)
        setNewDescription("")
    }

    async function handleSaveTask() {
        //validação para a tareva não ser criada vazia
        if (!newDescription.trim()) { //.trim() remove espaços em branco no início e no final, garantindo que o usuário não possa salvar uma tarefa com apenas espaços.
            alert("A descrição da tarefa não pode ser vazia.")
            return
        }

        try {
            // Cria um objeto com os dados da nova tarefa. O json com o formato certo para gravar no banco
            const newTaskData = {
                description: newDescription,
                user: { id: 1 }
            }

            // Chama a função para criar a tarefa no back-end
            const response = await createTask(newTaskData)

            //atualiza para que o react renderize a nova task. Isso atualiza diretamente o setTask buscado dentro do useEffect
            //Você faz uma nova caixinha com tudo que já tinha antes + a nova tarefa, e troca a caixinha antiga pela nova.
            setTasks(prevTasks => [...prevTasks, response.data])

            handleClosePopup() //fecha a popUp
        } catch (err) {
            console.error('Erro ao criar tarefa', err)
            setError('Não foi possível criar a tarefa')
            alert('Erro ao criar tarefa. Por favor, tente novamente')
        }
    }

    if (carregando) return <p>Carregando tarefas...</p>
    if (error) return <p className="text-red-600">{error}</p>

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700 p-6">
                <div className="flex h-full">

                    {/* Botão à esquerda */}
                    <div className="w-16 flex justify-start">
                        <div className="fixed bottom-6 left-6 group flex items-center space-x-2 overflow-visible">
                            <button
                                className="w-12 h-12 bg-white text-blue-700 rounded-full shadow-lg text-2xl font-bold flex items-center justify-center hover:bg-blue-100 transition duration-300 group-hover:rotate-90 transform cursor-pointer"
                                onClick={handleCreateTask}
                            >
                                <FaPlus />
                            </button>

                            <span
                                className="opacity-0 transform -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 
               bg-white text-blue-700 font-semibold text-sm px-3 py-1 rounded-lg shadow"
                            >
                                Criar Tarefa
                            </span>
                        </div>
                    </div>

                    {/* Conteúdo principal */}
                    <div className="flex-grow text-center">
                        <div className="flex justify-center mb-5">
                            <h2 className="text-white text-2xl font-bold">Minhas Tarefas</h2>
                        </div>

                        <div className="flex flex-wrap justify-center">
                            {tasks.map((task) => (
                                <div
                                    key={task.id}
                                    className="w-80 bg-white rounded-xl shadow-lg p-4 m-4 border border-gray-200 hover:shadow-xl transition duration-300"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-sm text-gray-500 font-medium">Tarefa #{task.id}</h3>
                                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                                            Pendente
                                        </span>
                                    </div>
                                    <p className="text-gray-800 text-base font-semibold">
                                        {task.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-16"></div>
                </div>
            </div>

            {/* Popup */}
            {create && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative">
                        {/* Botão fechar */}
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-lg cursor-pointer"
                            onClick={handleClosePopup}
                        >
                            ✖
                        </button>

                        <h2 className="text-xl font-bold mb-4">Criar Nova Tarefa</h2>
                        <textarea
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            placeholder="Digite a descrição da tarefa..."
                            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            onClick={handleSaveTask}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                        >
                            Salvar Tarefa
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
