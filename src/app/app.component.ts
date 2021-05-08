import { Component } from "@angular/core"
import { MatIconRegistry } from "@angular/material/icon"
import { DomSanitizer } from "@angular/platform-browser"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"]
})
export class AppComponent {
  public leftTitle: string = "Hit"
  public rightTitle: string = " or Not"
  public subtitle: string = "Choose your favourite track!"

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      "heart",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/heart.svg")
    )
  }

  receiveMessage($event) {
    this.subtitle = $event
  }
}
