<template>
  <div class="md-layout custom-reports">
    <div class="menu">
      <md-menu md-direction="bottom-start">
        <md-button md-menu-trigger><md-icon>search</md-icon> Find Query</md-button>
      </md-menu>
      <md-menu md-direction="bottom-start">
        <md-button md-menu-trigger><md-icon>save</md-icon> Save Query</md-button>
      </md-menu>
      <md-menu md-direction="bottom-start">
        <md-button md-menu-trigger><md-icon>save</md-icon> Save Query As</md-button>
      </md-menu>
      <md-menu md-direction="bottom-start">
        <md-button md-menu-trigger><md-icon>cancel</md-icon>  Delete Query</md-button>
      </md-menu>
    </div>
    <div class="contents">
      <md-field>
        <label for="movie">Select Source</label>
        <md-select v-model="sourceApp" name="app" id="movie">
          <md-option value="enroll">Enroll App</md-option>
          <md-option value="glue">Glue</md-option>
        </md-select>
      </md-field>
    </div>
    <div class="contents">
      <div class="md-layout md-gutter" v-show="!showTables">
        <div class="md-layout-item md-size-35">
          <md-card v-if="sourceApp">
          <md-card-header>
            <div class="md-title">Tables</div>
          </md-card-header>
            <md-card-content>
              <md-list>
                <md-list-item v-for="option in tableOptions" :key="option.value">
                  <md-checkbox v-model="selectedTableOption" :value="option.value" />
                  <span class="md-list-item-text">{{ option.name }}</span>
                </md-list-item>
              </md-list>
            </md-card-content>
          </md-card>
        </div>
        <div class="md-layout-item md-size-65">
          <md-card v-if="checkboxOptions.length > 0">
            <md-card-header>
              <div class="md-title">Select Elements</div>
            </md-card-header>
            <md-card-content>
              <md-list>
                <md-list-item v-for="option in checkboxOptions" :key="option.key">
                  <md-checkbox v-model="array" :value="option.key" />
                  <span class="md-list-item-text">{{ option.name }}</span>
                </md-list-item>
              </md-list>
            </md-card-content>
          </md-card>
        </div>
      </div>
      <div class="md-layout md-gutter md-alignment-center-right" v-show="!showTables && array.length > 0">
        <div class="md-layout-item md-size-25">
          <md-button class="md-raised" @click="clearData">Cancel</md-button>
          <md-button class="md-raised md-primary" @click="buildTable">Run</md-button>
        </div>
      </div>
      <div class="md-layout md-gutter" v-show="showTables">
        <md-table style="width:100%" id="table">
          <md-table-row>
            <md-table-cell v-for="data in array" :key="data">{{ data }}</md-table-cell>
          </md-table-row>

          <md-table-row v-for="(item, index) in tableData" :key="index.name">
            <md-table-head v-if="array.includes('employer')">{{item.employer.legal_name}}</md-table-head>
            <md-table-head v-if="array.includes('employer_profile')">{{item.employer_profile.profile_source}}</md-table-head>
            <md-table-head v-if="array.includes('broker')">{{item.broker.name}}</md-table-head>
            <md-table-head v-if="array.includes('broker_agency_account')">{{item.broker.broker_agency_account}}</md-table-head>
            <md-table-head v-if="array.includes('ga_fein')">{{item.ga_fein}}</md-table-head>
            <md-table-head v-if="array.includes('ga_agency_name')">{{item.ga_agency_name}}</md-table-head>
            <md-table-head v-if="array.includes('ga_start_on')">{{item.ga_start_on}}</md-table-head>
            <md-table-head v-if="array.includes('plan_year')">{{item.plan_year.status}}</md-table-head>

            <md-table-head v-if="array.includes('Subscriber ID')">{{item['Subscriber ID']}}</md-table-head>
            <md-table-head v-if="array.includes('Member ID')">{{item['Member ID']}}</md-table-head>
            <md-table-head v-if="array.includes('Policy ID')">{{item['Policy ID']}}</md-table-head>
            <md-table-head v-if="array.includes('Enrollment Group ID')">{{item['Enrollment Group ID']}}</md-table-head>
            <md-table-head v-if="array.includes('Status')">{{item['Status']}}</md-table-head>
            <md-table-head v-if="array.includes('First Name')">{{item['First Name']}}</md-table-head>
            <md-table-head v-if="array.includes('Last Name')">{{item['Last Name']}}</md-table-head>
            <md-table-head v-if="array.includes('SSN')">{{item['SSN']}}</md-table-head>
            <md-table-head v-if="array.includes('DOB')">{{item['DOB']}}</md-table-head>
            <md-table-head v-if="array.includes('Gender')">{{item['Gender']}}</md-table-head>
            <md-table-head v-if="array.includes('Relationship')">{{item['Relationship']}}</md-table-head>
            <md-table-head v-if="array.includes('Plan Name')">{{item['Plan Name']}}</md-table-head>
            <md-table-head v-if="array.includes('HIOS ID')">{{item['HIOS ID']}}</md-table-head>
            <md-table-head v-if="array.includes('Plan Metal Level')">{{item['Plan Metal Level']}}</md-table-head>
            <md-table-head v-if="array.includes('Carrier Name')">{{item['Carrier Name']}}</md-table-head>
            <md-table-head v-if="array.includes('Premium Amount')">{{item['Premium Amount']}}</md-table-head>
            <md-table-head v-if="array.includes('Premium Total')">{{item['Premium Total']}}</md-table-head>
            <md-table-head v-if="array.includes('Policy APTC')">{{item['Policy APTC']}}</md-table-head>
            <md-table-head v-if="array.includes('Policy Employer Contribution')">{{item['Policy Employer Contribution']}}</md-table-head>
            <md-table-head v-if="array.includes('Coverage Start')">{{item['Coverage Start']}}</md-table-head>
            <md-table-head v-if="array.includes('Coverage End')">{{item['Coverage End']}}</md-table-head>
            <md-table-head v-if="array.includes('Employer Name')">{{item['Employer Name']}}</md-table-head>
            <md-table-head v-if="array.includes('Employer DBA')">{{item['Employer DBA']}}</md-table-head>
            <md-table-head v-if="array.includes('Employer FEIN')">{{item['Employer FEIN']}}</md-table-head>
            <md-table-head v-if="array.includes('Employer HBX ID')">{{item['Employer HBX ID']}}</md-table-head>
            <md-table-head v-if="array.includes('Home Address')">{{item['Home Address']}}</md-table-head>
            <md-table-head v-if="array.includes('Mailing Address')">{{item['Mailing Address']}}</md-table-head>
            <md-table-head v-if="array.includes('Email')">{{item['Email']}}</md-table-head>
            <md-table-head v-if="array.includes('Phone Number')">{{item['Phone Number']}}</md-table-head>
            <md-table-head v-if="array.includes('Broker')">{{item['Broker']}}</md-table-head>
          </md-table-row>
        </md-table>
        <div class="md-layout md-gutter md-alignment-center-right">
          <div class="md-layout-item md-size-25">
            <md-button class="md-raised" @click="clearData">Reset</md-button>
            <md-button class="md-raised md-primary" @click="generateCSV"><md-icon>get_app</md-icon> Export CSV</md-button>
          </div>
        </div>
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
      sourceApp: null,
      expandNews: false,
      expandSingle: false,
      selectedTableOption: null,
      array: [],
      selected: null,
      selectedQuery: null,
      queryFields: [],
      joinFields: [],
      queryOptions: [
        { name: "Employer Profile", value: "employer_profiles" },
        { name: "Glue Report", value: "glue_report" },
      ],
      selectOptions: [],
      dataArray: [],
      employerDataArray: [],
      employerHeaderOptions: [],
      glueDataOptions: [],
      glueDataArray: [],
      tableData: [],
      tableOptions: [],
      tableQuery: [],
      checkboxOptions: [],
      showTables: false,
    };
  },
  watch: {
    sourceApp: function (event) {
      event === 'enroll' ? this.buildEnrollOptions() : this.buildGlueOptions();
      this.selectedTableOption = '';

    },
    selectedQuery: function (event) {
      if (event && event === "employer") {
        this.getEmployers();
        this.selectOptions = this.queryOptions;
      } else if (event && event === "glue_report")
      this.getGlueReport();
      this.selectOptions = this.queryOptions.filter((option) => option.value !== this.selectedQuery);
    },
    selected: function (event) {
      if (event && event === "employer") {
        this.getEmployerJoin();
      } else if (event && event === "glue_report")
      this.getGlueJoin();
    },
    selectedTableOption: function (event) {
      if (event) {
        this.checkboxOptions = [];
        const keys = Object.keys(this.tableData[0]);
        keys.map((key) => {
          this.checkboxOptions.push({key, name: key.replaceAll("_", " ")})
        })
      }
    }
  },
  methods: {
    clearData() {
      this.tableOptions = [];
      this.selectedTableOption = '';
      this.selectOptions = [];
      this.checkboxOptions = [];
      this.sourceApp = '';
      this.array = [];
      this.showTables = false;
    },
    buildTable() {
      this.showTables = true;
    },
    buildEnrollOptions() {
    this.getEmployers();
      this.tableOptions = [];
      this.tableOptions = [
        { name: 'Employer Export', value: 'employer' },
      ];
    },
    buildGlueOptions() {
      this.getGlueReport();
      this.tableOptions = [];
      this.tableOptions = [
        { name: 'Employers', value: 'employers' },
      ];
    },
    buildTableHeaders(data, option) {
      const arr = [];
      this.queryFields = [];
      if (option) {
        Object.keys(data[0]).map(key => {
          arr.push(JSON.stringify({
            name: key.replaceAll("_", " "),
            value: `${option}.${key}`
          }));
        });
        arr.map((d) => {
          this.queryFields.push(JSON.parse(d))
        })
      }
    },
    getTableData() {
      console.log(this.tableData);
    },
    getEmployers() {
      axios
        .get("http://localhost:4000/api/v1/employerProfileReports.json")
        .then(response => {
          if (response && response.data) {
            this.buildTableHeaders(response.data, "employer");
            this.tableData = [];
            this.tableData = response.data;
          }
        });
    },
    getGlueReport() {
      axios
        .get("http://localhost:4000/api/v1/glueReports.json")
        .then(response => {
          if (response && response.data) {
            this.buildTableHeaders(response.data, "glue_report");
            this.tableData = [];
            this.tableData = response.data;
          }
        });
    },
    generateCSV() {
      const csv = [];
      const rows = document.querySelectorAll('table tr');

      for (var i = 0; i < rows.length; i++) {
        const row = [];
        const cols = rows[i].querySelectorAll("td, th");
          for(var j = 0; j < cols.length; j++) {
            row.push(cols[j].innerText);
            csv.push(row.join(","));
          }
      }
      this.downloadCSV(csv, this.selectedTableOption);
    },
    downloadCSV(csv, filename) {
    let csvFile = '';
    let downloadLink = '';

    // CSV FILE
    csvFile = new Blob([csv], {type: "text/csv"});

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // We have to create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Make sure that the link is not displayed
    downloadLink.style.display = "none";

    // Add the link to your DOM
    document.body.appendChild(downloadLink);

    // Lanzamos
    downloadLink.click();
}
  }
};
</script>

<style>
.contents {
  margin-top: 20px;
  width: 100%;
}
.custom-reports {
  margin-bottom: 50px;
}
.enroll-card {
  width: 30%;
}
.enroll-options-card {
  width: 50%;
}
.menu {
width: 100%;
}

</style>
