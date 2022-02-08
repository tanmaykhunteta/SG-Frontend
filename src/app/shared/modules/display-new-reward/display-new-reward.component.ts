import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { constants } from 'src/config/constants';
import { IReward } from '../../models/general.model';

@Component({
  selector: 'app-display-new-reward',
  templateUrl: './display-new-reward.component.html',
  styleUrls: ['./display-new-reward.component.css']
})
export class DisplayNewRewardComponent implements OnInit {
	amount : number = 0;
	reason : string = "";

	constructor(@Inject(MAT_DIALOG_DATA) public data: IReward) {
		this.amount = constants.REWARD[data.type].amount;
		this.reason = constants.REWARD[data.type].message;
	}

	ngOnInit(): void {
	}

}
