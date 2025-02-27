import {Request,Response} from 'express';
import {Student} from '../models/studentModel'
import bcrypt from 'bcryptjs';

export const renderLogin=(req:Request,res:Response)=>{
    res.render('login')
}

export const renderRegister = (req: Request, res: Response) => {
    res.render('register');
  };

  export const registerStudent = async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
  
      const existingStudent = await Student.findOne({ email });
      if (existingStudent) {
        return res.render('register', { error: 'Email already registered' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const student = new Student({
        name,
        email,
        password: hashedPassword
      });
  
      await student.save();
      res.redirect('/login');
    } catch (error) {
      res.render('register', { error: 'Registration failed' });
    }
  };
  
  export const loginStudent = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
  
      const student = await Student.findOne({ email });
      if (!student) {
        return res.render('login', { error: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, student.password);
      if (!isMatch) {
        return res.render('login', { error: 'Invalid credentials' });
      }
  
      (req.session as any).studentId = student._id;
      res.redirect('/dashboard');
    } catch (error) {
      res.render('login', { error: 'Login failed' });
    }
  };

  export const renderDashboard = async (req: Request, res: Response) => {
    try {
      const students = await Student.find().select('-password');
      res.render('dash', { students });
    } catch (error) {
      res.status(500).send('Error fetching students');
    }
  };

  export const updateStudent = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, email } = req.body;
  
      await Student.findByIdAndUpdate(id, { name, email });
      res.redirect('/dashboard');
    } catch (error) {
      res.status(500).send('Error updating student');
    }
  };
  
  export const deleteStudent = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await Student.findByIdAndDelete(id);
      res.redirect('/dashboard');
    } catch (error) {
      res.status(500).send('Error deleting student');
    }
  };
  