import { TestBed } from '@angular/core/testing';
import { TaskService } from './task';
import { Task } from '../models/task.model';

const STORAGE_KEY = 'app_task_manager_tasks_v1';

const mockTask: Task = {
  id: 'test-1',
  title: 'Tarefa de teste',
  due: '2026-05-01',
  level: 'medium',
  desc: 'Descrição de teste',
  status: 'todo',
};

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load initial tasks when localStorage is empty', () => {
    expect(service.tasks().length).toBeGreaterThan(0);
  });

  it('should persist tasks from localStorage on init', () => {
    const stored: Task[] = [mockTask];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    const freshService = TestBed.inject(TaskService);

    expect(freshService.tasks().length).toBe(1);
    expect(freshService.tasks()[0].title).toBe(mockTask.title);
  });

  it('should add a task', () => {
    const before = service.tasks().length;
    service.addTask({ title: 'Nova', due: '2026-06-01', level: 'low', desc: '', status: 'todo' });
    expect(service.tasks().length).toBe(before + 1);
    expect(service.tasks().at(-1)?.title).toBe('Nova');
  });

  it('should persist added task to localStorage', () => {
    service.addTask({ title: 'Persistida', due: '2026-06-01', level: 'low', desc: '', status: 'todo' });
    const stored: Task[] = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(stored.some(t => t.title === 'Persistida')).toBe(true);
  });

  it('should update a task', () => {
    service.addTask({ ...mockTask });
    const added = service.tasks().at(-1)!;
    service.updateTask({ ...added, title: 'Atualizada' });
    const updated = service.tasks().find(t => t.id === added.id);
    expect(updated?.title).toBe('Atualizada');
  });

  it('should delete a task', () => {
    service.addTask({ ...mockTask });
    const added = service.tasks().at(-1)!;
    service.deleteTask(added.id);
    expect(service.tasks().find(t => t.id === added.id)).toBeUndefined();
  });

  it('should move a task to a new status', () => {
    service.addTask({ ...mockTask, status: 'todo' });
    const added = service.tasks().at(-1)!;
    service.moveTask(added.id, 'done');
    expect(service.tasks().find(t => t.id === added.id)?.status).toBe('done');
  });
});