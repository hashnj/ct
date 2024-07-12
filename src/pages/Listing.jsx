import { Nav } from "../components/Nav"
import { SideBar } from "../components/SideBar"

export const Listing=()=>{
    return(
        <div className="w-screen h-screen text-text flex justify-center items-center bg-backgrounds">
            <Nav/>
            <SideBar top='Your-Listings'/>
            Listings
        </div>
    )
}