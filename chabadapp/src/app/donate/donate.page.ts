import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DonateService, ChabadService } from '../@app-core/http';


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
  message_purpose = "";
  required_purpose = false;
  message = "";
  source_id: any;
  frmDonate: FormGroup;
  error_messages = {
    'amount': [
      { 
        type: 'require', message: 'This field must have a value!'
       }
    ],
  
  }
  dataParams;
  chabad = {
    name: '',
    thumb_image: ''
  }

  constructor(
    private router: Router, 
    private chabadService: ChabadService,
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
      this.dataParams = JSON.parse(params['data']);
      this.chabadService.getDetail(this.dataParams.chabad.id).subscribe(data => {
            this.chabad = data.chabad
      })
    })
  }
  onSubmit() {
    const getNumber = this.frmDonate.get('amount').value;
    if(getNumber%18 == 0 && getNumber>0) {
    }
    const sourceId = this.dataParams.event ? this.dataParams.event.id : this.dataParams.chabad.id;
    var result = {
      "donation_log" : {
        "amount": this.frmDonate.get('amount').value,
        "note": this.frmDonate.get('note').value,
        "source_type": this.dataParams.type,
        "source_id": sourceId
      }
    }
    if (this.frmDonate.get('amount').dirty || this.frmDonate.get('amount').touched ) {
      if(this.frmDonate.get('amount').value.length == 0) {
        this.required_mess = true;
        this.message = 'This field have a value!';
      }
      else {
        this.required_mess = false;
      }
    }
    if (this.frmDonate.get('note').dirty || this.frmDonate.get('note').touched ) {
      if(this.frmDonate.get('note').value.length == 0) {
        this.required_purpose = true;
        this.message_purpose = 'This field is require!';
      }
      else {
        this.required_purpose = false;
      }
    }
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
    this.isChoose = true;
    let choosed = document.querySelectorAll('day');
    choosed.forEach(element => {
      element.classList.remove(('day'));
      document.getElementById('day-choose').style.background = '#64C18E';
    });
    e.target.classList.add('active-button');
  }
}
