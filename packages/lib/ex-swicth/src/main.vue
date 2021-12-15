<script>
import { Switch } from 'element-ui'

export default {
  name: "ExSwitch",
  // mixins: [Switch],
  extends: Switch,
  props: {
    beforeChange: { 
      type: Function, 
      default: () => Promise.resolve(true)
    }
  },
  methods: {
    handleChange() {
      this.beforeChange().then(() => {
        const val = this.checked ? this.inactiveValue : this.activeValue;
        this.$emit('input', val);
        this.$emit('change', val);
        this.$nextTick(() => {
          // set input's checked property
          // in case parent refuses to change component's value
          this.$refs.input.checked = this.checked;
        });
      }).catch(() => { })
    }
  }
}
</script>