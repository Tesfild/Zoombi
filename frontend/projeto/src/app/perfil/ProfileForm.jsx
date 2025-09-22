"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

// Componente Loading
function LoadingComponent() {
    return (
        <div className="min-h-screen bg-[#20053c] relative overflow-hidden flex items-center justify-center">
            <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <h1 className="text-4xl font-semibold text-white mb-6">Céééérebross...</h1>
                <div className="relative">
                    <div className="animate-spin h-12 w-12 rounded-full border-4 border-[#eca390] border-t-transparent"></div>
                    <div className="absolute inset-1 animate-spin h-10 w-10 rounded-full border-4 border-white/30 border-b-transparent" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                </div>
                <h6 className="mt-6 text-white/70 text-sm"> Aguande enquanto ressuscitamos seus dados...</h6>
            </div>
        </div>
    )
}

// Componente Not Found
function NotFoundComponent({ router }) {
    return (
        <div className="min-h-screen bg-[#20053c] relative overflow-hidden flex items-center justify-center">
            {/* Elementos decorativos */}
            

            <div className="relative z-10 text-center max-w-2xl px-8">
                <h1 className="text-5xl font-bold text-white mb-3">Perfil não encontrado.</h1>
                <p className="text-lg text-white/80 mb-8">
                    Parece que esse Zoombi se perdeu da horda
                    <br />
                    ...ou não é um Zoombi?
                </p>
                <button
                    onClick={() => router.push("/login")}
                    className="px-8 py-3 bg-[#eca390] hover:bg-[#d78c86] text-[#20053c] font-semibold rounded-2xl transition-all duration-200 transform hover:scale-[1.02]"
                >
                    Voltar para Login
                </button>
            </div>
        </div>
    )
}

export default function ProfileForm() {
    const [profile, setProfile] = useState(null)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [avatar, setAvatar] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const router = useRouter()

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/usuarios/profile/", {
            withCredentials: true,
        })
            .then(res => {
                setProfile(res.data)
                setFirstName(res.data.first_name || "")
                setLastName(res.data.last_name || "")
            })
            .catch(() => {
                setError(true)
            })
            .finally(() => setLoading(false))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("first_name", firstName)
        formData.append("last_name", lastName)
        if (avatar) formData.append("avatar", avatar)

        try {
            await axios.put("http://127.0.0.1:8000/api/usuarios/profile/", formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" }
            })
            alert("Perfil atualizado!")
            router.refresh()
        } catch {
            alert("Erro ao atualizar perfil.")
        }
    }

    // Estados de loading e erro 
    if (loading) return <LoadingComponent />
    if (error || !profile) return <NotFoundComponent router={router} />

    // Formulário principal 
    return (
        <div className="min-h-screen bg-[#20053c] relative overflow-hidden">
            {/* Conteúdo do formulário */}
            <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-6">
                <div className="w-full max-w-2xl">
                    <div className="bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 p-8">
                        <h1 className="text-3xl font-bold text-white mb-8 text-center">Perfil</h1>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Avatar */}
                            {profile.avatar && (
                                <div className="text-center mb-6">
                                    <img
                                        src={`http://127.0.0.1:8000${profile.avatar}`}
                                        alt="Avatar"
                                        className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-[#eca390]"
                                    />
                                </div>
                            )}

                            {/* Nome */}
                            <div>
                                <label className="block text-white font-medium mb-2">Nome</label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                    className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm rounded-2xl border-0 text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-[#eca390] focus:outline-none transition-all duration-200"
                                    placeholder="Seu nome"
                                />
                            </div>

                            {/* Sobrenome */}
                            <div>
                                <label className="block text-white font-medium mb-2">Sobrenome</label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                    className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm rounded-2xl border-0 text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-[#eca390] focus:outline-none transition-all duration-200"
                                    placeholder="Seu sobrenome"
                                />
                            </div>

                            {/* Foto de Perfil */}
                            <div>
                                <label className="block text-white font-medium mb-2">Foto de Perfil</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => setAvatar(e.target.files[0])}
                                    className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm rounded-2xl border-0 text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#eca390] file:text-[#20053c] file:font-semibold hover:file:bg-[#d78c86] focus:ring-2 focus:ring-[#eca390] focus:outline-none transition-all duration-200"
                                />
                            </div>

                            {/* Botão Salvar */}
                            <button
                                type="submit"
                                className="w-full py-4 bg-[#eca390] hover:bg-[#d78c86] text-[#20053c] font-semibold rounded-2xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg text-lg"
                            >
                                SALVAR PERFIL
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}