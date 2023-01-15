import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  @Input() header: string;
  @Input() bgColor: string;
  @Input() textColor: string;
  @Input() listData: any;

  constructor() {}

  ngOnInit(): void {}
}
