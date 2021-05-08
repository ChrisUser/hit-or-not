import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { SongService } from "../song.service";
import { DomSanitizer } from "@angular/platform-browser";
import { ISong } from "../song";

@Component({
  selector: "app-card-container",
  templateUrl: "./card-container.component.html",
  styleUrls: ["./card-container.component.sass"]
})
export class CardContainerComponent implements OnInit {
  /** The subtitle that tells you what to do or which is the most voted hit */
  public subtitle: string;

  /** The secrets array should be used in order to
   * load all the songs before the user can actually see them
   * (not displayed in this version but it's set up and ready to use) */
  public secrets: ISong[] = [];

  /** This array is used to store all the songs listed in the json file */
  public songs: ISong[] = [];

  /** This array contains the random generated route
   * by which the elements on the songs array will be shown */
  public route: number[] = this.genRandomArray(50);

  /** The index by which we start to count and the index of the secrets array */
  public index: number = 2;
  public indexSecrets: number = this.index + 2;

  /** That variable indicates if there's a winner hit */
  public noWinnerView: boolean = true;

  /** Variables for the song panel on the left and on the right */
  public leftSong: ISong;
  public rightSong: ISong;

  @Output() messageEvent = new EventEmitter<string>();

  constructor(
    private _songService: SongService,
    private sanitizer: DomSanitizer
  ) {}

  /** We begin by getting the songs in the json file then we start the game */
  ngOnInit() {
    this._songService.getSongs().subscribe(data => {
      this.songs = data;
      this.startGame();
    });
  }

  /** Function that starts the game */
  startGame() {
    /** We set up the secrets array */
    for (let i = 0; i < this.indexSecrets; i++) {
      this.secrets.push(this.songs[this.route[i]]);
    }

    /** We extract the first two songs from it */
    this.leftSong = this.secrets.pop();
    this.rightSong = this.secrets.pop();
    this.indexSecrets++;
  }

  /** These three functions allows external url to
   * work in local instance of the project */
  leftUrl() {
    return this.makeSafe(this.leftSong.src);
  }
  rightUrl() {
    return this.makeSafe(this.rightSong.src);
  }
  /** Generic function
   * @param url string
   */
  makeSafe(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  /** That only pushes all the remaining songs in the secrets array */
  advanceSecrets() {
    if (this.indexSecrets < this.songs.length) {
      this.secrets.push(this.songs[this.route[this.indexSecrets]]);
      this.indexSecrets++;
    }
  }

  /** Generates an array of length = n that
   * contains random numbers (from 0 to n-1)
   * @param n number
   */
  genRandomArray(n: number) {
    let used = [];
    let i = 0;
    while (i <= n - 1) {
      let tmp = Math.floor(Math.random() * n);
      if (!used.includes(tmp)) {
        used.push(tmp);
        i++;
      }
    }
    return used;
  }

  /** Returns the winner track (most voted) */
  getWinner() {
    this.songs.sort((a, b) => {
      return b.votes - a.votes;
    });
    this.noWinnerView = false;
    this.leftSong = this.songs[0];
    this.subtitle = `Most voted hit with ` + this.leftSong.votes + ` \u2665`;
    this.sendMessage();
  }

  /** Sends the message of the most voted hit */
  sendMessage() {
    this.messageEvent.emit(this.subtitle);
  }

  /** Checks if the current index value is less
   *  than the songs array length */
  checkPosition() {
    return this.index < this.songs.length;
  }

  /** Activated when some song is selected
   * @param card string
   */
  selected(card: string) {
    if (this.checkPosition()) {
      if (card === "left") this.leftSong.votes++;
      if (card === "right") this.rightSong.votes++;
      this.changeDisplayed(card);
      this.advanceSecrets();
    } else this.getWinner();
  }

  /**
   * Changes the song that wasn't selected
   * @param card string
   */
  changeDisplayed(card: string) {
    if (card === "left") {
      this.rightSong = this.secrets.pop();
    }
    if (card === "right") {
      this.leftSong = this.secrets.pop();
    }
    this.index++;
  }

  /**
   * Reloads the entire game [Button displayed at the end]
   */
  reloadGame() {
    location.reload();
  }
}