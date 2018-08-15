import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
// import { Observable } from 'rxjs/Rx';
import { MatDialog } from '@angular/material';

import { Observable } from '../../node_modules/rxjs';
import 'rxjs/add/operator/map';
import { map } from '../../node_modules/rxjs-compat/operator/map';
import { Building, Room, RoomConfiguration, Device, DeviceType, UIConfig, Role } from './objects';

@Injectable()
export class APIService {
    url = 'http://localhost:9998';
    //   url: string = '';
    options: RequestOptions;
    headers: Headers;
    constructor(private http: Http) {
        this.headers = new Headers(
            {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        );

        this.options = new RequestOptions({ headers: this.headers });
    }

    RefreshPi(hostname: string): Observable<any> {
        return this.http.put('http://' + hostname + '.byu.edu:8888/refresh', null, this.options).map(response => response.json());
    }

    Deploy(hostname: string): Observable<any> {
        return this.http.get(this.url + '/deploy/' + hostname, this.options).map(response => response.json());
    }

    getPiList(): Observable<any> {
        return this.http.get(this.url + '/getPIList', this.options).map(response => response.json());
    }

    GetBuildingList(): Observable<Building[]> {
        return this.http.get(this.url + '/buildings', this.options).map(response => response.json());
    }

    GetRoomList(building: string): Observable<Room[]> {
        return this.http.get(this.url + '/buildings/' + building + '/rooms', this.options).map(response => response.json());
    }

    GetAllRooms(): Observable<Room[]> {
        return this.http.get(this.url + '/rooms', this.options).map(response => response.json());
    }

    GetAllPis(): Observable<Device[]> {
        return this.http.get(this.url + '/roles/ControlProcessor/types/Pi3', this.options).map(response => response.json());
    }

    GetPisByRoom(roomId: string): Observable<Device[]> {
        return this.http.get(this.url + '/rooms/' + roomId + '/roles/ControlProcessor', this.options).map(response => response.json());
    }
}
