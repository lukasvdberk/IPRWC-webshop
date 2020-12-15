import { Pipe, PipeTransform } from '@angular/core';
import {environment} from "../../environments/environment";

@Pipe({name: 'mediaUrl'})
export class mediaUrl implements PipeTransform {
  transform(value: string): string {
    return `${environment.mediaUrl}${value}`;
  }
}
