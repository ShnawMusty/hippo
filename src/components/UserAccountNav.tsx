'use client'

import { User } from "../payload-types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import Link from "next/link"
import { Button } from "./ui/button"
import { useAuth } from "@/hooks/useAuth"

const UserAccountNav = ({user}: {user: User}) => {

  const { signOut } = useAuth()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">My account</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white w-60" align="end">
        <div className="flex flex-col p-2">
          <p className="font-medium text-black leading-none">{user?.email}</p>
        </div>
        <DropdownMenuSeparator/>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/sell">Seller Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={signOut}  className="cursor-pointer">
            Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAccountNav