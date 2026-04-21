import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../models/task.model';

export type TaskFormData = Omit<Task, 'id' | 'status'> & { id?: string };

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskFormComponent implements OnChanges {
  @Input() taskToEdit: Task | null = null;
  @Output() formSubmit = new EventEmitter<TaskFormData>();
  @Output() formClose = new EventEmitter<void>();

  form: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      title: ['', Validators.required],
      due: ['', Validators.required],
      level: ['low' as Task['level']],
      desc: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskToEdit']) {
      const t = this.taskToEdit;
      this.form.reset(t ? { title: t.title, due: t.due, level: t.level, desc: t.desc } : { level: 'low' });
    }
  }

  submit(): void {
    if (this.form.invalid) return;
    const v = this.form.getRawValue();
    this.formSubmit.emit({
      id: this.taskToEdit?.id,
      title: v.title!,
      due: v.due!,
      level: v.level as Task['level'],
      desc: v.desc ?? '',
    });
  }
}
