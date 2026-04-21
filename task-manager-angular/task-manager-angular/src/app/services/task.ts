import { Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from '../models/task.model';
import INITIAL_TASKS from '../data/initial-tasks.json';

const STORAGE_KEY = 'app_task_manager_tasks_v1';

function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  // Signal que armazena o estado reativo da lista de tarefas
  readonly tasks = signal<Task[]>([]);

  constructor() {
    const stored = localStorage.getItem(STORAGE_KEY);
    this.tasks.set(stored ? JSON.parse(stored) : INITIAL_TASKS);
    if (!stored) this.save();
  }

  private save(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks()));
  }

  addTask(data: Omit<Task, 'id'>): void {
    this.tasks.update(list => [...list, { ...data, id: uid() }]);
    this.save();
  }

  updateTask(updated: Task): void {
    this.tasks.update(list => list.map(t => (t.id === updated.id ? updated : t)));
    this.save();
  }

  deleteTask(id: string): void {
    this.tasks.update(list => list.filter(t => t.id !== id));
    this.save();
  }

  moveTask(id: string, status: TaskStatus): void {
    this.tasks.update(list => list.map(t => (t.id === id ? { ...t, status } : t)));
    this.save();
  }
}
