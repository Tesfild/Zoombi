"use client"
import React, { useState } from "react"
import { registerUser } from "../../../utils/auth"
import Link from "next/link"

export default function RegisterPage() {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (userName === "" || password === "" || email === "") {
            return
        }
        try {
            await registerUser(email, password, userName)
            alert("Usuário registrado!")
        } catch (e) {
            alert("Usuário não pode ser registrado")
        }
    }

    return (
        <div className="min-h-screen bg-[#20053c] relative overflow-hidden flex items-center justify-center">

            {/* Blob/Onda no topo */}
            <div className="absolute top-0 right-0 w-full overflow-hidden leading-none z-0">
                <svg
                    className="relative block w-full h-70"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 200"
                    preserveAspectRatio="none"
                >
                    <path
                        fill="#eca390"
                        fillOpacity="1"
                        d="M1440,120 C1300,80 1200,40 1000,60 C800,80 600,120 400,100 C200,80 100,40 0,20 L0,0 L1440,0 Z"
                    />
                </svg>
            </div>

            {/* Blob/Onda na parte inferior */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
                <svg
                    className="relative block w-full h-135"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 200"
                    preserveAspectRatio="none"
                >
                    <path
                        fill="#eca390"
                        fillOpacity="1"
                        d="M0,200 C200,150 400,100 600,120 C800,140 1000,180 1200,160 C1300,150 1400,140 1440,130 L1440,600 L0,600 Z"
                    />
                </svg>
            </div>

            {/* Conteúdo principal */}
            <div className="relative z-10 w-full max-w-md px-0">
                <div className="text-left mb-16">
                    <h1 className="text-6xl font-bold text-white mb-3">Pronto(a) para ser Zoombi?</h1>
                    <h6 className="text-white text-lg">Crie sua conta e faça parte da família.</h6>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Input do Nome de Usuário */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full pl-10 pr-4 py-5 bg-white/90 backdrop-blur-sm rounded-3xl border-0 text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-purple-1000 focus:outline-none transition-all duration-200"
                            placeholder="Nome de usuário"
                            required
                        />
                    </div>

                    {/* Input do Email */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-5 bg-white/90 backdrop-blur-sm rounded-3xl border-0 text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-purple-1000 focus:outline-none transition-all duration-200"
                            placeholder="E-mail"
                            required
                        />
                    </div>

                    {/* Input da Senha */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-5 bg-white/90 backdrop-blur-sm rounded-3xl border-0 text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-purple-1000 focus:outline-none transition-all duration-200"
                            placeholder="Senha"
                            required
                        />
                    </div>

                    {/* Botão de Cadastrar */}
                    <button
                        type="submit"
                        className="w-full py-4 bg-[#eca390] hover:bg-[#d78c86] text-[#20053c] font-semibold rounded-2xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#b8a6d9] focus:ring-offset-2 focus:ring-offset-[#eca390] shadow-lg"
                    >
                        CADASTRAR
                    </button>

                    {/* Link para o Login */}
                    <p className="text-center text-white-100 text-sm">
                        Já é um Zoombi?{" "}
                        <Link href={"/login"}>
                            <button type="button" className="text-[#eca390] font-semibold hover:underline">
                                ENTRE
                            </button>
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}