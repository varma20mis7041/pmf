import express from 'express'
import templateRoutes from '../routeModules/Templates/templateRoutes'
import assignmentRoutes from '../routeModules/Assignments/assignmentRoutes'
import attemptsRoutes from '../routeModules/Attempts/attemptsRoutes'
const router = express.Router();

router.use('/templates',templateRoutes)
router.use("/assignments",assignmentRoutes)
router.use('/attempts',attemptsRoutes)



export default router;