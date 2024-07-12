import { detailsAtom } from "../store/detailsAtom";
import { useRecoilValue } from "recoil";


const details=()=>{
    return useRecoilValue(detailsAtom)
}
export default details;