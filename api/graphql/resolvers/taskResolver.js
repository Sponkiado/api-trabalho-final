// api/graphql/resolvers/taskResolver.js
const { tasks } = require("../../models/taskModel");

const taskResolver = {
  Query: {
    tasks: (_, __, { user }) => {
      // Validar autenticação
      if (!user) throw new Error("Não autenticado");

      // Retorna apenas tarefas do usuário logado
      return tasks.filter(t => t.userId === user.id);
    },
  },

  Mutation: {
    createTask: (_, { title }, { user }) => {
      if (!user) throw new Error("Não autenticado");

      // Verifica limite de 10 tarefas abertas
      const openTasks = tasks.filter(t => t.userId === user.id && !t.completed);
      if (openTasks.length >= 10) throw new Error("Limite de 10 tarefas abertas atingido");

      const newTask = {
        id: tasks.length + 1,
        title,
        completed: false,
        userId: user.id,
      };

      tasks.push(newTask);
      return newTask;
    },

    completeTask: (_, { id }, { user }) => {
      if (!user) throw new Error("Não autenticado");

      const task = tasks.find(t => t.id == id && t.userId === user.id);
      if (!task) throw new Error("Tarefa não encontrada");

      task.completed = true;
      return task;
    },

    deleteTask: (_, { id }, { user }) => {
      if (!user) throw new Error("Não autenticado");

      const index = tasks.findIndex(t => t.id == id && t.userId === user.id);
      if (index === -1) throw new Error("Tarefa não encontrada");

      tasks.splice(index, 1);
      return "Tarefa deletada com sucesso";
    },
  },
};

module.exports = taskResolver;
