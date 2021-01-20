import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DonateService } from '../@app-core/http/donate';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.page.html',
  styleUrls: ['./donate.page.scss'],
})
export class DonatePage implements OnInit {
  public tab = 'pray'
  isHidden = false;
  isChoose = false;
  source_type: any;
  required_mess  = false;
  message = "This field must have a value!";
  source_id: any;
  frmDonate: FormGroup;
  error_messages = {
    'amount': [
      { 
        type: 'require', message: 'This field must have a value!'
       }
    ],
  
  }
  
  constructor(private router: Router, 
    public formBuilder: FormBuilder,
     private route: ActivatedRoute,
     public donateService: DonateService,
     ) {
    this.frmDonate = this.formBuilder.group({
      amount: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      note: new FormControl('',[]),
   });
  
  }
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.data !== undefined) {
        this.source_type = "Event"
        this.source_id = JSON.parse(params['data']).id;
      }
    })
  }
  onSubmit() {
    var result = {
      "donation_log" : {
        "amount": this.frmDonate.get('amount').value,
        "note": this.frmDonate.get('note').value,
        "source_type": this.source_type,
        "source_id": this.source_id
      }
    }
    if (this.frmDonate.get('amount').dirty || this.frmDonate.get('amount').touched) {
      this.required_mess = true;
    }
    console.log(result);
    this.donateService.donateLog(result).subscribe((data) => {
        console.log(data);
    })
  }
  clickPray() {
    this.tab = 'pray';
  }
  clickDonate() {
    this.tab = 'donate';
  }
  clickHidden(e) {
    if(this.isHidden == false) {
      this.isHidden = true;
      e.target.classList.add('btn__nameless_dis_pray');
    }
    else {
      this.isHidden = false;
      e.target.classList.remove('btn__nameless_dis_pray');
    }
  }

  btnActivate(e) {
    console.log('yeah');
    this.isChoose = true;
    let choosed = document.querySelectorAll('day');
    choosed.forEach(element => {
      element.classList.remove(('day'));
      document.getElementById('day-choose').style.background = '#64C18E';
    });
    e.target.classList.add('active-button');
  }
}
