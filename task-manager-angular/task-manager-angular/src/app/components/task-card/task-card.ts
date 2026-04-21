import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { Task } from '../../models/task.model';
import { ProximityColorPipe } from '../../pipes/proximity-color.pipe';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [ProximityColorPipe],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCardComponent {
  @Input({ required: true }) task!: Task;
  @Output() editTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<string>();

  dragging = signal(false);

  levelLabel(level: string): string {
    return level === 'high' ? 'Alta' : level === 'medium' ? 'Média' : 'Baixa';
  }

  onDragStart(event: DragEvent): void {
    event.dataTransfer?.setData('text/plain', this.task.id);
    this.dragging.set(true);
  }

  onDragEnd(): void {
    this.dragging.set(false);
  }
}
