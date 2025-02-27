import express from 'express'
import { renderLogin,
    renderRegister,
    registerStudent,
    loginStudent,
    renderDashboard,
     updateStudent,
    deleteStudent} from '../controller/studentController';
const router=express.Router()


router.get('/login', renderLogin);
router.get('/register', renderRegister);
router.post('/register', registerStudent);
router.post('/login', loginStudent);
router.get('/dashboard', renderDashboard);
router.post('/student/update/:id',  updateStudent);
router.post('/student/delete/:id',  deleteStudent);

export default router;