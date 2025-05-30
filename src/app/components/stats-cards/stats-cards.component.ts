import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats-cards',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
      <div class="stat bg-base-100 rounded-lg p-4">
        <div class="stat-title text-gray-500">Total Followers</div>
        <div class="stat-value text-2xl font-bold">235.5k</div>
        <div class="stat-desc text-success">+2.5k from previous month</div>
      </div>
      
      <div class="stat bg-base-100 rounded-lg p-4">
        <div class="stat-title text-gray-500">Engagement Rate</div>
        <div class="stat-value text-2xl font-bold">12.6%</div>
        <div class="stat-desc text-success">+0.5% from previous month</div>
      </div>
      
      <div class="stat bg-base-100 rounded-lg p-4">
        <div class="stat-title text-gray-500">Total Impressions</div>
        <div class="stat-value text-2xl font-bold">23.5M</div>
        <div class="stat-desc text-error">-2.5M from previous month</div>
      </div>
      
      <div class="stat bg-base-100 rounded-lg p-4">
        <div class="stat-title text-gray-500">Scheduled Automation</div>
        <div class="stat-value text-2xl font-bold">143</div>
        <div class="stat-desc text-error">-23 from previous month</div>
      </div>
      
      <div class="stat bg-base-100 rounded-lg p-4">
        <div class="stat-title text-gray-500">Posts Scheduled</div>
        <div class="stat-value text-2xl font-bold">232</div>
        <div class="stat-desc text-success">+44 from previous month</div>
      </div>
    </div>
  `
})
export class StatsCardsComponent {}