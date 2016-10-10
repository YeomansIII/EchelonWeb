/**
 * Created by jason on 10/9/16.
 */
import {Injectable} from "@angular/core"
import 'rxjs/Rx'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {BehaviorSubject, Observable} from "rxjs/Rx";

@Injectable()
export class ToolbarService {

  private titleSource = new BehaviorSubject<string>('Echelon');
  title$ = this.titleSource.asObservable();

  constructor() {
  }

  setTitle(title: string) {
    this.titleSource.next(title);
  }
}
