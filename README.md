
## Stack
React.

## Requisitos

### Requisitos Funcionais (RFs):

- [ X ] Deve ser possivel adicionar uma tarefa;
- [ X ] Deve ser possivel excluir a tarefa atraves do botao direito do mouse;
- [ X ] Deve ser possivel marcar uma tarefa como importante e ela ir para essa sessao;
- [ X ] Deve ser possivel completar a tarefa e isso ser exposto claramente ao usuario
- [ X ] Deve ser possivel editar as tarefas
- [ ] Ter uma parte em que indica pro usuario comando automatizados para ele conseguir excluir, editar, marcar como importante com apenas 1 click em uma tecla.

## Regras de Negocio (RNs):

- [ X ] Aparecer na sessao de importantes apenas tarefas completadas
- [ X ] Adicionar apenas tarefas unicas
- [ X ] Conseguir editar apenas tarefas que nao estiverem completadas
- [ X ] Conseguir excluir qualquer tarefa
- [ ] ...? feature

## Requisitos nao Funcionais (RNFs):

- [ X ] Usar o localStorage para interagir com as tarefas.

## Requisitos de codigo

- Tratamento de erros
- Boa nomeacao de variaveis
- Evitar logica repetitiva
- Comentarios que explicam cada funcionalidade

## Componentes que precisam que seus codigos sejam refatorados

- [ X ] App
- [ ] AddTask
- [ ] Tasks
- [ X ] Important
- [ X ] HomeTasks 
- [ ] TaskComponent

## Lembretes 
- Refatorar o codigo
- Lembrar de sempre fazer const = () =>
- Pensar sempre em como melhorar o codigo

## Bugs 
- Arrumar options ao clicar no botao direito

## Melhorias
- Melhorar a navegacao entre my day e importants (deixar mais suavizada)
- Ter uma ideia de como melhorar essa animacoes (acho que vou tirar)
- Buscar inspiracoes para ficar mais bonito
- Decidir uma nova feature para comecar a trabalhar nessa (apos refatorar o codigo)
- Separar uma parte apenas para os importants assim como tem uma parte para os completados
- FAZER UMA FUNCTION PARA LOCALSTORAGE, ISSO VAI OTIMIZAR MUITO O CODIGO
- FAZER A PARTE DA BOX DE COMPLETED PARA ABRIR E FECHAR COM A ARROW SINALIZANDO 