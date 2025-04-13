import { defineComponent } from "vue";
import { ref } from "vue";
import { MdPreview, MdCatalog } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";

export default defineComponent({
  name: "MdPreview",
  setup() {
    const id = "preview-only";
    const text = ref("## Hello");
    const scrollElement = document.documentElement;

    return () => (
      <>
        <MdPreview id={id} modelValue={text.value} />
        <MdCatalog scrollElement={scrollElement} />
      </>
    );
  },
});
