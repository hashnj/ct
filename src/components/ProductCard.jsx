export const ProductCard=({ image, title, description, price,vendor, vendoor })=>{
    return (
        <>
        <div className="max-w-xs rounded bg-background cursor-pointer px-6 pt-2 overflow-hidden shadow-text shadow-[0_0_10px] m-4">
            <div className="my-auto ">
                <img className="rounded-xl h-80 mx-auto" src={image} alt={title} />
            <div className="px-6 py-4 text-center">
                <div className="font-bold text-text text-xl mb-2">{title}</div>
                <p className="text-text/40 font-thin text-base mb-2">{description}</p>
                <p className="text-text/40 font-thin hover:text-primary text-sm underline-offset-2 underline mb-2" onClick={vendoor}>{vendor}</p>
                <p className="text-primary text-base">${price}</p>
            </div>
            </div>
        </div>
        </>
    )
}