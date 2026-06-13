import { Component } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-grp-cmember4settings',
  templateUrl: './grp-cmember4settings.component.html',
  styleUrls: ['./grp-cmember4settings.component.css']
})
export class GrpCmember4settingsComponent {

  settings:any;

  constructor(private sharedservice: SharedService)
  {
    this.settings =
      this.sharedservice.getSettings();
  }

  saveSettings()
  {
    this.sharedservice.setSettings(this.settings);

    this.sharedservice.addNotification(
    'Settings updated successfully'
  );
  }

}