import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { ISong } from "./song"
import { Observable } from "rxjs"

@Injectable()
export class SongService {
  private _url: string = "../assets/data/songs.json"

  constructor(private http: HttpClient) {}

  getSongs(): Observable<ISong[]> {
    return this.http.get<ISong[]>(this._url)
  }
}
