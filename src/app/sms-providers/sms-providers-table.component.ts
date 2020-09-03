import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { LoadingStatus } from '../loading-status';
import { SmsProviderListItem } from './sms-provider-list-item';

@Component({
  selector: 'app-sms-providers-table',
  templateUrl: './sms-providers-table.component.html',
  styleUrls: ['./sms-providers-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmsProvidersTableComponent {
  @Input() smsProvidersState: LoadingStatus<SmsProviderListItem[]>;

  displayedColumns = ['country', 'name', 'origin_no'];
}
