'use client';

import React, { useState } from 'react';
import { Clock, Trash2 } from 'lucide-react';

interface Todo {
    id: string;
    task: string;
    status: 'completed' | 'in-progress' | 'todo';
}

const initialTodos: Todo[] = [
    { id: '1', task: 'Building Orbit v2.0 features', status: 'in-progress' },
    { id: '2', task: 'Refactoring Go microservices', status: 'in-progress' },
    { id: '3', task: 'Studying system design patterns', status: 'todo' },
    { id: '4', task: 'Coffee break ☕', status: 'completed' },
];

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>(initialTodos);
    const [newTask, setNewTask] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const toggleStatus = (id: string) => {
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                const statusCycle: Record<Todo['status'], Todo['status']> = {
                    'todo': 'in-progress',
                    'in-progress': 'completed',
                    'completed': 'todo'
                };
                return { ...todo, status: statusCycle[todo.status] };
            }
            return todo;
        }));
    };

    const addTodo = () => {
        if (newTask.trim()) {
            const newTodo: Todo = {
                id: Date.now().toString(),
                task: newTask.trim(),
                status: 'todo'
            };
            setTodos([...todos, newTodo]);
            setNewTask('');
            setIsAdding(false);
        }
    };

    const deleteTodo = (id: string) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const getStatusIcon = (status: Todo['status']) => {
        switch (status) {
            case 'completed':
                return (
                    <div className="w-4 h-4 rounded-full border-2 border-green-400 bg-green-400/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    </div>
                );
            case 'in-progress':
                return (
                    <div className="w-4 h-4 rounded-full border-2 border-[#007acc] bg-[#007acc]/20 flex items-center justify-center animate-pulse">
                        <div className="w-2 h-2 rounded-full bg-[#007acc]"></div>
                    </div>
                );
            default:
                return <div className="w-4 h-4 rounded-full border-2 border-zinc-600 bg-zinc-800/50"></div>;
        }
    };

    return (
        <div className="p-5 rounded-lg bg-linear-to-br from-[#007acc]/10 to-black/40 border border-[#007acc]/30 backdrop-blur-sm hover:border-[#007acc]/50 transition-all duration-300 shadow-lg shadow-[#007acc]/10">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Clock size={16} className="text-[#007acc]" />
                    <span className="text-sm font-mono text-white font-bold tracking-wider">What I&apos;m Doing Today</span>
                </div>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="text-xs text-[#007acc] hover:text-white transition-colors font-mono"
                >
                    {isAdding ? 'Cancel' : '+ Add'}
                </button>
            </div>

            {isAdding && (
                <div className="mb-4 flex gap-2">
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                        placeholder="New task..."
                        className="flex-1 bg-black/40 border border-white/10 rounded px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#007acc] transition-colors"
                        autoFocus
                    />
                    <button
                        onClick={addTodo}
                        className="px-3 py-2 bg-[#007acc] text-white text-xs font-mono rounded hover:bg-[#0066b3] transition-colors"
                    >
                        Add
                    </button>
                </div>
            )}

            <div className="space-y-3">
                {todos.map((todo) => (
                    <div
                        key={todo.id}
                        className="flex items-start gap-3 group hover:bg-white/5 p-2 -mx-2 rounded transition-colors"
                    >
                        <button
                            onClick={() => toggleStatus(todo.id)}
                            className="pt-0.5 hover:scale-110 transition-transform"
                        >
                            {getStatusIcon(todo.status)}
                        </button>
                        <div className="flex-1">
                            <p
                                className={`text-xs ${todo.status === 'completed'
                                        ? 'text-zinc-500 line-through'
                                        : 'text-zinc-300'
                                    } group-hover:text-white transition-colors cursor-pointer`}
                                onClick={() => toggleStatus(todo.id)}
                            >
                                {todo.task}
                            </p>
                        </div>
                        <button
                            onClick={() => deleteTodo(todo.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-500 hover:text-red-400"
                        >
                            <Trash2 size={12} />
                        </button>
                    </div>
                ))}
            </div>

            {todos.length === 0 && (
                <div className="text-center py-4 text-xs text-zinc-500">
                    No tasks yet. Click &quot;+ Add&quot; to create one!
                </div>
            )}

            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-500">
                <span>{todos.filter(t => t.status === 'completed').length} / {todos.length} completed</span>
                <span className="text-[#007acc]">
                    {todos.filter(t => t.status === 'in-progress').length} in progress
                </span>
            </div>
        </div>
    );
}
