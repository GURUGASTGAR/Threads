import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "../ui/button"
import { signOut } from "next-auth/react"
  

export default function SignoutBtn() {
   
    const logout = ()=>{
        signOut({callbackUrl:"/login",redirect:true})
    }

  return (
    <div>
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size='sm' className='mr-10'>Sign out</Button>
                </AlertDialogTrigger>
        
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        Once Logged Out. Need to Log back in for accessing the content
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction className="bg-red-400" onClick={logout}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    </div>
  )
}
