<template>
    <button :type="type" :class="theme">
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: ['type', 'theme'],
};
</script>

<style scoped>
button {
    cursor: pointer;
    padding: 0.5rem 1rem;
    background-color: var(--btn-bg, var(--color-accent));
    color: var(--btn-color, var(--color-secondary));
    border-radius: 0.4em;
    border: none;
    transition: all ease-in-out 0.5s;
    font-weight: 700;
    font-variant-caps: small-caps;
    font-size: 1.3rem;
    margin-block: 1rem;
}

button:hover,
button:active {
    --btn-color: var(--color-accent);
    --btn-bg: var(--color-secondary);
    border: 1px solid var(--color-accent);
}

button:disabled {
    --btn-color: var(--color-secondary);
    --btn-bg: var(--color-light);
    border: 1px solid var(--color-light);
}

.flat {
    background-color: transparent;
    --btn-bg: var(--color-primary);
    border: none;
}
/* set lighter colour for secondary */
.flat:hover,
.flat:active {
    --btn-color: var(--color-light);
}

.trash {
    background-color: transparent;
    /* --btn-bg: var(--color-danger); */
    border: var(--color-primary);
}

.trash:hover {
    /* background-color: transparent; */
    --btn-bg: var(--color-danger);
    border: var(--color-primary);
}

.party {
    background-color: transparent;
    --btn-bg: var(--color-secondary);
    border: 1px solid var(--color-secondary);
}

.party:hover,
.party:active {
    --btn-color: var(--color-primary);
}

.btn {
    background-color: var(--btn-bg, var(--color-accent));
    color: var(--btn-color, var(--color-secondary));
    border-radius: 0.4rem;
    transition: all ease-in-out 1s;
    font-weight: 700;
    font-variant-caps: small-caps;
    font-size: 1.3rem;
    margin-block: 0.25rem;
    margin-right: 1rem;
}

.btn:last-of-type {
    margin-right: 0;
}

button.primary {
    --btn-bg: var(--color-accent);
    --btn-color: var(--color-secondary);
    padding: 0.5rem 1rem;
    border: none;
}
button.primary:hover {
    --btn-color: var(--color-accent);
    --btn-bg: var(--color-secondary);
    border: 1px solid var(--color-accent);
    padding: 0.5rem 1rem;
}

button.secondary {
    --btn-bg: var(--color-primary);
    --btn-color: var(--color-light);
    padding: 0.5rem 1rem;
    border: none;
}

button.secondary:hover {
    --btn-color: var(--color-primary);
    --btn-bg: var(--color-light);
    border: 1px solid var(--color-primary);
    padding: 0.5rem 1rem;
}

button.contact {
    --btn-bg: var(--color-primary);
    --btn-color: var(--color-light);
    padding: 0.5rem 1rem;
    border-bottom: none;
}

button.contact:hover {
    --btn-color: var(--color-light);
    --btn-bg: var(--color-secondary);
    border: 1px solid var(--color-secondary);
    padding: 0.5rem 1rem;
}

button.submit-button {
    margin-top: 15px;
    -webkit-align-self: flex-end;
    -ms-flex-item-align: end;
    align-self: flex-end;
    border-radius: 5px;
    border: none;
    --btn-color: var(--color-primary);
    --btn-bg: var(--color-accent);
}
</style>
