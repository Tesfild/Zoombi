"use client"
import React from 'react'
import {useState} from "react"
import {loginUser} from "../../../utils/auth"

export default function LoginPage() {
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const handleSubmit = async (e) => {
            e.preventDefault()
            if(password ==="" || email==="") {
                return
            }
            try {
                await loginUser(email, password)
                alert("Login realizado com sucesso!")
            }
            catch (e) {
                alert("Login não pode ser realizado.")
            }
        }

    return (
        <div  className="min-h-screen bg-gray-100 items-center flex flex-col justify-center">
             <form onSubmit={handleSubmit} className="bg-gray-600 p-8 flex flex-col rounded-lg">

                <label>E-mail</label>
                <input className="text-white-600" type="text" value={email} required onChange={(e)=>{setEmail(e.target.value)}}/>
                <br/>

                <label>Senha</label>
                <input className="text-white-600" type="password" value={password} required onChange={(e)=>{setPassword(e.target.value)}}/>
                <br/>

                <button className="bg-blue-400 p-1 rounded-sm" type="submit">Entrar</button>
            </form>
        </div>
    )
}