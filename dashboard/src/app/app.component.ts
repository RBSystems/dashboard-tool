import { Component, OnInit} from '@angular/core';
import { APIService } from './api.service';
import { Building, Room, RoomConfiguration, Device, DeviceType, UIConfig, Role } from './objects';

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


  constructor(private api: APIService) {

  }
  ngOnInit() {
    this.currentBuilding = new Building();
    this.currentRoom = new Room();
    this.getBuildings();
  }

  // Gets a list of all the pis
  getPiList() {
    this.api.getPiList().subscribe(success => {
      console.log(success);
    },
      error => {
        console.log(error);
      });
  }

  // Obtains a list of all the buildings.
  getBuildings() {
    this.buildingList = [];
    this.api.GetBuildingList().subscribe(success => {
      this.buildingList = success;
    },
      error => {
        console.log(error);
      });
  }

  // Obtains the list of all the rooms in the building
  getRooms() {
    this.roomList = []; // Make the empty room array to fill
    this.api.GetRoomList(this.currentBuilding._id).subscribe(success => {
      this.roomList = success;
    },
      error => {
        console.log(error);
      });
  }

  // Obtains all the Pis that are in a specific room.
  getPisByRoom() {
    this.piList = []; // Make the empty pi array to fill
    this.api.GetPisByRoom(this.currentRoom._id).subscribe(success => {
      this.piList = success;
      console.log(this.piList);
    },
      error => {
        console.log(error);
      });
  }
}
