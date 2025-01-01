import express from 'express'
import templateRoutes from '../routeModules/Templates/templateRoutes'
import assignmentRoutes from '../routeModules/Assignments/assignmentRoutes'
const router = express.Router();

router.use('/templates',templateRoutes)
router.use("/assignments",assignmentRoutes)



export default router;