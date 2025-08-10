import { useEffect, useState } from "react"
import { login, register } from '../services/auth'

export default function Login() {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const [erro, setErro] = useState('')
    const [carregando, setCarregando] = useState(false)
    const [sucesso, setSucesso] = useState(false)

    const [loginCreate, setLoginCreate] = useState(false)

    const handleSubmit = async (e) => {  // ao clicar para enviar tradução = manipularEnviar
        e.preventDefault() //Impede que recarregue a pagina ao enviar o formulario
        setErro('') //Limpa qualquer mensagem de erro anterior que estava sendo exbida
        setCarregando(true)
        setSucesso(false)

        try {
            const user = { userName, password }
            const response = await login(user)

            console.log('Login bem sucedido!', response.data)

            const token = btoa(`${userName}:${password}`)
            sessionStorage.setItem('basicCred', token)

        } catch (err) {
            setErro('Usuário ou senha inválidos')
        }
    }

    function handleClickLogin(e){
        e.preventDefault()
        setLoginCreate(!loginCreate)
    }

    return (
        <>
            <div className="flex items-center justify-center h-screen bg-blue-900">

                <div className="flex flex-col gap-4 p-6 w-80 bg-white border rounded-2xl shadow-lg">

                    {loginCreate === true && (
                        <>
                            <h2 className="text-4xl text-center text-blue-900 pb-4">LOGIN</h2>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-3">

                                <div className="flex flex-col">
                                    <label htmlFor="user">Usuário</label>
                                    <input
                                        id="user"
                                        type="text"
                                        value={userName}
                                        onChange={(e) => setUser(e.target.value)}
                                        className="border border-gray-400 rounded h-8 px-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="password">Senha</label>
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="border border-gray-400 rounded h-8 px-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={carregando}
                                    className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer"
                                >
                                    {carregando ? 'Carregando...' : 'Entrar'}
                                </button>

                            </form>

                            {erro && <p className="text-red-600 text-sm flex justify-center">{erro}</p>}
                            {sucesso && <p className="text-green-600 text-sm">Login realizado com sucesso!</p>}

                            <p className="flex justify-center text-sm">Não tem uma conta?
                                <span className="underline pl-1.5 cursor-pointer"
                                onClick={(e) => handleClickLogin(e)}
                                >
                                    Crie agora!
                                </span>
                            </p>
                        </>
                    )}

                    {loginCreate === false && (
                        <>
                            <h2 className="text-4xl text-center text-blue-900 pb-4">CADASTRE-SE</h2>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-3">

                                <div className="flex flex-col">
                                    <label htmlFor="user">Usuário</label>
                                    <input
                                        id="user"
                                        type="text"
                                        value={userName}
                                        onChange={(e) => setUser(e.target.value)}
                                        className="border border-gray-400 rounded h-8 px-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="password">Senha</label>
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="border border-gray-400 rounded h-8 px-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={carregando}
                                    className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer"
                                >
                                    {carregando ? 'Carregando...' : 'Cadastrar'}
                                </button>

                            </form>

                            {erro && <p className="text-red-600 text-sm flex justify-center">{erro}</p>}
                            {sucesso && <p className="text-green-600 text-sm">Login realizado com sucesso!</p>}

                            <p className="flex justify-center text-sm">Já tem uma conta?
                                <span className="underline pl-1.5 cursor-pointer"
                                onClick={(e) => handleClickLogin(e)}
                                >
                                    Fazer Login!
                                </span> 
                            </p>
                        </>
                    )}
                </div>

            </div>

        </>
    )
}