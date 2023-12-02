import { Router } from "express";
import UserController from '../controllers/user'
import multer from "multer";
const router = Router();
// create user

const DIR = '../public/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR)
    },
    filename: (req, file, cb) => {
        const filename = file.originalname.toLowerCase().split(" ").join('-');
        cb(null, "react_developer" + "-" + filename)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == 'image/png' || file.mimetype == "image/jpg" || file.mimetype == 'image/jpeg') {
            cb(null, true)
        } else {
            cb(null, false)
            return cb(new Error("Faqat .png, .jpg yoki .jpeg formatda yuklashingiz mumkin!"))
        }
    }
})
router.post('/create', upload.single("avatar"), UserController.createUser)
// get all users
router.get('/', UserController.getAllUser)
// getById user
router.get("/:id", UserController.getById)
// delete user
router.delete("/:id", UserController.deleteUser)
// update user
router.put('/:id', UserController.updateUser)
export default router;
