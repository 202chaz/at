<template>
  <div class="history-tracker">
    <History msg="History Tracker" />
  </div>
</template>

<script>
// @ is an alias to /src
import History from "@/components/HistoryTracker.vue";

export default {
  name: "HistoryTracker",
  components: {
    History
  }
};
</script>
