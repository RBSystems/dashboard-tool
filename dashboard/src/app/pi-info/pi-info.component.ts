import { Component, OnInit, Pipe, PipeTransform, Input } from '@angular/core';
import { APIService } from '../api.service';
import { Building, Room, RoomConfiguration, Device, DeviceType, UIConfig, Role } from '../objects';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pi-info',
  templateUrl: './pi-info.component.html',
  styleUrls: ['./pi-info.component.scss']
})
export class PiInfoComponent implements OnInit {
  @Input() pi: Device;
  apiVersionNum: string;
  tpVersionNum: string;
  routerVersionNum: string;
  transVersionNum: string;

  constructor(private api: APIService, private sanitizer: DomSanitizer) {

  }
  ngOnInit() {
    this.api.getVersionNum('av-api').subscribe(value => {
      let apiVersionNum = value
      return apiVersionNum
    })
  }


  // Gets the hostname to enter the pi hostname in to a URL format
  getURL(hostname): SafeUrl {
    return 'http://' + hostname + '.byu.edu:8888';
  }

  getVersion(hostname, port) {
    this.api.GetMStatus(hostname, port).subscribe(value => {
      let version: string = value
      return version
    })
  }

  // Refreshes the Pi by going to :8888/refresh
  refresh(hostname: string) {
    this.api.RefreshPi(hostname).subscribe(success => {
      console.log(success);
    },
      error => {
        console.log(error);
      });
  }
  // Deploys Code to the Pi again
  deploy(hostname: string) {
    this.api.Deploy(hostname).subscribe(success => {
      console.log(success);
    },
      error => {
        console.log(error);
      });
  }

}

// Pipe is used to pipe the room to bypass an unecure something or another...Basically it makes the iFrame deal-y-o work...
@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
