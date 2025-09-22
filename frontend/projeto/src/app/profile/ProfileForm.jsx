"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

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

    if (loading) return null

    // Redireciona se não houver perfil
    if (error || !profile) {
        return (
            <div className="flex h-64 items-center justify-center flex-col text-center">
                <h1 className="text-xl font-bold">Perfil não encontrado</h1>
                <p className="mt-2 text-gray-600">Faça login novamente ou crie um perfil.</p>
                <button
                    onClick={() => router.push("/login")}
                    className="mt-4 px-4 py-2 bg-[#20053c] text-white rounded-lg hover:bg-blue-700"
                >
                    Voltar
                </button>
            </div>
        )
    }
    //

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Meu Perfil</h1>

            <form onSubmit={handleSubmit}>
                {profile.avatar && (
                    <img
                        src={`http://127.0.0.1:8000${profile.avatar}`}
                        alt="Avatar"
                        width={100}
                        className="mb-4"
                    />
                )}

                <div>
                    <label>Nome</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                </div>

                <div>
                    <label>Sobrenome</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                </div>

                <div>
                    <label>Foto de Perfil</label>
                    <input
                        type="file"
                        onChange={e => setAvatar(e.target.files[0])}
                    />
                </div>

                <button type="submit">Salvar</button>
            </form>
        </div>
    )
}
