

import LoginComponent from "@/components/login-component";
import { getCurrentProfile } from "@/lib/getCurrentProfile";
import {redirect} from 'next/navigation'


type Props = {};

const page = async(props: Props) => {

    const currentProfile = await getCurrentProfile()

    if(currentProfile) return redirect('/')


    return (
        <LoginComponent />
    )
}

export default page;
