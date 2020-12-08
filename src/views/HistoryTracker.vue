<template>
  <div class="hello">
    <md-table>
      <md-table-row>
        <md-table-head>Task ID</md-table-head>
        <md-table-head>Status</md-table-head>
        <md-table-head>User</md-table-head>
        <md-table-head>Action</md-table-head>
        <md-table-head>Date</md-table-head>
        <md-table-head>Inital Value</md-table-head>
        <md-table-head>Final Value</md-table-head>
      </md-table-row>

      <md-table-row v-for="data in tableData" :key="data._id">
        <md-table-cell>{{ data._id }}</md-table-cell>
        <md-table-cell>{{ data.taskStatus }}</md-table-cell>
        <md-table-cell>{{
          data.triggeredBy ? data.triggeredBy : "N/A"
        }}</md-table-cell>
        <md-table-cell>{{
          data.taskAction ? data.taskAction : "N/A"
        }}</md-table-cell>
        <md-table-cell>{{ data.taskTriggeredDate }}</md-table-cell>
        <md-table-cell>{{ data.initialDataValues[0] }}</md-table-cell>
        <md-table-cell>{{ data.finalDataValues[0] }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  created() {
    this.$store.commit("SET_LAYOUT", "app-layout"),
      this.$store.commit("SET_ROUTE", "History Tracker");
    this.getData();
  },
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    getData() {
      axios
        .get("http://localhost:4000/api/v1/rakeTaskTriggerHistories")
        .then(response => {
          if (response && response.data) {
            this.tableData = response.data;
            console.log(response.data);
          }
        });
    }
  }
};
</script>
