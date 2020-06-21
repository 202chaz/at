<template>
  <div class="md-layout footer">
    <div class="md-layout-item">
      <span class="stars"></span> ©2020 HBXIT <span class="stars"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style>
.footer {
  background: #2b4888;
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  color: white;
  text-align: center;
  font-size: 17px;
  padding-top: 15px;
  padding-bottom: 15px;
}
.stars {
  content: url("/h2stars.png");
}
</style>
