<template>
  <div class="about">
    <div class="container">
      <h1>Időnyilvántartó Alkalmazás</h1>
      <p>
        Kövesd nyomon munkaóráidat és optimalizáld a produktivitásod!</p>
      <p>Egy egyszerű, intuitív alkalmazás, amely segít hatékonyabban kezelni a munkaidőt. Kezdj el most!</p>
    </div>
  </div>
</template>

<style scoped>
.about {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.container {
  max-width: 1200px;
  padding: 2rem;
}
h1 {
  font-size: 2.5rem;
  line-height: 1.25;
}
p {
  font-size: 1.25rem;
  line-height: 1.75;
}
@media (min-width: 640px) {
  .about {background-size: cover;
    background-position: center;}
}
@media (min-width: 1024px) {
  h1 {font-size: 3rem;}
  p {font-size: 1.5rem;}
}
</style>
