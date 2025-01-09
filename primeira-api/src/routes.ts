import { Router, Request, Response, NextFunction } from 'express'

const router = Router();

// Exemplo: http://localhost:3333/tarefas

// Query Params ?nome=Comprar pao
// http://localhost:3333/tarefas?nome=Comprar pao

// Route Params /tarefas/2
// Request Body {nome: "Comprar Pao", "usuario":123}

const tarefas = ["Estudar Node JS", "Estudar Javascript"];

/* Entendendo Middlewares

 - Está ali no meio após chamar a requisição e antes e chamar o callback

*/
//MIDDLAWARE
router.use((req: Request, res: Response, next:NextFunction) => {
    console.log("PASSOU PELO MIDDLEWARE GLOBAL")

    return next();
})

function checkTarefa(req: Request, res: Response, next: NextFunction) {

        if (!req.body.nome) {
            res.status(400).json({ error: "Nome Invalido / Faltando nome" });
            return
    }

    return next();
}

function chekIndexTarefa(req: Request, res: Response, next: NextFunction) {
    
    const tarefa = tarefas[Number(req.params.id)];

    if (!tarefa) {
         res.status(400).json({ error: "Tarefa não encontrada!" });
        return;
    }

    return next();

}

//FIM DO MIDDLEWARE

router.get("/teste", (req: Request, res: Response) => {
    // res.send("Minha primeira API");

    res.json({message:"Minha Primeira Api", aluno:"Alessandro Schuquel Pedroso"})
})

//Listar todas tarefas
router.get("/tarefas", (req: Request, res: Response) => {
    res.send(tarefas);
})

//Listar unica tarefa
router.get("/tarefas/:index", (req: Request, res: Response) => {
    const index = req.params.index;
    res.json({tarefas:tarefas[Number(index)]})
})

router.get("/tarefas", (req: Request, res: Response) => {
    // res.send("Minha primeira API");
    //http://localhost:3333/tarefas?nome=Comprar pao
    const nome = req.query.nome;
    res.json({tarefa:nome})
})

router.get("/tarefas/:id", (req: Request, res: Response) => {
    // res.send("Minha primeira API");
    //http://localhost:3333/tarefas/5
    const id = req.params.id;
    res.json({tarefa: `Tarefa com id: ${id}`})
})

//Cadastrar nova tarefa
router.post("/tarefas", checkTarefa, (req: Request, res: Response) => {
    // res.send("Minha primeira API");
    const { nome } = req.body as { nome: string }

    // if (!nome) {
    //     res.status(400).json({ message: "Erro ao cadastrar" })
    //     return;
    // }

    tarefas.push(nome)
    res.json(tarefas)
})

//Atualizar uma unica tarefa
router.put("/tarefas/:id", checkTarefa, chekIndexTarefa, (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome } = req.body;

    tarefas[Number(id)] = nome;

    res.json(tarefas);
})

//Deletar uma unica tarefa
router.delete("/tarefas/:id", chekIndexTarefa, (req: Request, res: Response) => {
    
    const { index } = req.params;

    tarefas.splice(Number(index), 1);

    res.json({message:"Tarefa Deletada com sucesso!"})
})
export { router };