import { Component, OnInit, Pipe, PipeTransform  } from '@angular/core';
import { APIService } from './api.service';
import { Building, Room, RoomConfiguration, Device, DeviceType, UIConfig, Role } from './objects';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dashboard';
  buildingList: Building[] = [];
  roomList: Room[] = [];
  currentBuilding: Building;
  currentRoom: Room;
  piList: Device[] = [];

  constructor(private api: APIService, private sanitizer: DomSanitizer) {

  }
  ngOnInit() {
    this.currentBuilding = new Building()
    this.currentRoom = new Room()
    this.getBuildings()
  }

  //Gets the hostname to enter the pi hostname in to a URL format
  getURL(hostname): SafeUrl {
    return "http://" + hostname + ".byu.edu:8888"
  }

  //Refreshes the Pi by going to :8888/refresh
  refresh(hostname: string) {
    this.api.RefreshPi(hostname).subscribe(success => {
      console.log(success)
    },
      error => {
        console.log(error)
      })
  }
  
  //Deploys Code to the Pi again
  deploy(hostname: string) {
    this.api.Deploy(hostname).subscribe(success => {
      console.log(success)
    },
      error => {
        console.log(error)
      })
  }

  //Gets a list of all the pis
  getPiList() {
    this.api.getPiList().subscribe(success => {
      console.log(success)
    },
      error => {
        console.log(error)
      })
  }

  //Obtains a list of all the buildings.
  getBuildings() {
    this.buildingList = [];
    this.api.GetBuildingList().subscribe(success => {
      this.buildingList = success
    },
      error => {
        console.log(error)
      })
  }

  //Obtains the list of all the rooms in the building
  getRooms() {
    this.roomList = []; //Make the empty room array to fill 
    this.api.GetRoomList(this.currentBuilding._id).subscribe(success => {
      this.roomList = success
    },
      error => {
        console.log(error)
      })
  }

  //Obtains all the Pis that are in a specific room. 
  getPisByRoom() {
    this.piList = []; //Make the empty pi array to fill
    this.api.GetPisByRoom(this.currentRoom._id).subscribe(success => {
      this.piList = success
      console.log(this.piList)
    },
      error => {
        console.log(error)
      })
  }
}

//Pipe is used to pipe the room to bypass an unecure something or another...Basically it makes the iFrame deal-y-o work...
@Pipe({ name: "safe" })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}