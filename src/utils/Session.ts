

import { auth, signOut } from "@/auth"
export const isLoggedin = async () =>{
    const session: any = await auth();
    if(session){
        return true;
    }
    return false;

}