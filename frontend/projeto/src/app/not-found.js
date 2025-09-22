"use client"
import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NotFoundPage() {
    const router = useRouter()

    return (
        <div className="min-h-screen bg-[#20053c] relative overflow-hidden flex items-center justify-center">

            {/* Blob/Onda no topo */}
            <div className="absolute top-0 right-0 w-full overflow-hidden leading-none z-0">
                <svg
                    className="relative block w-full h-48"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 300"
                    preserveAspectRatio="none"
                >
                    <path
                        fill="#eca390"
                        fillOpacity="1"
                        d="M1440,80 C1300,60 1200,40 1000,50 C800,60 600,80 400,70 C200,60 100,40 0,30 L0,0 L1440,0 Z"
                    />
                </svg>
            </div>

            {/* Blob/Onda na parte inferior */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
                <svg
                    className="relative block w-full h-64"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 400"
                    preserveAspectRatio="none"
                >
                    <path
                        fill="#eca390"
                        fillOpacity="1"
                        d="M0,250 C200,200 400,150 600,170 C800,190 1000,230 1200,210 C1300,200 1400,190 1440,180 L1440,400 L0,400 Z"
                    />
                </svg>
            </div>



            {/* Conteúdo Principal */}
            <div className="relative z-10 text-center max-w-lg px-6">

                {/* Título 404 */}
                <h1 className="text-8xl font-bold text-[#eca390] mb-4">
                    404
                </h1>

                {/* Título principal */}
                <h2 className="text-4xl font-bold text-white mb-4">
                    Você disse... Zoombi?
                </h2>

                {/* Subtítulo  */}
                <p className="text-lg text-white/80 mb-8 leading-relaxed">
                    Parece que você se perdeu no apocalipse acadêmico!
                    <br />
                    Esta página não existe ou foi devorada pela horda de trabalhos atrasados :(
                </p>

                {/* Texto adicional */}
                <div className="text-sm text-white/60 mb-8">
                    <p>Página não encontrada.</p>
                    <p className="mt-1">Talvez você tenha digitado o endereço errado?</p>
                </div>

                {/* Botões de ação */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={() => router.back()}
                        className="w-full sm:w-auto px-8 py-3 border-2 border-[#eca390] text-[#eca390] hover:bg-[#eca390] hover:text-[#20053c] font-semibold rounded-2xl transition-all duration-200 transform hover:scale-[1.02]"
                    >
                        ← VOLTAR
                    </button>

                    <Link href="/">
                        <button className="w-full sm:w-auto px-8 py-3 bg-[#eca390] hover:bg-[#d78c86] text-[#20053c] font-semibold rounded-2xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg">
                            IR PARA HOME
                        </button>
                    </Link>
                </div>


            </div>
        </div>
    )
}