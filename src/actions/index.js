export const addTodo = (data) => {
    return {
      type: "ADD_TODO",
      payload: {
        id: new Date().getTime().toString(),
        data: data,
        completed: false
      }
    }
  }
  
  export const deleteTodo = (id) => {
    return {
      type: "DELETE_TODO",
      id
    }
  }
  
  export const removeTodo = () => {
    return {
      type: "REMOVE_TODO"
    }
  }
  
  export const toggleTodoCompleted = (id) => {
    return {
      type: "TOGGLE_TODO_COMPLETED",
      id
    };
  };
  
  export const loadTodoList = (data) => {
    return {
      type: "LOAD_TODO_LIST",
      payload: data
    };
  };
  