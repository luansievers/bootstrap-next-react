import { redirect } from "next/navigation"


export default function RootPage() {
    // TODO: Check for authentication
    if (true) {
        redirect('/authentication')
    }
}