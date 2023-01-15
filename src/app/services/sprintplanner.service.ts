import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SprintplannerService {
  public storyLists: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public selectedStoryLists: BehaviorSubject<any> = new BehaviorSubject<any>(
    []
  );

  constructor() {}

  getStoryList() {
    return this.storyLists.asObservable();
  }

  updateStoryList(data) {
    this.storyLists.next(data);
  }

  getSelectedStoryList() {
    return this.selectedStoryLists.asObservable();
  }

  updateSelectedStoryList(data) {
    this.selectedStoryLists.next(data);
  }
}
