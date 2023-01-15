import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { Subscription } from "rxjs";
import { SprintplannerService } from "src/app/services/sprintplanner.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import * as _ from "lodash";

@Component({
  selector: "app-add-sprint",
  templateUrl: "./add-sprint.component.html",
  styleUrls: ["./add-sprint.component.css"],
})
export class AddSprintComponent implements OnInit {
  storySub: Subscription;
  storyList: any;
  sprintForm: FormGroup;
  submitted: boolean = false;
  constructor(
    public sprintPlannerSrv: SprintplannerService,
    public fb: FormBuilder,
    public toastr: ToastrService
  ) {}

  get sprintPoint() {
    return this.sprintForm.get("sprintPoint");
  }

  ngOnInit(): void {
    this.sprintForm = this.createFormGroup();
    this.getAllStories();
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      sprintPoint: ["", Validators.required],
    });
  }

  getAllStories() {
    this.storySub = this.sprintPlannerSrv.getStoryList().subscribe((resp) => {
      this.storyList = resp;
    });
  }

  // common function for both clear operaions
  clearStories(mode) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText:
        mode == "all"
          ? "Yes, Clear All Stories!"
          : "Yes, Clear All Selected Stories!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (mode == "all") this.sprintPlannerSrv.updateStoryList([]);
        this.sprintPlannerSrv.updateSelectedStoryList([]);
        Swal.fire(
          "Cleared!",
          mode == "all"
            ? "All created stories has been deleted"
            : "All selected stories has been deleted",
          "success"
        );
      }
    });
  }

  // function to generate combinations of array values
  arrayCombinations(array, min) {
    var all = [];
    for (var i = min; i < array.length; i++) {
      this.combinationGenerator(i, array, [], all);
    }
    all.push(array);
    return all;
  }

  combinationGenerator(n, src, got, all) {
    if (n == 0) {
      if (got.length > 0) {
        all[all.length] = got;
      }
      return;
    }
    for (var j = 0; j < src.length; j++) {
      this.combinationGenerator(
        n - 1,
        src.slice(j + 1),
        got.concat([src[j]]),
        all
      );
    }
    return;
  }

  autoSelectStories() {
    this.submitted = true;
    if (this.sprintForm.valid) {
      if (this.storyList.length) {
        this.storyList = _.orderBy(this.storyList, ["storyPoint"], ["desc"]);
        let selcetedStories = [];
        let combinations = this.arrayCombinations(this.storyList, 1);
        let closestValue = Math.abs(
          this.sprintPoint.value - _.sumBy(combinations[0], "storyPoint")
        );
        selcetedStories = combinations[0];
        for (var i = 0; i < combinations.length; i++) {
          if (
            Math.abs(
              this.sprintPoint.value - _.sumBy(combinations[i], "storyPoint")
            ) < closestValue
          ) {
            closestValue = Math.abs(
              this.sprintPoint.value - _.sumBy(combinations[i], "storyPoint")
            );
            selcetedStories = combinations[i];
            // sprintPoint -= this.storyList[i].storyPoint;
          } else continue;
        }
        if (_.sumBy(selcetedStories, "storyPoint") > this.sprintPoint.value)
          selcetedStories = [];
        this.sprintPlannerSrv.updateSelectedStoryList(selcetedStories);
      } else
        this.toastr.warning("Please add atleast one user story", "Warning");
    } else this.toastr.warning("Please fill all mandatory fields", "Warning");
  }

  ngOnDestroy() {
    if (this.storySub) this.storySub.unsubscribe();
  }
}
