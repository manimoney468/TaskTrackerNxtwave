import React, { useState, useEffect } from 'react';
import { PlusCircle, Moon, Sun, Trash2, CheckCircle } from 'lucide-react';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    setTasks([
      ...tasks,
      {
        id: crypto.randomUUID(),
        text: newTask.trim(),
        completed: false
      }
    ]);
    setNewTask('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 
      ${darkMode ? 'dark:bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 transition-all duration-300">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Task Tracker
            </h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? (
                <Sun className="w-6 h-6 text-yellow-400" />
              ) : (
                <Moon className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>

          <form onSubmit={addTask} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 
                  dark:text-white transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                  transition-colors duration-200 flex items-center gap-2"
              >
                <PlusCircle className="w-5 h-5" />
                Add
              </button>
            </div>
          </form>

          <div className="space-y-3">
            {tasks.map(task => (
              <div
                key={task.id}
                className={`group flex items-center justify-between p-4 rounded-lg 
                  transition-all duration-200 animate-fade-in
                  ${task.completed 
                    ? 'bg-gray-100 dark:bg-gray-700' 
                    : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'} 
                  border border-gray-200 dark:border-gray-600`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`rounded-full p-1 transition-colors
                      ${task.completed 
                        ? 'text-green-500 hover:text-green-600' 
                        : 'text-gray-400 hover:text-gray-500'}`}
                  >
                    <CheckCircle className="w-5 h-5" />
                  </button>
                  <span
                    className={`text-lg transition-all duration-200
                      ${task.completed 
                        ? 'line-through text-gray-500 dark:text-gray-400' 
                        : 'text-gray-800 dark:text-white'}`}
                  >
                    {task.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-600 transition-colors p-1 
                    opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            {tasks.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No tasks yet. Add one to get started!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;