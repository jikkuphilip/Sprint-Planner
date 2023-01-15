import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { SprintplannerService } from "src/app/services/sprintplanner.service";
import * as _ from "lodash";

@Component({
  selector: "app-add-story",
  templateUrl: "./add-story.component.html",
  styleUrls: ["./add-story.component.css"],
})
export class AddStoryComponent implements OnInit {
  storyForm: FormGroup;
  submitted: boolean = false;
  storySub: Subscription;
  storyList: any;
  hasDuplication: boolean = false;

  constructor(
    public fb: FormBuilder,
    public toastr: ToastrService,
    public sprintPlannerSrv: SprintplannerService
  ) {}

  get storyName() {
    return this.storyForm.get("storyName");
  }
  get storyPoint() {
    return this.storyForm.get("storyPoint");
  }

  ngOnInit(): void {
    this.storyForm = this.createFormGroup();
    this.getAllStories();
  }

  getAllStories() {
    this.storySub = this.sprintPlannerSrv.getStoryList().subscribe((resp) => {
      this.storyList = _.cloneDeep(resp);
    });
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      storyName: ["", Validators.required],
      storyPoint: ["", Validators.required],
    });
  }

  addStory() {
    this.submitted = true;
    if (this.storyForm.valid && !this.hasDuplication) {
      this.storyList.push(this.storyForm.value);
      this.sprintPlannerSrv.updateStoryList(this.storyList);
      this.storyForm.reset();
      this.submitted = false;
      this.toastr.success("Story Created Successfully", "Success");
    } else {
      if (this.storyForm.invalid)
        this.toastr.warning("Please fill all mandatory fields", "Warning");
      else
        this.toastr.warning(
          "Story Name Already Exists. Please try again with a different story name",
          "Warning"
        );
    }
  }

  checkStoryName() {
    this.hasDuplication =
      _.findIndex(this.storyList, ["storyName", this.storyName.value]) != -1;
  }

  ngOnDestroy() {
    if (this.storySub) this.storySub.unsubscribe();
  }
}
