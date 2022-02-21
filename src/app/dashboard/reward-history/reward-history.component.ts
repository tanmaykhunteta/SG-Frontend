import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Pagination } from 'src/app/shared/models/general.model';
import { DataService } from 'src/app/shared/services/data.service';

interface Reward {
	_id : string,
	txn_type : string,
	reward : number,
	createdAt : string
}

@Component({
  selector: 'app-reward-history',
  templateUrl: './reward-history.component.html',
  styleUrls: ['./reward-history.component.css'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class RewardHistoryComponent implements OnInit {
	constructor(){}
	ngOnInit(): void {
		
	}
}
