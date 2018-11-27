import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';

import { ILine } from '../../shared/models/line.model';
import { LineService } from '../../shared/services/line.service';

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
              private lineService: LineService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.title = id ? 'Line Edit' : 'Line Add';
    if (id) {
      this.getLine(id);
    }
    // Form definitions
    // use form-builder: build form using model defaults
    this.lineForm = this.fb.group({
      name: [this.line.name, [ Validators.required, Validators.minLength(3), Validators.maxLength(50) ]],
      description: [this.line.description, [ Validators.required, Validators.minLength(5), Validators.maxLength(255) ]],
      owner: {value: this.line.owner || 'Greg Milligan', disabled: true},
      active: this.line.active,
      sortOrder: [this.line.sortOrder, [Validators.required, Validators.pattern(/\d{1,4}/) ]]
    });

    // formgroup & formcontrols style
    /*
    this.lineForm = new FormGroup({
      name: new FormControl({value: this.line.name}),
      description: new FormControl({value: this.line.description}),
      owner: new FormControl({value: this.line.owner, disabled: true}),
      active: new FormControl({value: this.line.active}),
      sortOrder: new FormControl({value: this.line.sortOrder})
    });
    */
  }

  private setValues() {
    console.log('setValues()');
    console.dir(this.line);
    this.line.active = true;
    // must set all form values here
    this.lineForm.setValue({
      name: this.line.name,
      description: this.line.description,
      owner: this.line.owner,
      active: this.line.active,
      sortOrder: this.line.sortOrder
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
          (err) => console.error(err)
        );
    } else {
      // console.log('imageDetail.updateImate()'); console.dir(image);
      this.lineService.update(line)
        .subscribe(
          data => console.log(data),
          err => console.error(err)
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
}
