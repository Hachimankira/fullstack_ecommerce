import { UserButton } from "@clerk/nextjs";

const SetupPage = () =>{
    return(
        <div className="p-4">
            <UserButton afterSignOutUrl="/"/>
            This is a protected route!
        </div>
    );
}

export default SetupPage;