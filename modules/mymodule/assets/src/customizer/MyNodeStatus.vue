<template>

    <a href="#" class="myicon" :title="$t('Title')" :uk-tooltip="`pos: ${position}`" @click.prevent="doSomething"></a>

</template>

<script>

    export default {

        inject: ['Builder', 'Sidebar'],

        props: {

            node: {
                type: Object,
                required: true
            }

        },

        computed: {

            position() {
                const positions = {section: 'top', row: 'left'};
                return positions[this.node.type.name] || 'bottom';
            }

        },

        methods: {

            doSomething() {}

        }

    };

</script>
