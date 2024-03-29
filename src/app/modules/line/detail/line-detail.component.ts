import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';

import { CommonService } from '../../../core/services/common.service';
import { ILine } from '../../../core/models/line.model';
import { LineService } from '../../../core/http/line.service';
import { MessageService } from '../../message/message.service';

@Component({
  // selector: 'pm-line-detail',
  templateUrl: './line-detail.component.html',
  styleUrls: ['./line-detail.component.css']
})
export class LineDetailComponent implements OnInit {
  showFormDebug = true;
  title = 'Lines';
  lineForm: FormGroup;
  line: ILine = new ILine();
  id: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private lineService: LineService,
              private common: CommonService,
              private messageService: MessageService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.title = id === '0' ? 'Line Add' : 'Line Edit';
    if (id !== '0') {
      this.getLine(id);
    }
    // Form definitions
    // use form-builder: build form using model defaults
    this.lineForm = this.fb.group({
      name: [this.line.name, [ Validators.required, Validators.minLength(3), Validators.maxLength(50) ]],
      description: [this.line.description, [ Validators.required, Validators.minLength(5), Validators.maxLength(255) ]],
      owner: {value: this.line.owner || this.common.owner, disabled: true},
      active: this.line.active,
    });

    // formgroup & formcontrols style
    /*
    this.lineForm = new FormGroup({
      name: new FormControl({value: this.line.name}),
      description: new FormControl({value: this.line.description}),
      owner: new FormControl({value: this.line.owner, disabled: true}),
      active: new FormControl({value: this.line.active})
    });
    */
  }

  private setValues() {
    console.log('setValues()');
    console.dir(this.line);
    // this.location.active = true;
    // must set all form values here
    this.lineForm.setValue({
      name: this.line.name,
      description: this.line.description,
      owner: this.line.owner || this.common.owner,
      active: this.line.active,
    });
  }

  private getLine(id) {
    console.log('getLine()');
    this.lineService.get(id)
      .subscribe(
        data => this.line = <ILine>data,
        err => console.error(err),
        () => this.setValues()
      );
  }

  private updateLine(line) {
    if (line._id === 0) {
      this.lineService.add(line)
        .subscribe(
          (data) => this.line = data,
          (err) => console.error(err),
          () => this.onSaveComplete(`Line added: ${line.name}`)
        );
    } else {
      this.lineService.update(line)
        .subscribe(
          data => console.log(data),
          err => console.error(err),
          () => this.onSaveComplete(`Line updated: ${line.name}`)
        );
    }
    // back to lines list
    this.router.navigate(['/line']);
  }

  public onSubmit(line: ILine) {
    console.log('onSubmit()');
    console.dir(line);
    this.updateLine(line);
  }

  private onSaveComplete(msg: string) {
    this.messageService.addMessage(msg);
  }
}
