import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'proximityColor', standalone: true })
export class ProximityColorPipe implements PipeTransform {
  transform(due: string): string {
    const days = Math.ceil((new Date(due).getTime() - Date.now()) / 86_400_000);
    if (days < 0) return 'bg-gray-500';
    if (days <= 1) return 'bg-red-500';
    if (days <= 3) return 'bg-orange-400';
    if (days <= 7) return 'bg-yellow-300';
    return 'bg-green-400';
  }
}
