import { useMemo, useState } from "react";

const initialTodos = [
  { id: 1, text: "Prepare React machine coding round", completed: false },
  { id: 2, text: "Practice state updates", completed: true },
];

function TodoApp() {
  const [todos, setTodos] = useState(initialTodos);
  const [todoText, setTodoText] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const filteredTodos = useMemo(() => {
    if (filter === "active") {
      return todos.filter((todo) => !todo.completed);
    }

    if (filter === "completed") {
      return todos.filter((todo) => todo.completed);
    }

    return todos;
  }, [filter, todos]);

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - activeCount;

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedTodo = todoText.trim();

    if (!trimmedTodo) {
      return;
    }

    setTodos((currentTodos) => [
      {
        id: Date.now(),
        text: trimmedTodo,
        completed: false,
      },
      ...currentTodos,
    ]);
    setTodoText("");
  };

  const toggleTodo = (todoId) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (todoId) => {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== todoId),
    );
  };

  const updateTodo = (todo) => {
    setEditingTodoId(todo.id);
    setEditingText(todo.text);
  };

  const cancelUpdate = () => {
    setEditingTodoId(null);
    setEditingText("");
  };

  const saveUpdatedTodo = (todoId) => {
    const trimmedTodo = editingText.trim();

    if (!trimmedTodo) {
      return;
    }

    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === todoId ? { ...todo, text: trimmedTodo } : todo,
      ),
    );
    cancelUpdate();
  };

  const handleUpdateKeyDown = (event, todoId) => {
    if (event.key === "Enter") {
      saveUpdatedTodo(todoId);
    }

    if (event.key === "Escape") {
      cancelUpdate();
    }
  };


  return (
    <main className="grid min-h-screen place-items-center bg-[#f5f7fb] bg-[radial-gradient(circle_at_top_left,rgba(44,182,125,0.18),transparent_30%)] px-4 py-8 text-[#172033]">
      <section
        className="w-full max-w-[620px] rounded-lg border border-slate-200 bg-white p-5 shadow-[0_24px_70px_rgba(27,39,62,0.14)] sm:p-7"
        aria-labelledby="todo-title"
      >
        <div className="mb-6">
          <p className="mb-2 text-[13px] font-bold uppercase text-emerald-700">
            Machine Coding Practice
          </p>
          <h1 id="todo-title" className="text-4xl leading-tight font-bold">
            Todo App
          </h1>
          <p className="mt-2.5 text-slate-500">
            {activeCount} active task{activeCount === 1 ? "" : "s"}
          </p>
        </div>

        <form
          className="grid gap-2.5 sm:grid-cols-[1fr_auto]"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={todoText}
            onChange={(event) => setTodoText(event.target.value)}
            placeholder="Add a new task"
            aria-label="New todo"
            className="min-w-0 rounded-md border border-slate-300 px-3.5 py-3 font-[inherit] outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
          />
          <button
            type="submit"
            className="rounded-md bg-emerald-800 px-4 py-3 font-bold text-white transition hover:bg-emerald-900 focus:ring-2 focus:ring-emerald-200 focus:outline-none"
          >
            Add
          </button>
        </form>

        <div className="my-5 flex flex-wrap gap-2" aria-label="Todo filters">
          {["all", "active", "completed"].map((filterName) => (
            <button
              type="button"
              key={filterName}
              className={`rounded-md px-4 py-2.5 font-bold capitalize transition focus:ring-2 focus:ring-slate-200 focus:outline-none ${
                filter === filterName
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
              onClick={() => setFilter(filterName)}
            >
              {filterName}
            </button>
          ))}
        </div>

        <ul className="grid list-none gap-2.5 p-0">
          {filteredTodos.length > 0 ? (
            filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className="grid items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 sm:grid-cols-[1fr_auto]"
              >
                {editingTodoId === todo.id ? (
                  <>
                    <input
                      type="text"
                      value={editingText}
                      onChange={(event) => setEditingText(event.target.value)}
                      onKeyDown={(event) => handleUpdateKeyDown(event, todo.id)}
                      aria-label="Update todo"
                      className="min-w-0 rounded-md border border-slate-300 px-3.5 py-2.5 font-[inherit] outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                      autoFocus
                    />
                    <div className="grid gap-2 sm:grid-cols-2">
                      <button
                        type="button"
                        className="rounded-md bg-green-100 px-4 py-2.5 font-bold text-green-700 transition hover:bg-green-200 focus:ring-2 focus:ring-green-100 focus:outline-none disabled:cursor-not-allowed disabled:opacity-55"
                        onClick={() => saveUpdatedTodo(todo.id)}
                        disabled={!editingText.trim()}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="rounded-md bg-slate-200 px-4 py-2.5 font-bold text-slate-700 transition hover:bg-slate-300 focus:ring-2 focus:ring-slate-200 focus:outline-none"
                        onClick={cancelUpdate}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <label className="flex min-w-0 items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        className="h-[18px] w-[18px] accent-emerald-800"
                      />
                      <span
                        className={`[overflow-wrap:anywhere] ${
                          todo.completed ? "text-slate-400 line-through" : ""
                        }`}
                      >
                        {todo.text}
                      </span>
                    </label>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <button
                        type="button"
                        className="rounded-md bg-green-100 px-4 py-2.5 font-bold text-green-700 transition hover:bg-green-200 focus:ring-2 focus:ring-green-100 focus:outline-none"
                        onClick={() => updateTodo(todo)}
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className="rounded-md bg-red-100 px-4 py-2.5 font-bold text-red-700 transition hover:bg-red-200 focus:ring-2 focus:ring-red-100 focus:outline-none"
                        onClick={() => deleteTodo(todo.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))
          ) : (
            <li className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center text-slate-500">
              No todos found.
            </li>
          )}
        </ul>
      </section>
    </main>
  );
}

export default TodoApp;
