<h1>
  Pizol Academy
</h1>

**A Pizol Academy** foi criado para a entrega do teste técnico da empresa A RECREATIVA

## Ferramentas utilizadas no FRONTEND

Para criação do FRONTEND, utilizei as tecnologias solicitadas.

- React.JS
- TypeScript
- Ant Design

# Como utilizar

## Api

Primeiramente, crie uma pasta em um local de sua preferência. 

Agora, clone este repositório com o comando:
- git clone https://github.com/LucasPizol/pizol-academy/ --branch api ./api

Agora, crie um arquivo .env no diretório da pasta api, e inclua as seguintes variáveis de ambiente:

- DATABASE_URL= "URI do seu DB postgres"
- JSON_TOKEN= "Uma string aleatória para seu autenticador"
- BUCKET_NAME= "Nome do seu bucket AWS S3"
- AWS_ACCESS_KEY_ID= "Chave de acesso do seu usuário IAM"
- AWS_SECRET_ACCESS_KEY="Chave secreta de acesso do seu usuário IAM"
- AWS_DEFAULT_REGION="Região do seu bucket"

Lembre-se de criar seu banco de dados, seja ele web ou local.

Agora, utilize estes comandos na sequência:
1. npm install
2. npm install -g tsx (caso não tenha instalado)
3. npx prisma migrate dev
4. npx prisma db seed (caso o passo 3 não tenha executado este comando)
5. npm run dev

## FrontEnd

Na pasta em que você criou anteriormente, clone também esta branch:

- git clone https://github.com/LucasPizol/pizol-academy --branch frontend ./frontend

Agora, crie um arquivo .env no diretório da pasta frontend, e inclua as seguintes variáveis de ambiente:

- VITE_BASE_URL = "Link da sua api"

Rodando local, sera algo como http://localhost:3000

Feito isso, execute o comando "npm install" para instalar todas as dependências

Agora, execute o comando "npm run dev" e seu frontend estará rodando.

# Fluxo de utilização do sistema
Para utilizar o projeto, siga o passo a passo:

### Professor
1. Com o projeto rodando e aberto no navegador, crie seu usuário.
2. Após criar o usuário, crie uma sala de aula.
3. Após criada, você vera uma tabela vazia, e logo acima um código aleatório de 7 caracteres, que é o que você enviará para um estudante/aluno.
4. Crie uma nova atividade, clicando no botão "+ Novo", à direita
5. Digite nos campos e clique em Submeter.
6. Aparecerá na sua tela a atividade criada, onde você pode fazer o download.
7. Há também o botão "DESATIVAR" em vermelho, que, ao clicar, os alunos não poderão mais ver esta atividade.
8. Há três pontinhos na última coluna onde é possível editar e listar as atividades entregues pelos alunos

### Aluno
1. Com o projeto rodando e aberto no navegador, crie seu usuário.
2. Após criar o usuário, solicite o código da sala ao professor, clique em "Entrar em sala existente" e cole.
3. Agora, você poderá ver a classe, e clicando, verá as atividades abertas.
4. Você pode clicar em "ENTREGAR" e enviar a atividade, selecionando de seu computador ou arrastando até a tela.
5. Caso o professor desative a atividade, você não poderá mais vê-la, a menos que ele reabra.
