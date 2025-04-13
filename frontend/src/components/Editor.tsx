import { defineComponent, ref } from "vue";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";

export default defineComponent({
  name: "Editor",
  setup() {
    const text = ref("");
    const onChange = (v: string) => (text.value = v);
    const onSave = (v, h) => {
      console.log(v);
    };

    return () => <MdEditor modelValue={text.value} onChange={onChange} onSave={onSave} />;
  },
});
