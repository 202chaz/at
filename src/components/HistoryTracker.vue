<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <md-table>
      <md-table-row>
        <md-table-head md-numeric>ID</md-table-head>
        <md-table-head>User</md-table-head>
        <md-table-head>Action</md-table-head>
        <md-table-head>Date</md-table-head>
      </md-table-row>

      <md-table-row>
        <md-table-cell md-numeric>1</md-table-cell>
        <md-table-cell>Shawna Dubbin</md-table-cell>
        <md-table-cell>Move Person Account Rake Task</md-table-cell>
        <md-table-cell>08/04/2020</md-table-cell>
      </md-table-row>

      <md-table-row>
        <md-table-cell md-numeric>2</md-table-cell>
        <md-table-cell>Odette Demageard</md-table-cell>
        <md-table-cell>Remove SSN Rake task</md-table-cell>
        <md-table-cell>07/14/2020</md-table-cell>
      </md-table-row>

      <md-table-row>
        <md-table-cell md-numeric>3</md-table-cell>
        <md-table-cell>Vera Taleworth</md-table-cell>
        <md-table-cell>Change Person DOB Rake Task</md-table-cell>
        <md-table-cell>08/14/2020</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "HistoryTracker",
  props: {
    msg: String
  }
};
</script>
