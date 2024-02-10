<h1>
  Pizol Academy
</h1>

**A Pizol Academy** foi criado para a entrega do teste técnico da empresa A RECREATIVA

## Ferramentas utilizadas na API

Para criação da API, utilizei as tecnologias solicitadas no backend.
- Node.js
- TypeScript
- Prisma ORM
- Json Web Token
- Express.js

Sem contar as funcionalidades como armazenar um arquivo no servidor.

## Como utilizar

Primeiramente, crie uma pasta em um local de sua preferência. 

Agora, clone este repositório com o comando:
- git clone https://github.com/LucasPizol/pizol-academy/ --branch api ./api

Agora, crie um arquivo .env no diretório da pasta api, e inclua as seguintes variáveis de ambiente:

- DATABASE_URL= "URI do seu DB postgresql"
- JSON_TOKEN= "Uma string aleatória para seu autenticador"

Lembre-se de criar seu banco de dados, seja ele web ou local.

Agora, utilize estes comandos na sequência:
1. npm install
2. npx prisma migrate dev
3. npx prisma db seed
4. npm run dev
