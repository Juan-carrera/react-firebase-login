export function Alert({message}) {
    return (
        <div className="bg-red-100 border border-red-400 text-red-700 rounded absolute top-40   text-center ">
            <span className=""> {message} </span>
        </div>
    )
}