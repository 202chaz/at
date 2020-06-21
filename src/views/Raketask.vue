<template>
  <div class="full-control">
    <div class="list">
      <md-list :md-expand-single="expandSingle">
        <md-subheader>Available Task</md-subheader>
        <md-list-item md-expand :md-expanded.sync="expandNews">
          <md-icon>assignment</md-icon>
          <span class="md-list-item-text">Edit Person DOB</span>

          <md-list slot="md-expand">
            <md-list-item>
              <form novalidate class="md-layout">
                <md-card class="md-layout-item">
                <md-card-header>
                  <div class="md-title">Edit DOB</div>
                </md-card-header>

                <md-card-content>
                  <div class="md-layout md-gutter">
                    <div class="md-layout-item md-small-size-100">
                      <md-field>
                        <label for="dob">HBX ID</label>
                        <md-input name="hbxId" id="hbxId" />
                      </md-field>
                    </div>

                    <div class="md-layout-item md-small-size-100">
                      <md-field>
                        <label for="dob">DOB</label>
                        <md-input name="dob" id="dob" />
                      </md-field>
                    </div>
                  </div>
                </md-card-content>
                </md-card>
              </form>
            </md-list-item>
          </md-list>
        </md-list-item>

        <md-list-item md-expand>
          <md-icon>assignment</md-icon>
          <span class="md-list-item-text">Remove SSN</span>

          <md-list slot="md-expand">
            <md-list-item class="md-inset">
            </md-list-item>
          </md-list>
        </md-list-item>

        <md-list-item md-expand>
          <md-icon>assignment</md-icon>
          <span class="md-list-item-text">NFP</span>

          <md-list slot="md-expand">
            <md-list-item class="md-inset">
            </md-list-item>
          </md-list>
        </md-list-item>
      </md-list>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ListExpansion',

    data () {
      return {
        expandNews: false,
        expandSingle: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  $list-width: 520px;

  .full-control {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap-reverse;
  }

  .list {
    width: $list-width;
  }

  .full-control > .md-list {
    width: $list-width;
    max-width: 100%;
    height: 400px;
    display: inline-block;
    overflow: auto;
    border: 1px solid rgba(#000, .12);
    vertical-align: top;
  }

  .control {
    min-width: 250px;
    display: flex;
    flex-direction: column;
    padding: 16px;
  }
</style>
