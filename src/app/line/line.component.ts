import { Component, OnInit } from '@angular/core';

import { LineService } from '../shared/services/line.service';
import { ILine } from '../shared/models/line.model';

@Component({
  // selector: 'pm-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit {
  lines: ILine[] = [];
  constructor(
    private lineService: LineService
  ) { }

  ngOnInit() {
    this.getLines();
  }

  private getLines(): void {
    this.lineService
      .getAll()
      .subscribe(
        (data) => this.lines = data,
        (err) => console.error(err)
      );
  }

  onEdit(line, idx) {
    console.log(`edit line: ${idx}`);
    console.dir(line);
  }

  onRemove(line, idx) {
    console.log(`remove line: ${idx}`);
    console.dir(line);
    this.lines.splice(idx, 1);
  }
}
