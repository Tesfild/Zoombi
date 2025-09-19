"use client"
import { useEffect, useState } from "react"
import axios from "axios"

export default function ProfilePage() {
    const [profile, setProfile] = useState(null)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [avatar, setAvatar] = useState(null)

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/usuarios/profile/", {
            withCredentials: true, // faz o navegador enviar o cookie
        })
            .then(res => {
                setProfile(res.data)
                setFirstName(res.data.first_name || "")
                setLastName(res.data.last_name || "")
            })
            .catch(err => {
                console.error(err)
                alert("Erro ao carregar perfil. Faça login novamente.")
            })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("accessToken")
        if (!token) return alert("Token de autenticação não encontrado.")

        const formData = new FormData()
        formData.append("first_name", firstName)
        formData.append("last_name", lastName)
        if (avatar) formData.append("avatar", avatar)

        try {
            await axios.put("http://127.0.0.1:8000/api/usuarios/profile/", formData, {
                withCredentials: true, //  mantém o cookie
                headers: { "Content-Type": "multipart/form-data" }
            })
            alert("Perfil atualizado!")
        } catch (err) {
            console.error(err)
            alert("Erro ao atualizar perfil.")
        }
    }

    if (!profile) return <p>Carregando...</p>

    return (
        <div style={{ maxWidth: "400px", margin: "auto" }}>
            <h1>Meu Perfil</h1>
            {profile.avatar && (
                <img src={`http://127.0.0.1:8000${profile.avatar}`} alt="Avatar" width={100} />
            )}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome</label>
                    <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
                </div>

                <div>
                    <label>Sobrenome</label>
                    <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
                </div>

                <div>
                    <label>Foto de Perfil</label>
                    <input type="file" onChange={e => setAvatar(e.target.files[0])} />
                </div>

                <button type="submit">Salvar</button>
            </form>
        </div>
    )
}
