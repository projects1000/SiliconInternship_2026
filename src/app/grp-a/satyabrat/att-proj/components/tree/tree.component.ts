import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree'; 
import { AttendanceStore } from '../../utils/attendance.store';

interface TeamNode {
  name: string;
  children?: TeamNode[];
}

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
  // ---> FIX: Added explicit (node: TeamNode) type <---
  treeControl = new NestedTreeControl<TeamNode>((node: TeamNode) => node.children);
  dataSource = new MatTreeNestedDataSource<TeamNode>();

  constructor() {}

  ngOnInit(): void {
    this.loadTreeData();
    
    window.addEventListener('attendanceDataUpdated', () => {
      this.loadTreeData();
    });
  }

  loadTreeData(): void {
    const data = AttendanceStore.getData();
    
    // Group members by their 'group' property
    const grouped = data.members.reduce((acc: any, member) => {
      if (!acc[member.group]) acc[member.group] = [];
      acc[member.group].push({ name: member.name });
      return acc;
    }, {});

    // Convert grouped object to array for the Tree
    const treeData: TeamNode[] = Object.keys(grouped).map(groupName => ({
      name: groupName,
      children: grouped[groupName]
    }));

    this.dataSource.data = treeData;
    this.treeControl.dataNodes = treeData;
    this.treeControl.expandAll();
  }

  hasChild = (_: number, node: TeamNode) => !!node.children && node.children.length > 0;
}