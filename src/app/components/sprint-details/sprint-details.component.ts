import { Component, OnInit } from "@angular/core";
import { SprintplannerService } from "src/app/services/sprintplanner.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-sprint-details",
  templateUrl: "./sprint-details.component.html",
  styleUrls: ["./sprint-details.component.css"],
})
export class SprintDetailsComponent implements OnInit {
  selectedStorySub: Subscription;
  selectedStoryList: any;
  constructor(public sprintPlannerSrv: SprintplannerService) {}

  ngOnInit(): void {
    this.getAllSelectedStories();
  }

  getAllSelectedStories() {
    this.selectedStorySub = this.sprintPlannerSrv
      .getSelectedStoryList()
      .subscribe((resp) => {
        this.selectedStoryList = resp;
      });
  }

  ngOnDestroy() {
    if (this.selectedStorySub) this.selectedStorySub.unsubscribe();
  }
}
