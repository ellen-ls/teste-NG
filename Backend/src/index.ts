import app from "./controller/app"
import { userRouter } from "./Routers/router"

app.use('/user', userRouter)


