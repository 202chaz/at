<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-100">
      <h2>Renewing Group Dependent Age Off</h2>
    </div>
    <div class="md-layout-item md-size-100">
      <span>Last Run Date</span>
      <span class="sub-text date">{{ formattedDate }}</span>
      <span class="sub-text"><a href="#">View Historical Report</a></span>
    </div>
    <br />
    <br />
    <br />
    <div class="md-layout-item md-size-100">
    New Query
    </div>
    <div class="md-layout-item md-size-15">
    <md-datepicker v-model="fromDate">
    <label>Select from date</label>
    </md-datepicker>
    </div>
    <div class="md-layout-item md-size-15">
    <md-datepicker v-model="toDate">
    <label>Select to date</label>
    </md-datepicker>
    </div>
    <div class="md-layout-item md-size-20">
    <md-button class="md-raised md-primary" style="float:right">Run</md-button>
    <md-button class="md-raised" style="float:right">Cancel</md-button>
    </div>
    <br />
    <div class="md-layout-item md-size-100 ee-table">
    <md-table>
      <md-table-row>
        <md-table-head md-numeric>Employer ID</md-table-head>
        <md-table-head>Renewing Date</md-table-head>
        <md-table-head>Employee First</md-table-head>
        <md-table-head>Employee Last</md-table-head>
        <md-table-head md-numeric>Employee ID</md-table-head>
        <md-table-head>Employee DOB</md-table-head>
      </md-table-row>

      <md-table-row>
        <md-table-cell md-numeric>651313</md-table-cell>
        <md-table-cell>10/01/2020</md-table-cell>
        <md-table-cell>William</md-table-cell>
        <md-table-cell>Tell</md-table-cell>
        <md-table-cell md-numeric>34567</md-table-cell>
        <md-table-cell>09/03/1990</md-table-cell>
      </md-table-row>

      <md-table-row>
        <md-table-cell md-numeric>571813</md-table-cell>
        <md-table-cell>10/01/2020</md-table-cell>
        <md-table-cell>Richard</md-table-cell>
        <md-table-cell>Roberts</md-table-cell>
        <md-table-cell md-numeric>34567</md-table-cell>
        <md-table-cell>09/03/1990</md-table-cell>
      </md-table-row>

      <md-table-row>
        <md-table-cell md-numeric>991313</md-table-cell>
        <md-table-cell>10/01/2020</md-table-cell>
        <md-table-cell>Peter</md-table-cell>
        <md-table-cell>Pan</md-table-cell>
        <md-table-cell md-numeric>34567</md-table-cell>
        <md-table-cell>09/03/1990</md-table-cell>
      </md-table-row>
    </md-table>
    </div>
    <div class="md-layout-item md-size-95">
      <span style="float: right">
        <md-icon>cloud_download</md-icon>
        <a href="#"> Export CSV</a>
      </span>
    </div>
  </div>
</template>

<script>
import format from "date-fns/format";

export default {
  name: "ESview",
  created() {
    this.$store.commit("SET_LAYOUT", "app-layout"),
      this.$store.commit(
        "SET_ROUTE",
        "Reports / Renewing Group Dependent Age Off"
      );
  },
  data() {
    let now = new Date();

    return {
      date: now,
      formattedDate: format(now, "MM/dd/yyyy"),
      fromDate: null,
      toDate: null
    };
  }
};
</script>

<style>
.date {
  color: #cc0000;
}
.ee-table th {
  background-color: #cc0000;
  color: #ffffff !important;
}
.sub-text {
  margin-left: 20px;
}
</style>
