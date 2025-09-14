"use client"
import {useState} from "react"
import { registerUser } from "../../../utils/auth";
import React from 'react'

export default function RegisterPage() {

    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(userName==="" || password ==="" || email==="") {
            return
        }
        try {
            await registerUser(email, password, userName)
            alert("Usuário registrado!")
        }
        catch (e) {
            alert("Usuário não pode ser registrado")
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 items-center flex flex-col justify-center">

            <form onSubmit={handleSubmit} className="bg-gray-600 p-8 flex flex-col rounded-lg">

                <label>Nome de usuário</label>
                <input className="text-white-600" type="text" value={userName} required onChange={(e)=>{setUserName(e.target.value)}}/>
                <br/>

                <label>E-mail</label>
                <input className="text-white-600" type="text" value={email} required onChange={(e)=>{setEmail(e.target.value)}}/>
                <br/>

                <label>Senha</label>
                <input className="text-white-600" type="password" value={password} required onChange={(e)=>{setPassword(e.target.value)}}/>
                <br/>

                <button className="bg-blue-400 p-1 rounded-sm" type="submit">Cadastrar</button>
            </form>

        </div>
    )
}