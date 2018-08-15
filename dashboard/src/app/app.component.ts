import { Component, OnInit } from '@angular/core';
import { APIService } from './api.service';
import { Building, Room, RoomConfiguration, Device, DeviceType, UIConfig, Role } from './objects';
import { Url } from 'url';
import { DomSanitizer, SafeUrl } from '../../node_modules/@angular/platform-browser';

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

  getURL(hostname): SafeUrl {
    console.log(hostname)
    return "http://" + hostname + ".byu.edu:8888"
  }

  refresh(hostname: string) {
    this.api.RefreshPi(hostname).subscribe(success => {
      console.log(success)
    },
      error => {
        console.log(error)
      })
  }
  deploy(hostname: string) {
    this.api.Deploy(hostname).subscribe(success => {
      console.log(success)
    },
      error => {
        console.log(error)
      })
  }
  getPiList() {
    this.api.getPiList().subscribe(success => {
      console.log(success)
    },
      error => {
        console.log(error)
      })
  }

  getBuildings() {
    this.buildingList = [];
    this.api.GetBuildingList().subscribe(success => {
      this.buildingList = success
    },
      error => {
        console.log(error)
      })
  }

  getRooms() {
    this.roomList = [];
    this.api.GetRoomList(this.currentBuilding._id).subscribe(success => {
      this.roomList = success
    },
      error => {
        console.log(error)
      })
  }

  getPisByRoom() {
    this.piList = [];
    this.api.GetPisByRoom(this.currentRoom._id).subscribe(success => {
      this.piList = success
      console.log(this.piList)
    },
      error => {
        console.log(error)
      })
  }
}
