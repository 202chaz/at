<template>
  <div class="md-layout md-gutter md-alignment-center-center">
    <div class="md-layout-item md-size-55 welcome">
      <md-content class="md-elevation-3">
        <p class="md-title">
          U. S. Government (USG) Information System (IS) - Use and Consent
        </p>
        <p>
          You are accessing a U.S. Government (USG) Information System (IS) that
          is provided for USG-authorized use only.
        </p>
        <p>
          By using this IS (which includes any device attached to this IS), you
          consent to the following conditions:
        </p>
        <ul>
          <li>
            USG routinely intercepts and monitors communications on this IS for
            purposes including, but not limited to, penetration testing, COMSEC
            monitoring, network operations and defense, personnel misconduct
            (PM), law enforcement (LE), and counterintelligence (CI)
            investigations.
          </li>
          <li>
            At any time, the USG may inspect and seize data stored on this IS.
          </li>
          <li>
            Communications using, or data stored on, this IS are not private,
            are subject to routine monitoring, interception, and search, and may
            be disclosed or used for any USG-authorized purpose.
          </li>
          <li>
            This IS includes security measures (e.g., authentication and access
            controls) to protect USG interests--not for your personal benefit or
            privacy.
          </li>
          <li>
            Notwithstanding the above, using this IS does not constitute consent
            to PM, LE, or CI investigative searching or monitoring of the
            content of privileged communications, or work product, related to
            personal representation or services by attorneys, psychotherapists,
            or clergy, and their assistants. Such communication and work product
            are private and confidential. See User Agreement for details.
          </li>
        </ul>
        <md-button class="md-raised md-primary" to="/login">Accept</md-button>
        <md-button class="md-raised md-accent">Decline</md-button>
      </md-content>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.commit("SET_LAYOUT", "simple-layout");
  }
};
</script>

<style>
.welcome {
  text-align: left;
  margin-top: 80px;
}
.md-content {
  padding: 15px;
}
</style>
