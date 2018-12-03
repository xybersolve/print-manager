import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LineService } from '../../core/http/line.service';
import { ILine } from '../../core/models/line.model';

@Component({
  // selector: 'pm-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit {
  lines: ILine[] = [];
  filteredLines: ILine[] = [];
  _activeOnly = false;
  _lineFilter = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private lineService: LineService
  ) { }

  ngOnInit() {
    this.getLines();
  }

  get activeOnly(): boolean {
    return this._activeOnly;
  }
  set activeOnly(value: boolean) {
    console.log(`got activeOnly: ${value}`);
    this._activeOnly = !!value;
    this.filterLines();
  }

  private filterLines() {
    console.log(`filterLines(): ${this._activeOnly}, ${this._lineFilter}`);
    return this.filteredLines = this.lines.filter(line => {
      return this._activeOnly ? line.active === true : true;
    });
  }

  private getLines(): void {
    this.lineService
      .getAll()
      .subscribe(
        (data) => {
          this.lines = data;
          this.filteredLines = this.filterLines();
        },
        (err) => console.error(err)
      );
  }

  private updateLine(line) {
    // console.log('Update image'); console.dir(image);
    this.lineService.update(line)
      .subscribe(
        (data) => console.log(data),
        (err) => console.error(err)
      );
  }

  private setDefault(line: ILine) {
    this.lineService.setDefault(line)
    .subscribe(
      (data) => console.log(data),
      (err) => console.error(err)
    );
  }

  onAdd() {
    this.router.navigate(['line', 'add']);
  }

  onEdit(line, idx) {
    console.log(`edit line: ${idx}`);
    console.dir(line);
    this.router.navigate(['line', line._id]);
  }

  onChangeActive(line) {
    this.updateLine(line);
  }

  onSetDefault(line: ILine, idx: number) {
    console.log(`onMakeDefault: ${line.name}, ${idx}`);
    for (const ln of this.lines) { ln.default = false; }
    line.default = true;
    this.setDefault(line);
  }

  onRemove(line, idx) {
    console.log(`remove line: ${idx}`);
    console.dir(line);
    this.lines.splice(idx, 1);
  }
}
