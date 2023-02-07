import { Component, OnInit } from '@angular/core';
import {SalesInteractionService} from "../a-pointofsale-window/sales-interaction.service";

@Component({
  selector: 'app-stat-panel',
  templateUrl: './stat-panel.component.html',
  styleUrls: ['./stat-panel.component.css']
})
export class StatPanelComponent implements OnInit {

  private  totalSales  = 0;
  constructor(private salesService: SalesInteractionService) { }

  ngOnInit() {
    this.salesService.getSalesChartInfo2().subscribe(results =>{
      results.sales.map(chart =>{

        console.log(chart.total);
        this.totalSales = chart.total;
        // this.arr.push([+chart.total]);

      })
    });
  }

}
