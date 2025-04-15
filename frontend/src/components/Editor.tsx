import { defineComponent, ref } from "vue"
import { MdEditor, type ToolbarNames } from "md-editor-v3"
import "md-editor-v3/lib/style.css"
import { toolbars } from "@/utils/toolbars"

export default defineComponent({
  name: "Editor",
  props: ["content"],
  setup({ content }) {
    // const text = ref("")
    const onChange = (v: string) => (content = v)
    const onSave = () => {
      console.log(content)
    }

    return () => (
      <div class="w-[1200px]">
        <MdEditor
          class="rounded-lg"
          modelValue={content}
          onChange={onChange}
          onSave={onSave}
          // codeTheme="a11y"
          toolbars={toolbars}
        />
      </div>
    )
  },
})
