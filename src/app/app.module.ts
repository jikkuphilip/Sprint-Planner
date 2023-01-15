import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AddStoryComponent } from "./components/add-story/add-story.component";
import { AddSprintComponent } from "./components/add-sprint/add-sprint.component";
import { StoryListComponent } from "./components/story-list/story-list.component";
import { SprintDetailsComponent } from "./components/sprint-details/sprint-details.component";
import { MainComponent } from "./components/main/main.component";
import { ListComponent } from "./shared/list/list.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AddStoryComponent,
    AddSprintComponent,
    StoryListComponent,
    SprintDetailsComponent,
    ListComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
