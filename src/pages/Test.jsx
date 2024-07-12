import { useEffect } from "react"
import { ProductCard } from "../components/ProductCard"
import { themeState } from "../store/atoms"
import { useRecoilValue } from "recoil"

export const Test=()=>{
    const theme = useRecoilValue(themeState)
    useEffect(()=>{
        document.body.classList = theme;
    },[])
    const vendoor=()=>{
        
    }
    return(
    <>
    <div className="grid bg-background h-full grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">

    <ProductCard 
    image={'https://th.bing.com/th/id/OIP.jMPgGCP2EY_2E56Eu5hsmwHaIP?rs=1&pid=ImgDetMain'} 
    title={'Product'} 
    description={'Cheap and Quality water'} 
    vendoor={vendoor} 
    vendor={'Water Co. pvt. ltd.'} 
    price={0.2} />
    <ProductCard 
    image={'https://th.bing.com/th/id/OIP.K6zSQQFU1uXYxyuoPigztQHaOc?rs=1&pid=ImgDetMain'} 
    title={'Product'} 
    description={'Cheap and Quality water'} 
    vendoor={vendoor} 
    vendor={'Water Co. pvt. ltd.'} 
    price={1.4} />
    <ProductCard 
    image={'https://th.bing.com/th/id/R.12e29f5a8e7b4883be68532d1517c356?rik=%2fK%2b0tMb5h1o2cg&riu=http%3a%2f%2fwww.freepngimg.com%2fdownload%2fcocacola%2f24-coca-cola-bottle-png-image.png&ehk=a2MxWV%2fTliVfbRfVvXsV7arrSP%2bfN4NJ0JhE5y2nblg%3d&risl=&pid=ImgRaw&r=0'}
    title={'Product'}
    description={'Cheap and Quality water'} 
    vendoor={vendoor} 
    vendor={'Water Co. pvt. ltd.'} 
    price={1.2} />
    </div>
    </>
    )
}