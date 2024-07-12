import { useRecoilValue } from "recoil";
import { authCheck } from "../store/auth";

const auth = () => {
    return useRecoilValue(authCheck);
}
export default auth;