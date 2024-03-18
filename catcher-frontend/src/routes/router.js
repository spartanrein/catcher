import {
    createBrowserRouter,
} from "react-router-dom"
import App from "../App"
import TopScores from "../pages/TopScores"
import CatcherGame from "../pages/CatcherGame"

export const router = createBrowserRouter([
    {
        path:'/',
        element: <App/>,
    },
    {
        path:'/topscores',
        element: <TopScores/>
    },
    {
        path:'/game',
        element: <CatcherGame/>,
    }
])

export default router
