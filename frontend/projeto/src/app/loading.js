export default function Loading() {
    return (
        <div className="min-h-screen bg-[#20053c] relative overflow-hidden flex items-center justify-center">

            {/* Conteúdo Principal */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center">
                {/* Título */}
                <h1 className="text-4xl font-semibold text-white mb-6">
                    Reanimando...
                </h1>

                {/* Spinner */}
                <div className="relative">
                    <div className="animate-spin h-12 w-12 rounded-full border-4 border-[#eca390] border-t-transparent"></div>
                    <div className="absolute inset-1 animate-spin h-10 w-10 rounded-full border-4 border-white/30 border-b-transparent" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                </div>

                {/* Texto */}
                <h6 className="mt-6 text-white/70 text-sm">
                     Acordando os neurônios acadêmicos...
                </h6>
            </div>
        </div>
    )
}