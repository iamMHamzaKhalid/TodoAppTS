import { Request, Response } from 'express';
import { getUsers, postUser, createOrRetrieveSession, validateUserCredentials } from '../database/database';

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

const httpLogin = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ error: 'Bad Request! Missing username or password' });
    }
    else {
        // Validate user credentials (this is a basic example, consider hashing passwords in production)
        const userId = await validateUserCredentials(username, password);

        if (!userId) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const { token, message } = await createOrRetrieveSession(userId);

        res.status(200).json({ message, token });

    }
};



export { httpGetUsers, httpPostUsers, httpLogin }