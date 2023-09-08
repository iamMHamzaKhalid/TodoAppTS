import { Request, Response } from 'express';
import { getUsers, postUser } from '../database/database';


const httpGetUsers = async (req: Request, res: Response) => {

    return res.status(200).json(await getUsers())

}
const httpPostUsers = async (req: Request, res: Response) => {
    const user = req.body;
    console.log(user);
    if (!user.username || !user.password) {
        res.status(400).json({ error: 'Bad Request! Missing username or password' });
    }
    else {
        if (await postUser(user)) {
            res.status(201).json({ message: 'User created successfully' });
        }
    }
}
export { httpGetUsers, httpPostUsers }