import { detailsSelector } from "../store/detailsAtom";
import { useRecoilValue } from "recoil";


const details=()=>{
    return useRecoilValue(detailsSelector);
}
export default details;