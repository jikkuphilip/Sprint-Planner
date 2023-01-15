import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { SprintplannerService } from "src/app/services/sprintplanner.service";

@Component({
  selector: "app-story-list",
  templateUrl: "./story-list.component.html",
  styleUrls: ["./story-list.component.css"],
})
export class StoryListComponent implements OnInit {
  storySub: Subscription;
  createdstoryList: any;

  constructor(public sprintPlannerSrv: SprintplannerService) {}

  ngOnInit(): void {
    this.getAllStories();
  }

  getAllStories() {
    this.storySub = this.sprintPlannerSrv.getStoryList().subscribe((resp) => {
      this.createdstoryList = resp;
    });
  }

  ngOnDestroy() {
    if (this.storySub) this.storySub.unsubscribe();
  }
}
