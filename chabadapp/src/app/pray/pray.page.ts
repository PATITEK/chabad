import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DonateService } from '../@app-core/http/donate';

@Component({
  selector: 'app-pray',
  templateUrl: './pray.page.html',
  styleUrls: ['./pray.page.scss'],
})
export class PrayPage implements OnInit {
  frmPray: FormGroup;
  error_messages = {
    'amount': [
      { type: 'require', message: 'This field must have a value for donate !' }
    ],
   
  }
  DAY = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  MONTH = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  today;
  dateList = [];
  DateObj;
  constructor(
    public formBuilder: FormBuilder,
     private route: ActivatedRoute,
     public donateService: DonateService,
  ) {
    this.frmPray = this.formBuilder.group({
      amount: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      note: new FormControl('',[])
   });
    this.today = new Date();
    for (let i = 0; i < 7; i++) {
      let nextDay = new Date(this.today);
      nextDay.setDate(nextDay.getDate() + i);
      this.dateList.push({
        "id": i,
        "day": this.DAY[nextDay.getDay()].substring(0, 3),
        "date": nextDay.getDate(),
      })
    }
    const month_ = this.MONTH[this.today.getMonth()];
    const day_ = this.DAY[this.today.getDay()];
    const date_ = String(this.today.getDate()).padStart(2, '0');
    const year_ = this.today.getFullYear();
     this.DateObj = `${day_}, ${date_} ${month_} ${year_}`
  }
  public tab = 'pray'
  isHidden = false;
  isChoose = false;
  source_type: any;
  source_id: any;
  ngOnInit(
  ) {
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
  onSubmit() {
    var result = {
      "donation_log" : {
        "amount": this.frmPray.get('amount').value,
        "note": this.frmPray.get('note').value,
        "source_type": this.source_type,
        "source_id": this.source_id
      }
    }
    this.donateService.donateLog(result).subscribe((data) => {
        console.log(data);
    })
  }
}
