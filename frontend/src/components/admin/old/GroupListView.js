import React, { Component } from "react";
export class GroupListView extends Component {

  detailInfo = () => {
    window.location.href = "/group/:id";
  };
  render() {
   
    return (
      <div class='table-responsive'>
        <table class='ui striped table'>
          <thead class='text-center'>
            <tr class=''>
              <th class='' scope='col'>
                Group Id
              </th>
              <th class='' scope='col'>
                Project Name
              </th>
              <th class='' scope='col'>
                Member Count
              </th>
              <th class='' scope='col'>
                Guide Name
              </th>
              <th class='' scope='col'>
                Project Type
              </th>
              <th class='' scope='col'>
                Leader Name
              </th>
            </tr>
          </thead>
          <tbody class='text-center'>
            <tr class='' onClick={this.detailInfo}>
              <td class=''>1</td>
              <td class=''>ABC</td>
              <td class=''>3</td>
              <td class=''>DEF</td>
              <td class=''>Inter-disciplinary</td>
              <td class=''>GHI</td>
            </tr>
            <tr class='' onClick={this.detailInfo}>
              <td class=''>1</td>
              <td class=''>ABC</td>
              <td class=''>3</td>
              <td class=''>DEF</td>
              <td class=''>Inter-disciplinary</td>
              <td class=''>GHI</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default GroupListView;
