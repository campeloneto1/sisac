import { CommonModule } from "@angular/common";
import { Component, Input, Output } from "@angular/core";
import { Subject } from "rxjs";

@Component({
    selector: 'opcoes-table',
    templateUrl: './opcoes-table.component.html',
    styleUrl: './opcoes-table.component.css',
    standalone: true,
    imports: [CommonModule]
})
export class OpcoesTableComponent{
    constructor() {}

  @Output()
  emitter = new Subject<any>();

  @Input()
  data:any = {};

  ngOnInit(): void {}

  onAction1() {
    this.emitter.next({
      cmd: "Editar",
      data: this.data,
    });
  }

  onAction2() {
    this.emitter.next({
      cmd: "Excluir",
      data: this.data,
    });
  }

  ngOnDestroy() {
    this.emitter.unsubscribe();
  }
}