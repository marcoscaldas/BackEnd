exports.seed = function (knex) {
  return knex("livros").del()
      .then(function () {
        return knex("livros").insert([
          {
    "titulo": "Design Gráfico: Teoria e Prática",
    "autor": "Lucas Pereira Martins",
    "ano": 2018,
    "preco": 120.0,
    "foto": "https://via.placeholder.com/150"
  },
  {
    "titulo": "Desenvolvimento Web Completo",
    "autor": "Ana Clara Silva Souza",
    "ano": 2020,
    "preco": 90.0,
    "foto": "https://via.placeholder.com/150"
  },
  {
    "titulo": "HTML e CSS: Desenvolvendo Sites",
    "autor": "Rafael Almeida Costa",
    "ano": 2013,
    "preco": 92.0,
    "foto": "https://via.placeholder.com/150"
  },
  {
    "titulo": "JavaScript: O Guia Definitivo",
    "autor": "Juliana Santos Oliveira",
    "ano": 2021,
    "preco": 150.0,
    "foto": "https://via.placeholder.com/150"
  },
  {
    "titulo": "JavaScript e JQuery: Desenvolvimento Web Interativo",
    "autor": "Eduardo Henrique Lima",
    "ano": 2014,
    "preco": 105.0,
    "foto": "https://via.placeholder.com/150"
  },
        ])
      })
  }
  