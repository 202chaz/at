<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-100">
      <h2>Enrollment Summary</h2>
    </div>
    <div class="md-layout-item md-size-100">As of {{ date }}</div>
    <div class="md-layout-item md-size-80 ivl-table">
      <md-table>
        <md-table-row>
          <md-table-head>Individual Enrollment</md-table-head>
          <md-table-head md-numeric>Covered Lives</md-table-head>
        </md-table-row>

        <md-table-row>
          <md-table-cell>Current Enrollment</md-table-cell>
          <md-table-cell md-numeric>16235</md-table-cell>
        </md-table-row>

        <md-table-row>
          <md-table-cell>Enrollment 1 Year Ago</md-table-cell>
          <md-table-cell md-numeric>15213</md-table-cell>
        </md-table-row>

        <md-table-row>
          <md-table-cell>Change</md-table-cell>
          <md-table-cell md-numeric>613</md-table-cell>
        </md-table-row>
      </md-table>
    </div>
    <div class="md-layout-item md-size-80 shop-table">
      <md-table>
        <md-table-row>
          <md-table-head>Shop Enrollment</md-table-head>
          <md-table-head md-numeric>Groups</md-table-head>
          <md-table-head md-numeric>Covered Lives</md-table-head>
        </md-table-row>

        <md-table-row>
          <md-table-cell>Current Enrollment</md-table-cell>
          <md-table-cell md-numeric>5166</md-table-cell>
          <md-table-cell md-numeric>80650</md-table-cell>
        </md-table-row>

        <md-table-row>
          <md-table-cell>Enrollment 1 Year Ago</md-table-cell>
          <md-table-cell md-numeric>5106</md-table-cell>
          <md-table-cell md-numeric>79013</md-table-cell>
        </md-table-row>

        <md-table-row>
          <md-table-cell>Change</md-table-cell>
          <md-table-cell md-numeric>60</md-table-cell>
          <md-table-cell md-numeric>1637</md-table-cell>
        </md-table-row>
      </md-table>
    </div>
  </div>
</template>

<script>
import format from "date-fns/format";

export default {
  name: "ESview",
  created() {
    this.$store.commit("SET_LAYOUT", "app-layout"),
      this.$store.commit("SET_ROUTE", "Reports / Enrollment Summary");
  },
  data() {
    let now = new Date();

    return {
      date: now,
      formattedDate: format(now, "MM dd yyyy")
    };
  }
};
</script>

<style>
.ivl-table th {
  background-color: #cc0000;
  color: #ffffff !important;
}
.shop-table th {
  background-color: #2b4888;
  color: #ffffff !important;
}
</style>
