export default function Loading() {
    return (
        <div className="flex h-screen items-center justify-center flex-col">
            <h1 className="text-xl font-semibold">Carregando...</h1>
            <div className="animate-spin mt-4 h-10 w-10 rounded-full border-4 border-gray-300 border-t-gray-900"></div>
        </div>
    )
}
