<template>
  <div class="md-layout">
    <div class="md-layout-item md-layout md-size-10">
      <div class="md-layout-item">
        <p>SELECT</p>
      </div>
    </div>
    <div class="md-layout-item md-layout md-size-20">
      <div class="md-layout-item">
        <div v-for="item in fields" :key="item.name">
          <md-checkbox :value="item.value" v-model="array">{{
            item.name
          }}</md-checkbox>
        </div>
      </div>
    </div>
    <div class="md-layout-item md-layout md-size-10">
      <div class="md-layout-item">
        <p>FROM</p>
      </div>
    </div>
    <div class="md-layout-item md-layout md-size-20">
      <div class="md-layout-item">
        <md-field>
          <label for="table">Table</label>
          <md-select v-model="selected" name="options" id="options">
            <md-option
              v-for="option in selectOptions"
              :key="option.name"
              :value="option.value"
              >{{ option.name }}</md-option
            >
          </md-select>
        </md-field>
      </div>
    </div>
    <div class="md-layout-item md-layout md-size-10">
      <div class="md-layout-item">
        <md-button class="md-raised md-primary" @click="getEmployers">Run</md-button>
      </div>
    </div>
    <div class="md-layout-item md-layout md-size-100">
      <div class="md-layout-item">
      <md-table>
        <md-table-row>
          <md-table-head v-if="array.includes('employer.legal_name') || array.includes('all')">Legal Name</md-table-head>
          <md-table-head v-if="array.includes('employer.fein') || array.includes('all')">FEIN</md-table-head>
          <md-table-head v-if="array.includes('employer.hbx_id') || array.includes('all')">HBX ID</md-table-head>
          <md-table-head v-if="array.includes('employer.entity_kind') || array.includes('all')">Entity Kind</md-table-head>
          <md-table-head v-if="array.includes('employer.profile_source') || array.includes('all')">Profile Source</md-table-head>
          <md-table-head v-if="array.includes('employer.status') || array.includes('all')">Status</md-table-head>
        </md-table-row>

        <md-table-row v-for="item in dataArray" :key="item.name">
          <md-table-head v-if="array.includes('employer.legal_name') || array.includes('all')">{{item['employer.legal_name']}}</md-table-head>
          <md-table-head v-if="array.includes('employer.fein') || array.includes('all')">{{item['employer.fein']}}</md-table-head>
          <md-table-head v-if="array.includes('employer.hbx_id') || array.includes('all')">{{item['employer.hbx_id']}}</md-table-head>
          <md-table-head v-if="array.includes('employer.entity_kind') || array.includes('all')">{{item['employer.entity_kind']}}</md-table-head>
          <md-table-head v-if="array.includes('employer.profile_source') || array.includes('all')">{{item['employer.profile_source']}}</md-table-head>
          <md-table-head v-if="array.includes('employer.status') || array.includes('all')">{{item['employer.status']}}</md-table-head>
        </md-table-row>
      </md-table>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  created() {
    this.$store.commit("SET_LAYOUT", "app-layout"),
      this.$store.commit("SET_ROUTE", "Custom Reporting");
  },
  data() {
    return {
      array: [],
      selected: "organization",
      fields: [
        { name: "All", value: "all" },
        { name: "Legal Name", value: "employer.legal_name" },
        { name: "FEIN", value: "employer.fein" },
        { name: "HBX ID", value: "employer.hbx_id" },
        { name: "Entity Kind", value: "employer.entity_kind" },
        { name: "Profile Source", value: "employer.profile_source" },
        { name: "Status", value: "employer.status" }
      ],
      selectOptions: [
        { name: "Organization", value: "organization" },
        { name: "Employer Profile", value: "employer_profiles" }
      ],
      dataArray: []
    };
  },
  methods: {
    getEmployers() {
      axios
        .get("../../employers.json")
        .then(response => this.dataArray = response.data)
    }
  }
};
</script>

<style></style>
