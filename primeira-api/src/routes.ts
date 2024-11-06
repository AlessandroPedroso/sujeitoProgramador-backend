import { Router, Request, Response } from 'express'

const router = Router();

// Exemplo: http://localhost:3333/taeras

router.get("/tarefas", (req: Request, res: Response) => {
    // res.send("Minha primeira API");

    res.json({message:"Minha Primeira Api", aluno:"Alessandro Schuquel Pedroso"})
})

export { router };