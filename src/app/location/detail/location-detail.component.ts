import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { CommonService } from '../../shared/services/common.service';
import { ILocation } from '../../shared/models/location.model';
import { LocationService } from '../../shared/services/location.service';
import { ErrorMessanger } from '../../shared/services/error-messanger';

// custom validation rule - placeholder for future usage
// return null if valid, {key:value} pair - if not valid
const commissionRange = (c: AbstractControl): { [key: string]: boolean } | null => {
  console.log(`Run custom validator: ${c.value}`);
  if (c.value !== null && (isNaN(c.value) || c.value < 1 || c.value > 99)) {
    return {'commision-range': true};
  }
  return null;
};

// custom validator with parameters
// factory function return validator function, with parameters passed in
const range = (min: number, max: number) => {
  console.log(`Instantiate custom validator, min: ${min} -> max: ${max}`);
  return (c: AbstractControl): {[key: string]: boolean} | null => {
    console.log(`Run custom validator: ${c.value}`);
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return {'range': true};
    }
    return null;
  };
};

@Component({
  // selector: 'pm-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.css']
})
export class LocationDetailComponent implements OnInit {
  showFormDebug = true;
  title = 'Location';
  location: ILocation = new ILocation();
  locationForm: FormGroup;
  emailMessage: string;
  displayMessage: { [key: string]: string } = {};

  private validationMessages: { [key: string]: { [key: string]: string } };
  private errorMessanger: ErrorMessanger;

  constructor(
    private common: CommonService,
    private locationService: LocationService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.validationMessages = {
      name: {
        required: 'Location name is required.',
        minlength: 'Location name must be at least 3 characters in length.',
        maxlength: 'Location name can be at most 50 characters in length.'
      },
      email: {
        required: 'Please enter your email address.',
        email: 'Please enter a valid email address.'
      },
      phone: {
        required: 'Location phone is required.',
        minlength: 'Location phone must be at least 9 characters in length.',
        maxlength: 'Location phone can be at most 15 characters in length.'
      },
      commission: {
        required: 'Location commission is required',
        pattern: 'Location commission must be a number.',
        commisionRange: 'Location commission must be in range 1 to 99.'
      },
      sortOrder: {
        required: 'Location sortOrder is required',
        pattern: 'Location sortOrder must be a a number.'
      }
    };
    this.errorMessanger = new ErrorMessanger(this.validationMessages);
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.title = id ? 'Location Edit' : 'Location Add';
    if (id) {
      this.getLocation(id);
    }

    // form control setup
    this.locationForm = this.fb.group({
      name: [this.location.name, [Validators.required]],
      email: [this.location.email, [Validators.required, Validators.email]],
      notifyEmail: [this.location.active],
      phone: [this.location.phone, [Validators.maxLength(20), Validators.minLength(9)]], // phone notify is diabled by default (no require)
      notifyPhone: [this.location.active],
      commission: [this.location.commission, [Validators.required, Validators.pattern(/\d{1,2}/), range(0, 99)]],
      owner: {value: this.location.owner || this.common.owner, disabled: true},
      sortOrder: [this.location.sortOrder, [Validators.required, Validators.pattern(/\d{1,3}/)]],
      active: [this.location.active],
      addresses: this.fb.group({
        type: 'home',
        street1: '',
        street2: '',
        city: '',
        state: '',
        postalCode: ''
      })
    });

    const emailControl: AbstractControl = this.locationForm.get('email');
    emailControl.valueChanges.pipe(
      debounceTime(2000)
    ).subscribe(
      value => this.setMessage(emailControl)
    );

    // this.locationForm.get('email').valueChanges.subscribe(values => {
    //  this.setMessage(emailControl);
    // });

    // update validations for notify via phone selection
    this.locationForm.get('notifyPhone').valueChanges.subscribe(value => {
      this.onNotifyPhoneChange(value);
    });
    // update validations for notify via email selection
    this.locationForm.get('notifyEmail').valueChanges.subscribe(value => {
      this.onNotifyEmailChange(value);
    });
  }

  private setMessage(c: AbstractControl) {
    this.emailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage += Object.keys(c.errors).map(
        key => this.emailMessage += this.validationMessages['email'][key]).join(' ');
    }
  }

  private patchValues() {
    // set provided values here
    this.locationForm.patchValue({
      name: this.location.name,
      email: this.location.email,
      notifyEmail: this.location.notifyEmail || this.common.default.notifyEmail,
      phone: this.location.phone,
      notifyPhone: this.location.notifyPhone || this.common.default.notifyPhone,
      commission: this.location.commission,
      owner: this.location.owner || this.common.default.owner,
      active: this.location.active,
      sortOrder: this.location.sortOrder
    });
  }

  private getLocation(id: any) {
    this.locationService
      .get(id)
      .subscribe(
        data => {
          console.log(data);
          this.location = data;
        },
        err => console.error(err),
        () => this.patchValues()
      );
  }

  private update(location) {
    if (location._id === 0) {
      this.locationService
        .add(location)
        .subscribe(
          (data) => this.location = data,
          (err) => console.error(err)
        );
    } else {
      // console.log('imageDetail.updateImate()'); console.dir(image);
      this.locationService.update(location)
        .subscribe(
          data => console.log(data),
          err => console.error(err)
        );
    }
    // back to lines list
    this.router.navigate(['/location']);
  }

  private onNotifyPhoneChange(value) {
    // phone is only required if used for notification
    const phone: AbstractControl = this.locationForm.get('phone');
    if (value === true) {
      phone.setValidators([Validators.required, Validators.maxLength(20), Validators.minLength(9)]);
    } else {
      phone.clearValidators();
      phone.setValidators([Validators.maxLength(20), Validators.minLength(9)]);
    }
    phone.updateValueAndValidity();
  }

  private onNotifyEmailChange(value) {
    // email is only required if used for notification
    const email: AbstractControl = this.locationForm.get('email');
    if (value === true) {
      email.setValidators([Validators.required, Validators.email]);
    } else {
      email.clearValidators();
      email.setValidators([Validators.email]);
    }
    email.updateValueAndValidity();
  }

  public onSubmit(location: ILocation) {
    console.log('onSubmit()');
    this.update(location);
  }
}
