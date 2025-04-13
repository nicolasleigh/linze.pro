import { defineComponent } from "vue";
import { ref } from "vue";
import { MdPreview, MdCatalog } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";
import { usePost } from "@/hooks/usePost";

export default defineComponent({
  name: "MdPreview",
  setup() {
    const id = "preview-only";
    const { post, isLoading } = usePost();

    return () => (
      <>
        {isLoading.value ? (
          <div>Loading...</div>
        ) : (
          <MdPreview id={id} modelValue={post.value && post.value.content} />
        )}
      </>
    );
  },
});
