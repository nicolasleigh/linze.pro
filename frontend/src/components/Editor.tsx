import { defineComponent, ref } from "vue"
import { MdEditor } from "md-editor-v3"
import "md-editor-v3/lib/style.css"

export default defineComponent({
  name: "Editor",
  setup() {
    const text = ref("")
    const onChange = (v: string) => (text.value = v)
    const onSave = (v, h) => {
      console.log(v)
    }
    const toolbars = [
      "bold",
      "underline",
      "italic",
      "strikeThrough",
      "-",
      "title",
      "sub",
      "sup",
      "quote",
      "unorderedList",
      "orderedList",
      "task",
      "-",
      "codeRow",
      "code",
      "link",
      "image",
      "table",
      "mermaid",
      "katex",
      "-",
      "revoke",
      "next",
      "save",
      "=",
      "prettier",
      "pageFullscreen",
      "fullscreen",
      "preview",
      "previewOnly",
      "htmlPreview",
      "catalog",
      "github",
    ]

    return () => (
      <div class="w-[1200px]">
        <MdEditor
          class="rounded-lg"
          modelValue={text.value}
          onChange={onChange}
          onSave={onSave}
          codeTheme="a11y"
          // showToolbarName
          // toolbars={toolbars}
        />
      </div>
    )
  },
})
