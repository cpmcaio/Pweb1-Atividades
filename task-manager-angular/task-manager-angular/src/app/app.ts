import { Component, signal, inject, computed } from '@angular/core';
import { TaskService } from './services/task';
import { Task, TaskStatus } from './models/task.model';
import { TaskCardComponent } from './components/task-card/task-card';
import { TaskFormComponent, TaskFormData } from './components/task-form/task-form';

const COLUMNS: { status: TaskStatus; label: string }[] = [
  { status: 'todo',  label: 'Para fazer'    },
  { status: 'doing', label: 'Em andamento'  },
  { status: 'done',  label: 'Concluídas'    },
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskCardComponent, TaskFormComponent],
  templateUrl: './app.html',
})
export class App {
  protected readonly taskService = inject(TaskService);
  protected readonly columns = COLUMNS;
  protected readonly showModal = signal(false);
  protected readonly editingTask = signal<Task | null>(null);

  tasksFor(status: TaskStatus) {
    return computed(() => this.taskService.tasks().filter(t => t.status === status));
  }

  openCreate(): void {
    this.editingTask.set(null);
    this.showModal.set(true);
  }

  openEdit(task: Task): void {
    this.editingTask.set(task);
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
    this.editingTask.set(null);
  }

  onFormSubmit(data: TaskFormData): void {
    if (data.id) {
      const existing = this.taskService.tasks().find(t => t.id === data.id);
      if (existing) this.taskService.updateTask({ ...existing, ...data, id: data.id });
    } else {
      this.taskService.addTask({ ...data, status: 'todo' });
    }
    this.closeModal();
  }

  onDeleteTask(id: string): void {
    this.taskService.deleteTask(id);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent, status: TaskStatus): void {
    event.preventDefault();
    const id = event.dataTransfer?.getData('text/plain');
    if (id) this.taskService.moveTask(id, status);
  }
}