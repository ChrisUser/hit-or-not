import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core/";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatIconModule } from "@angular/material/icon";
import { HttpClientModule } from "@angular/common/http";
import { ButtonComponent } from "./button/button.component";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { ReactiveFormsModule } from "@angular/forms";
import { CardContainerComponent } from "./card-container/card-container.component";
import { SongService } from "./song.service";

@NgModule({
  declarations: [AppComponent, ButtonComponent, CardContainerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [SongService],
  bootstrap: [AppComponent]
})
export class AppModule {}
