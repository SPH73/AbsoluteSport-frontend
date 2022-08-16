<template>
  <div class="review">
    <p class="text-light">
      {{ review.comment.length < 200 ? review.comment : snippet }}
    </p>
    <img alt="rating" class="stars" src="@/assets/5-stars.svg" />
    <h5>- {{ review.name }} -</h5>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  props: ["review"],
  setup(props) {
    const snippet = computed(() => {
      return props.review.comment.substring(0, 200) + "...";
    });
    return { snippet };
  },
};
</script>

<style scoped>
@media screen and (max-width: 320px), screen and (max-height: 568px) {
  .review {
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
    text-align: center;
    width: 100%;
    max-width: 500px;
    height: 100%;
    margin: 0 auto;
    border-radius: 1rem;
  }
  .review > .stars {
    text-align: center;
  }
  .review > p {
    /* font-size: 1.3rem; */
    line-height: 1.2;
    text-align: center;
  }

  .review > h5 {
    text-align: center;
  }
}
@media screen and (min-width: 375px), screen and (min-height: 668px) {
  .review {
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
    text-align: center;
    width: 100%;
    max-width: 500px;
    height: 100%;
    margin: 0 auto;
    border-radius: 1rem;
  }
  .review > .stars {
    text-align: center;
  }
  .review > p {
    /* font-size: 1.3rem; */
    line-height: 1.2;
    text-align: center;
  }

  .review > h5 {
    text-align: center;
  }
}
</style>
