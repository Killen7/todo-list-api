import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Users } from './entities/Users'
import { Exception } from './utils'
import { Tareas } from './entities/Tareas'

export const createUser = async (req: Request, res: Response): Promise<Response> => {

    // important validations to avoid ambiguos errors, the client needs to understand what went wrong
    if (!req.body.first_name) throw new Exception("Please provide a first_name")
    if (!req.body.last_name) throw new Exception("Please provide a last_name")
    if (!req.body.email) throw new Exception("Please provide an email")
    if (!req.body.password) throw new Exception("Please provide a password")

    const userRepo = getRepository(Users)
    // fetch for any user with this email
    const user = await userRepo.findOne({ where: { email: req.body.email } })
    if (user) throw new Exception("Users already exists with this email")

    const newUser = getRepository(Users).create(req.body);  //Creo un usuario
    const results = await getRepository(Users).save(newUser); //Grabo el nuevo usuario 
    return res.json(results);
}

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    const users = await getRepository(Users).find();
    return res.json(users);
}

export const createTarea = async (req: Request, res: Response): Promise<Response> => {

    // important validations to avoid ambiguos errors, the client needs to understand what went wrong
    if (!req.body.name) throw new Exception("Please provide a name")

    const userRepo = getRepository(Users)
    const user = await userRepo.findOne(req.params.userId)
    if (!user) throw new Exception("User not exist")
    let tarea = new Tareas()
    tarea.name = req.body.name
    tarea.users = user.id

    const results = await getRepository(Tareas).save(tarea); //Grabo la nueva tarea
    return res.json(results);
}

export const getTarea = async (req: Request, res: Response): Promise<Response> => {

    const tareasRepo = getRepository(Tareas)
    const tareas = await tareasRepo.find({ where: { users: req.params.userId } });
    return res.json(tareas);
}

export const putTarea = async (req: Request, res: Response): Promise<Response> => {
    const tareas = await getRepository(Tareas).findOne({ where: { users: req.params.userId } });
    return res.json(tareas);
}

export const deleteTarea = async (req: Request, res: Response): Promise<Response> => {
    const tareasRepo = getRepository(Tareas)
    const tareas = await tareasRepo.find({ where: { users: !req.params.userId } });
    return res.json(tareas);
}
