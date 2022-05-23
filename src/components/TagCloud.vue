<template>
    <div class="tag-cloud">
        <div v-for="tag in tags" :key="tag">
            <h4 @click="$emit('select-tag', tag, $event)">#{{ tag }}&nbsp;</h4>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import useTags from '../composables/useTags';
export default {
    props: ['faqs'],
    emits: ['select-tag'],

    setup(props, ctx) {
        ctx.emit('select-tag');

        const { tags } = useTags(props.faqs);
        return { tags };
    },
};
</script>

<style>
.tag-cloud {
    line-height: 0.8;
    padding-block: 1rem;
}
.tag-cloud h4 {
    cursor: pointer;
}
.tag-cloud div {
    display: inline-block;
    vertical-align: middle;
}
</style>
