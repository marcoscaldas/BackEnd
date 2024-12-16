const express = require("express"); 
const router = express.Router();
const cors = require("cors");
router.use(cors());

const dbKnex = require("./data/db_config"); 


router.get("/", async (req, res) => {
    try {       
        const livros = await dbKnex("livros").orderBy("id", "desc");
        res.status(200).json(livros); 
    } catch (error) {
        res.status(400).json({ msg: error.message });
        
    }
});

// INCLUSÃO
router.post("/", async (req, res) => {
    
    const { titulo, autor, ano, preco, foto } = req.body;
   
    if (!titulo || !autor || !ano || !preco || !foto) {
        res.status(400).json({ msg: "Enviar titulo, autor, ano, preco e foto do livro" });
        return;
    }
    
    try {        
        const novo = await dbKnex("livros").insert({ titulo, autor, ano, preco, foto });
        res.status(201).json({ id: novo[0] }); 
    } catch (error) {
        res.status(400).json({ msg: error.message }); 
    }
});

// ALTERAÇÃO
router.put("/:id", async (req, res) => {
    const id = req.params.id; 
    const { preco } = req.body; 
    try {
       
        await dbKnex("livros").update({ preco }).where("id", id); 
        res.status(200).json(); 
    } catch (error) {
        res.status(400).json({ msg: error.message }); 
    }
});

// EXCLUSÃO
router.delete("/:id", async (req, res) => {
    const { id } = req.params; 
    try {
        await dbKnex("livros").del().where({ id });
        res.status(200).json(); 
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});

// --- Filtro por título ou autor
router.get("/filtro/:palavra", async (req, res) => {
    const palavra = req.params.palavra;
    try {
      
        const livros = await dbKnex("livros")
            .where("titulo", "like", `%${palavra}%`)
            .orWhere("autor", "like", `%${palavra}%`);
        res.status(200).json(livros); 
    } catch (error) {
        res.status(400).json({ msg: error.message }); 
    }
});

// --- Resumo do cadastro de livros
router.get("/dados/resumo", async (req, res) => {
    try {      
      const consulta = await dbKnex("livros")
        .count({ num: "*" })
        .sum({ soma: "preco" })
        .max({ maior: "preco" })
        .avg({ media: "preco" });
      const { num, soma, maior, media } = consulta[0];
      res.status(200).json({ num, soma, maior, media: Number(media.toFixed(2)) });
    } catch (error) {
      res.status(400).json({ msg: error.message }); 
    }
  });

  // ---Soma dos preços, agrupados por ano
  router.get("/dados/grafico", async (req, res) => {
    try {    
      const totalPorAno = await dbKnex("livros").select("ano")
        .sum({ total: "preco" }).groupBy("ano");
      res.status(200).json(totalPorAno);
    } catch (error) {
      res.status(400).json({ msg: error.message }); 
    }
  });



module.exports = router;
